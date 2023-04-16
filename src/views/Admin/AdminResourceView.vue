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
          <span style="font-weight:bold; font-size: 40px;">資源列表</span>

          <div id="resource-list">
            <div class="resource shadow" v-for="r in resourceList">
              <img class="shadow" :src="r.url"
                   alt="">
              <p v-text="r.name"></p>
              <span v-text="r.fileSize"></span>
              <span v-text="r.createdAt"></span>
              <button class="btn btn-secondary" @click="deleteResource(r.id)"><i class="bi bi-trash"></i></button>
            </div>

            <PageSelector page-link="/admin/Resource" :page-info="pageInfo"></PageSelector>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import AdminSideBar from "../../components/Admin/AdminSideBar.vue";
import {onMounted, ref} from "vue";
import PageSelector from "../../components/Common/PageSelector.vue";
import api from "../../api/index.js";

$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });
});

export default {
  name: "AdminResourceView",
  components: {PageSelector, AdminSideBar},
  setup() {
    const resourceList = ref([]);
    const pageInfo = ref({});

    const params = new URLSearchParams(location.search);

    let pageNum = params.get("page");
    if(pageNum == null) pageNum = 1;

    onMounted(() => {
      api.getAllResources(pageNum).then(response => {
        resourceList.value = response.data.list;
        pageInfo.value = response.data;
      })
    });

    const deleteResource = (id) => {
      if(confirm("確定要刪除?")){
        api.deleteResource(id).then(() => {
          location.reload();
        })
      }
    }

    return {
      resourceList,
      pageInfo,
      deleteResource
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

#resource-list {
  width: 100%;
}

.resource {
  height: 230px;
  width: 200px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: inline-block;
  padding: 10px;
  margin: 5px;
}

.resource img {
  display: block; /* 将 <img> 标签设置为块级元素 */
  margin: 5px auto 0px auto; /* 将左右外边距设置为 auto，使其在父容器中水平居中 */
  max-width: 100%;
  height: 80px;
  border: 1px solid #3d3d3d;
}

.resource p {
  text-align: center;
  color: black;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
  margin-top: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.resource span {
  display: block;
  text-align: center;
  color: black;
  font-size: 14px;
}

.resource button {
  text-align: center;
  margin: 5px auto 10px auto; /* 将左右外边距设置为 auto，使其在父容器中水平居中 */
  width: 100%;
  display: block;
}

</style>