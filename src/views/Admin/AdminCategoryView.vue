<template>
  <div>
    <div class="wrapper">
      <!-- Sidebar  -->
      <AdminSideBar id="sidebar"></AdminSideBar>
      <!-- Page Content  -->
      <div id="content">
        <button type="button" id="sidebarCollapse" class="btn"
                style="background-color: #333; color: white; border-radius: 0px">
          <span>
            <i class="bi bi-speedometer"></i>
          </span>
        </button>

        <div style="padding: 10px;">
          <span style="font-weight:bold; font-size: 40px;">分類列表</span>
          <button class="btn btn-primary" style="float: right;" @click="openAddCategoryWindow(null)">新增</button>

          <table border="1px">
            <tr>
              <th>分類</th>
              <th>操作</th>
            </tr>
            <tr v-for="c in categoryList">
              <td :class="{ 'level0': c.level == 0 }">
                <span v-for="n in c.level">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
                <span v-text="c.name"></span>
              </td>
              <td style="width: 185px">
                <button class="btn btn-primary" style="margin-right: 5px;" @click="openAddCategoryWindow(c.id)">新增</button>
                <button class="btn btn-success" style="margin-right: 5px;" @click="openUpdateCategoryWindow(c.id)">修改</button>
                <button class="btn btn-danger" @click="deleteCategory(c.id, c.name)">刪除</button>
              </td>
            </tr>
          </table>
        </div>

      </div>
    </div>
  </div>

  <div id="add-category-window" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeAddCategoryWindow()">&times;</span>
      <h1 style="font-weight:bold; font-size: 32px; margin-top: 0px;">新增分類</h1>
      <form action="" style="margin-top: 20px;">
        <label class="form-label" for="">分類名稱</label>
        <input class="form-control" type="text" placeholder="New Category" v-model="name">
      </form>
      <div style="margin-top: 30px;">
        <div style="float: right">
          <button class="btn btn-primary" style="margin-right: 5px;" @click="addCategory()">新增</button>
          <button class="btn btn-secondary" @click="closeAddCategoryWindow">取消</button>
        </div>
      </div>
    </div>
  </div>

  <div id="update-category-window" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeUpdateCategoryWindow()">&times;</span>
      <h1 style="font-weight:bold; font-size: 32px; margin-top: 0px;">修改分類</h1>
      <form action="" style="margin-top: 20px;">
        <label class="form-label" for="">分類名稱</label>
        <input class="form-control" type="text" placeholder="新名稱" v-model="name">
      </form>
      <div style="margin-top: 30px;">
        <div style="float: right">
          <button class="btn btn-primary" style="margin-right: 5px;" @click="updateCategory()">修改</button>
          <button class="btn btn-secondary" @click="closeUpdateCategoryWindow">取消</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import $ from 'jquery'
import AdminSideBar from "../../components/Admin/AdminSideBar.vue";
import {inject, onMounted, ref} from "vue";
import api from "../../api/index.js";

$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });
});

export default {
  name: 'AdminCategoryView',
  components: {AdminSideBar},
  props: {},
  setup() {
    const name = ref("");
    const ancestorId = ref(0);
    const updateId = ref(0);

    const categoryList = ref([]);

    onMounted(() => {
      api.getAllCategoriesTree().then(response => {
        categoryList.value = response.data;
      })
    });

    const openAddCategoryWindow = (id) => {
      document.getElementById("add-category-window").style.display = "block";
      ancestorId.value = id;
      name.value = "";
    }

    const closeAddCategoryWindow = () => {
      document.getElementById("add-category-window").style.display = "none";
    }

    const openUpdateCategoryWindow = (id) => {
      document.getElementById("update-category-window").style.display = "block";
      updateId.value = id;
      name.value = "";
    }

    const closeUpdateCategoryWindow = () => {
      document.getElementById("update-category-window").style.display = "none";
    }

    const reload = inject("reload");

    const addCategory = () => {
      api.addCategory(name.value, ancestorId.value).then(() => {
        reload();
      })
    }

    const updateCategory = () => {
      api.updateCategory(name.value, updateId.value).then(() => {
        reload();
      })
    }

    const deleteCategory = (id, name) => {
      if(confirm("確定要刪除分類: " + name + " 嗎?")){
        api.deleteCategory(id).then(() => {
          reload();
        })
      }
    }

    return {
      categoryList,
      openAddCategoryWindow,
      closeAddCategoryWindow,
      openUpdateCategoryWindow,
      closeUpdateCategoryWindow,
      addCategory,
      updateCategory,
      deleteCategory,
      name,
      ancestorId,
      updateId
    }
  }
};
</script>

<style scoped>
body {
  background: #fafafa;
}

p {
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

#content {
  width: 100%;
  min-height: 100vh;
  transition: all 0.3s;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th {
  background-color: #f2f2f2;
}

th, td {
  text-align: left;
  padding: 5px;
  border: 1px solid #000;
}

td .btn {
  height: 26px;
  width: 54px;
  font-size: 13px;
  line-height: 20px;
  padding-top: 1px;
  padding-bottom: 1px;
}

.level0 {
  background-color: #d8d8d8;
}

/**/

.modal {
  display: none;
  position: fixed; /* 設置為固定位置 */
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4); /* 設置背景顏色和透明度 */
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
  position: absolute; /* 設置為絕對位置 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 使其置中 */
}

.close {
  color: #000;
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}


</style>