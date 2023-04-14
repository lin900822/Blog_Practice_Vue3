<template>
  <div class="" id="content-root">
    <div>
      <Article v-for="articleData in articleList" :article-data="articleData"></Article>
    </div>
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
</template>

<script>
import {onMounted, ref} from "vue"
import Article from "./ArticlePreview.vue";
import api from "../api/index.js";

export default {
  name: 'ArticleArea',
  components: {Article},
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

    const changePage = (pageNum) => {
      if(pageNum < 1 || pageNum > pageInfo.value.pages) return;

      location.href = "/articles?page=" + pageNum;
    }

    return {
      articleList,
      pageInfo,
      changePage
    }
  }
}
</script>

<style scoped>
#content-root {
  margin: 0px 0px 20px 0px;
  overflow: hidden;
}

.page-button {
  background-color: #fff;
  width: 35px;
  height: 35px;
  margin: 0 2px 0 2px;
}

.button-selected{
  background-color: #999;
}

</style>