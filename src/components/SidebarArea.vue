<template>
  <div id="content-root">
    <div class="shadow content-item">
      <h2>關於</h2>
      <img :src="websiteThumbnail" alt="">
      <p>歡迎來到Wilson Lin's Blog</p>
      <p>這是一個簡單的個人部落格，用來記錄我的學習歷程</p>
      <p>使用技術：</p>
      <p>前端：Vue3 + BootStrap + Axios</p>
      <p>後端：Spring Boot + MySQL + Redis</p>
    </div>

    <div class="shadow content-item" id="category">
      <h2>文章分類</h2>
      <router-link class="nav-link active" aria-current="page" :to="'/articles?page=1&category=' + c.name" v-for="c in categories">
          <span v-for="n in c.level">----</span>
          <span v-text="c.name"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
import {inject, nextTick, onMounted, ref} from "vue";
import api from "../api/index.js";
import router from "../router/index.js";

export default {
  name: 'SidebarArea',
  setup() {
    const categories = ref([]);
    const websiteThumbnail = ref("");

    onMounted(() => {
      api.getAllCategoriesTree().then(response => {
        categories.value = response.data;
      })

      api.getBasic().then(response => {
        websiteThumbnail.value =response.data.websiteThumbnail;
      })
    })

    return {
      categories,
      websiteThumbnail
    }
  }
}
</script>

<style scoped>
#content-root {
  margin: 20px auto;
}

.content-item {
  background-color: #fafafa;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
}

.content-item h2 {
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  margin: 5px 0 15px 0;
}

.content-item img {
  display: block;
  width: 50%;
  margin: auto auto 25px auto;
  border-radius: 50%;
}

#category .router-link-active {
  margin-bottom: 5px;
  cursor: pointer;
  color: #6f6f6f;
}

#category .router-link-active:hover {
  color: cornflowerblue;
}

#category a {
  margin-bottom: 5px;
  cursor: pointer;
  color: #6f6f6f;
}

#category a:hover {
  color: cornflowerblue;
}

</style>