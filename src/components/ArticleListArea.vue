<template>
  <div class="" id="content-root">
    <div>
      <ArticlePreview v-for="articleData in articleList" :article-data="articleData"></ArticlePreview>
    </div>
    <PageSelector :change-page="changePage" :page-info="pageInfo"></PageSelector>
  </div>
</template>

<script>
import {inject, onMounted, ref} from "vue"
import ArticlePreview from "./ArticlePreview.vue";
import api from "../api/index.js";
import PageSelector from "./Common/PageSelector.vue";
import formatDate from "../utils/dateFormatter.js";
import router from "../router/index.js";


export default {
  name: 'ArticleArea',
  components: {PageSelector, ArticlePreview},
  setup() {
    const articleList = ref([]);
    const pageInfo = ref({});

    const loadArticles = () => {
      articleList.value = [];
      pageInfo.value = {};

      const params = new URLSearchParams(location.search);

      let pageNum = params.get("page");
      if (pageNum == null) pageNum = 1;

      if (params.has("category")) {
        api.getArticlesByCategories(params.get("category"), pageNum).then(response => {
          articleList.value = response.data.list;
          pageInfo.value = response.data;

          for (let i = 0; i < articleList.value.length; i++) {
            if (articleList.value[i].category.length == 0) {
              articleList.value[i].category = "未分類";
            }

            articleList.value[i].updatedAt = formatDate(articleList.value[i].updatedAt);
          }
        })
      } else {
        api.getAllPublicArticles(pageNum).then(response => {
          articleList.value = response.data.list;
          pageInfo.value = response.data;

          for (let i = 0; i < articleList.value.length; i++) {
            if (articleList.value[i].category.length == 0) {
              articleList.value[i].category = "未分類";
            }

            articleList.value[i].updatedAt = formatDate(articleList.value[i].updatedAt);
          }
        })
      }

      window.scrollTo(0, 0);
    }

    onMounted(() => {
      loadArticles();
      window.addEventListener('onRouted', loadArticles);
    });

    const changePage = (pageNum) => {
      if (pageNum < 1 || pageNum > pageInfo.pages) return;

      const params = new URLSearchParams(location.search);

      if (params.has("category")) {
        router.push("/articles?page=" + pageNum + "&category=" + params.get("category"));
      } else {
        router.push("/articles?page=" + pageNum);
      }
    };

    return {
      articleList,
      pageInfo,
      changePage,
      loadArticles
    }
  }
}
</script>

<style scoped>
#content-root {
  margin: 0px 0px 20px 0px;
  overflow: hidden;
  min-height: 100vh;
}

</style>