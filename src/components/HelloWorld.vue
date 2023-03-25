<template>
  <h1>哈囉Vue!</h1>
  <h2>Vue + Vite學習!</h2>
  <p>{{ msg }}</p>
  <p v-text="height"></p>
  <p v-text="data"></p>
</template>

<script>
import api from "../api/index.js";


export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "你好",
      height: "178cm",
      data: ""
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
h1 {
  color: rebeccapurple;
}
</style>