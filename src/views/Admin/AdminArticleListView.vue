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
              <th>狀態</th>
              <th>分類</th>
              <th>更新時間</th>
              <th>操作</th>
            </tr>
            <tr v-for="article in articleList">
              <td v-text="article.id" style="width: 50px;"></td>
              <td v-text="article.title" style="font-weight:bold; font-size: 18px;"></td>
              <td style="width: 50px; text-align: center">
                <i v-show="article.status == 1" style="font-size: 20px; color: black" class="bi bi-eye"></i>
                <i v-show="article.status == 0" style="font-size: 20px; color: #ccc" class="bi bi-eye-slash"></i>
              </td>
              <td v-text="article.category" style="width: 150px;"></td>
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
        <PageSelector :change-page="changePage" :page-info="pageInfo"></PageSelector>

      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import AdminSideBar from "../../components/Admin/AdminSideBar.vue";
import {onMounted, ref} from "vue";
import api from "../../api/index.js";
import PageSelector from "../../components/Common/PageSelector.vue";

export default {
  name: 'AdminArticleList',
  components: {PageSelector, AdminSideBar},
  setup() {
    const articleList = ref([]);
    const pageInfo = ref({});

    onMounted(() => {
      const params = new URLSearchParams(location.search);

      let pageNum = params.get("page");
      if(pageNum == null) pageNum = 1;

      articleList.value = [];
      pageInfo.value = {};
      api.getAllArticles(pageNum).then(response => {
        articleList.value = response.data.list;
        pageInfo.value = response.data;

        for (let i = 0; i < articleList.value.length; i++) {
          if(articleList.value[i].category.length == 0)
            articleList.value[i].category = "未分類";
        }
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
      if (pageNum < 1 || pageNum > pageInfo.pages) return;

      const params = new URLSearchParams(location.search);

      if(params.has("category") )
        location.href = "/admin/ArticleList?page=" + pageNum + "&category=" + params.get("category");
      else
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

</style>