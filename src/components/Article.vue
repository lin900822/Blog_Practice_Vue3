<template>
  <div id="article" class="shadow">
    <div class="container no-gutters">
      <div class="row no-gutters p-0">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 no-gutters p-0 overflow-hidden">
          <div class="thumbnail">
            <img :src="state.thumbnailUrl" alt="">
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 no-gutters p-0">
          <div class="info">
            <router-link to="/" class="title">
              <h1 v-text="state.title"></h1>
            </router-link>
            <p class="details">
              <i class="bi-clock"></i>
              <span v-text="state.date"></span>
              <i class="bi bi-folder"></i>
              <span v-text="state.category"></span>
            </p>
            <p class="summary" v-text="state.summary"></p>
            <router-link to="/" class="readmore">閱讀更多...</router-link>
          </div>
        </div>
      </div>
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
    const state = reactive(props.articleData)
    return {
      state
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
  padding: 15px;
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