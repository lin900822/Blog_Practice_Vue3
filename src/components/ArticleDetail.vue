<template>
  <div class="article-detail shadow">
    <div style="text-align:center;">
      <img class="shadow" :src='articleContent.thumbnail' alt="" style="max-height: 720px; max-width: 100%; margin: 0 auto;"
           v-show="articleContent.thumbnail != ''">
    </div>

    <h1 v-text="articleContent.title"></h1>
    <p class="article-info">
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
import {ref, reactive, onMounted, onUpdated} from "vue";
import api from "../api/index.js";
import {useRoute} from 'vue-router'
import hljs from "highlight.js/lib/core";

export default {
  name: 'ArticleDetail',
  updated() {
    const blocks = this.$el.querySelectorAll('.ql-syntax');
    blocks.forEach((block) => {
      // block.classList.add('language-java');
      hljs.highlightElement(block);
    });
  },
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
      }).catch(() => {
        location.href = "/404";
      });
    });

    return {
      articleContent: articleVO
    }
  }
}
</script>

<style scoped>
.article-detail {
  min-height: 1000px;
  background-color: #fafafa;
  margin: 20px 0;
  padding: 20px 30px;
  border-radius: 10px;
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

.content :deep(h3) {
  font-size: 26px;
  font-weight: bold;
}

.content :deep(img) {
  max-width: 100%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  margin-right: 20px;
}

.content :deep(li) {
  margin-top: 10px;
}

.content :deep(pre) {
  padding: 10px;
  background-color: #474949;
  color: #f8f8f2;
  font-size: 16px;
  line-height: 30px;
}

.content :deep(pre) span {
  font-size: 16px;
  line-height: 30px;
}

.article-info * {
  margin: auto 5px;
}

</style>