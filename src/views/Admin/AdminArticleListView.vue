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

        <div class="article-list">
          <h1 style="font-weight:bold; margin-bottom: 20px;">文章列表</h1>

          <table border="1px">
            <tr>
              <th>ID</th>
              <th>文章標題</th>
              <th>更新時間</th>
              <th>操作</th>
            </tr>
            <tr v-for="article in articleList">
              <td v-text="article.id" style="width: 50px;"></td>
              <td v-text="article.title" style="font-weight:bold; font-size: 18px;"></td>
              <td v-text="article.updatedAt" style="width: 200px;"></td>
              <td style="width: 140px;">
                <button class="btn btn-primary" style="margin-right: 5px;" @click="editArticle(article.id)">編輯
                </button>
                <button class="btn btn-danger" @click="deleteArticle(article.id)">刪除</button>
              </td>
            </tr>
          </table>
        </div>

        <!-- Page Selector -->
        <div style="height: 100px; display: flex; justify-content: center; align-items: center;">
          <div>
            <button class="page-button" @click.prevent="changePage(pageInfo.prePage)">
              <i class="bi bi-chevron-left" style="font-size: 20px; text-align: center;"></i>
            </button>

            <button class="page-button" @click.prevent="changePage(n)" v-for="n in pageInfo.navigatepageNums"
                    :class="{ 'button-selected': n == pageInfo.pageNum }">
              <span style="font-size: 20px; text-align: center;" v-text="n"></span>
            </button>

            <button class="page-button" @click.prevent="changePage(pageInfo.nextPage)">
              <i class="bi bi-chevron-right" style="font-size: 20px; text-align: center;"></i>
            </button>

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
import api from "../../api/index.js";

export default {
  name: 'AdminArticleList',
  components: {AdminSideBar},
  setup() {
    const articleList = ref([]);
    const pageInfo = ref({});

    onMounted(() => {
      const pageNum = location.search.split("=")[1];

      articleList.value = [];
      pageInfo.value = {};
      api.getAllArticles(pageNum).then(response => {
        articleList.value = response.data.list;
        pageInfo.value = response.data;
      })
    });

    const editArticle = (id) => {
      location.href = "/admin/ArticleEditor/" + id;
    };

    const deleteArticle = (id) => {
      if (confirm("確定要刪除ID " + id + "的文章?")) {
        api.deleteArticle(id).then(response => {
          location.reload();
        });
      }
    };

    const changePage = (pageNum) => {
      if (pageNum < 1 || pageNum > pageInfo.value.pages) return;

      location.href = "/admin/ArticleList?page=" + pageNum;
    };

    return {
      articleList,
      pageInfo,
      editArticle,
      deleteArticle,
      changePage
    }
  }
}

$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });
});

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

/**/

.article-list {
  padding: 15px;
}

.article-info span {
  font-weight: bold;
  font-size: 20px;
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
  padding: 8px;
  border: 1px solid #000;
}

.page-button {
  background-color: #fff;
  width: 35px;
  height: 35px;
  margin: 0 2px 0 2px;
}

.button-selected {
  background-color: #999;
}

</style>