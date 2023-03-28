<template>
  <div class="article-editor-detail shadow">
    <div style="text-align:center;">
      <img class="shadow" :src='articleContent.thumbnail' alt="" style="width: 100%; margin: 0 auto;"
      v-show="articleContent.thumbnail != ''">
    </div>

    <h1 v-text="articleContent.title"></h1>
    <p>
      <i class="bi bi-clock"></i>
      <span v-text="articleContent.createdAt"></span>

      <i class="bi bi-tags"></i>
      <span v-text="articleContent.category"></span>
    </p>
    <hr>

    <div class="content">
      <div v-html="articleContent.content"></div>
    </div>

  </div>
</template>

<script>
import {ref, reactive, onMounted} from "vue";
import api from "../api/index.js";
import { useRoute } from 'vue-router'

export default {
  name: 'ArticleDetail',
  setup() {
    const articleVO = reactive({
      title: "",
      thumbnail: "",
      content: "",
      category: "",
      createdAt: ""
    });

    const route = useRoute();

    onMounted(() => {
      const articleId = route.params.articleId;

      api.getArticleDetail(articleId).then(response => {
        articleVO.title = response.data.title;
        articleVO.thumbnail = response.data.thumbnail;
        articleVO.content = response.data.content;
        articleVO.category = response.data.category;
        articleVO.createdAt = response.data.createdAt;
      })
    });

    return {
      articleContent: articleVO
    }
  }
}
</script>

<style scoped>
.article-editor-detail {
  min-height: 1000px;
  background-color: #fff;
  margin: 20px 0;
  padding: 20px 30px;
}

h1 {
  font-weight: bolder;
  margin: 45px 0 30px 0;
  font-size: 48px;
}

.content {

}

.content :deep(*) {
  font-size: 20px;
  line-height: 36px;
  margin-top: 30px;
}

.content :deep(h2) {
  font-size: 36px;
  font-weight: bolder;
}

.content :deep(li) {
  margin-top: 10px;
}

</style>