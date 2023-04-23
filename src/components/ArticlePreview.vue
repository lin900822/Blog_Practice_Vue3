<template>
  <div id="article" class="shadow">
    <div class="thumbnail" v-show="articleData.thumbnail.length !== 0">
      <router-link :to="'/article/' + articleData.id">
        <img class="shadow" :src="articleData.thumbnail" alt="">
      </router-link>
    </div>
    <div class="info">
      <router-link :to="'/article/' + articleData.id" class="title">
        <h1 v-text="articleData.title"></h1>
      </router-link>
      <p class="details">
        <i class="bi-clock"></i>
        <span v-text="articleData.updatedAt"></span>
        <i class="bi bi-tags"></i>
        <span v-text="articleData.category"></span>
      </p>
      <p class="summary" v-text="articleData.summary"></p>
      <router-link :to="'/article/' + articleData.id" class="readmore" style="color: #999; font-weight:bold;">閱讀更多<i class="bi bi-chevron-right"></i></router-link>
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
  margin-bottom: 10px;
}

.thumbnail img {
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
  height: 75px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
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