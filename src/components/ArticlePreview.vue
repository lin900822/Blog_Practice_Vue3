<template>
  <div id="article" class="shadow">
    <div class="thumbnail" v-show="articleData.thumbnail.length !== 0">
      <img :src="articleData.thumbnail" alt="">
    </div>
    <div class="info">
      <router-link :to="'/article/' + articleData.id" class="title">
        <h1 v-text="articleData.title"></h1>
      </router-link>
      <p class="details">
        <i class="bi-clock"></i>
        <span v-text="articleData.date"></span>
        <i class="bi bi-folder"></i>
        <span v-text="articleData.category"></span>
      </p>
      <p class="summary" v-text="articleData.summary"></p>
      <router-link :to="'/article/' + articleData.id" class="readmore">閱讀更多...</router-link>
    </div>

  </div>
</template>

<script>
import {ref, reactive, toRef} from "vue"

export default {
  name: 'Article',
  props: {
    articleData: {}
  },
  setup(props,ctx) {
    const articleData = reactive(props.articleData)
    return {
      articleData
    }
  }
};
</script>

<style scoped>
#article {
  margin: 20px 0;
  background-color: #fff;
  border-radius: 10px;
}

.thumbnail {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  height: 100%;
  overflow: hidden;
}

.thumbnail > img {
  border-radius: 5px;
  max-height: 100%;
  max-width: 100%;
}

.info {
  padding: 25px;
  position: relative;
}

.title {
  text-decoration: none;
}

.title > h1 {
  margin-top: 20px;
  font-size: 28px;
  font-weight: bold;
  color: black;
}

.details {
  font-size: 16px;
  color: #666;
}

.details > * {
  margin: auto 5px;
}

.summary {
  height: 80px;
  overflow: hidden;
  overflow-wrap: break-word;
}

.readmore {
  text-decoration: none;
  color: #0066FF;
  display: block;
  text-align: right;
  margin-right: 10px;
  bottom: 0px;
}

</style>