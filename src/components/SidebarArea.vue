<template>
  <div id="content-root">
    <div class="shadow content-item">
      <h2>關於本網站</h2>
      <img src="http://localhost:8080/2023/04/13/3267b99c-6250-4998-a5f3-0309ed630577.jpg" alt="">
      <p>這是一個簡單的內容管理系統</p>
      <p>前端使用Vue3 + BootStrap + Axios</p>
      <p>後端使用Spring Boot + MySQL</p>
    </div>

    <div class="shadow content-item" id="category">
      <h2>文章分類</h2>
      <p v-for="c in categories" @click.prevent="loadPage(c.name)">
        <span v-for="n in c.level">----</span>
        <span v-text="c.name"></span>
      </p>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import api from "../api/index.js";

export default {
  name: 'SidebarArea',
  setup() {
    const categories = ref([]);

    const loadPage = (category) => {
      location.href = "/articles?page=1&category=" + category;
    }

    onMounted(() => {
      api.getAllCategoriesTree().then(response => {
        categories.value = response.data;
      })
    })

    return {
      categories,
      loadPage
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

#category p {
  margin-bottom: 5px;
  cursor: pointer;
  color: #6f6f6f;
}

#category p:hover {
  color: cornflowerblue; /* 当鼠标悬停在 <p> 标签上时，将文本颜色设置为红色 */
}

</style>