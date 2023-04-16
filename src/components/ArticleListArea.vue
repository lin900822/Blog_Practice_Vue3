<template>
  <div class="" id="content-root">
    <div>
      <ArticlePreview v-for="articleData in articleList" :article-data="articleData"></ArticlePreview>
    </div>
    <PageSelector page-link="/articles" :page-info="pageInfo"></PageSelector>
  </div>
</template>

<script>
import {onMounted, ref} from "vue"
import ArticlePreview from "./ArticlePreview.vue";
import api from "../api/index.js";
import PageSelector from "./Common/PageSelector.vue";

export default {
  name: 'ArticleArea',
  components: {PageSelector, ArticlePreview},
  setup() {
    const articleList = ref([]);
    const pageInfo = ref({});

    onMounted(() => {
      articleList.value = [];
      pageInfo.value = {};

      const params = new URLSearchParams(location.search);

      let pageNum = params.get("page");
      if(pageNum == null) pageNum = 1;

      if(params.has("category")){
        api.getArticlesByCategories(params.get("category"), pageNum).then(response => {
          articleList.value = response.data.list;
          pageInfo.value = response.data;

          for (let i = 0; i < articleList.value.length; i++) {
            if(articleList.value[i].category.length == 0){
              articleList.value[i].category="未分類";
            }
          }
        })
      }
      else{
        api.getAllArticles(pageNum).then(response => {
          articleList.value = response.data.list;
          pageInfo.value = response.data;

          for (let i = 0; i < articleList.value.length; i++) {
            if(articleList.value[i].category.length == 0){
              articleList.value[i].category="未分類";
            }
          }
        })
      }


    });

    return {
      articleList,
      pageInfo
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