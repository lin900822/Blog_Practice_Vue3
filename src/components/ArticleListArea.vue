<template>
  <div class="" id="content-root">
    <Article v-for="articleData in state.articleDataList" :article-data="articleData"></Article>
  </div>
</template>

<script>
import {ref, reactive, toRef} from "vue"
import Article from "./ArticlePreview.vue";

export default {
  name: 'ArticleArea',
  components: {Article},
  setup() {
    const state = reactive({
      articleDataList:[
        {
          id: 0,
          thumbnailUrl: "/src/assets/1.jpg",
          title: "Fusion 快速建立Session範本",
          date: "2023/03/08",
          category: "Unity",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id luctus urna. Quisque ullamcorper sit amet dui at interdum. Nam mauris diam, fermentum eget diam sit amet, ullamcorper mattis tortor."
        },
        {
          id: 1,
          thumbnailUrl: "/src/assets/2.jpg",
          title: "Mybatis 當查詢的字段名和封裝數據對象的屬性名不一致時，必須單獨指定",
          date: "2019/05/02",
          category: "Java",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id luctus urna. Quisque ullamcorper sit amet dui at interdum. Nam mauris diam, fermentum eget diam sit amet, ullamcorper mattis tortor."
        },
        {
          id: 2,
          thumbnailUrl: "/src/assets/3.jpg",
          title: "Mybatis 當查詢的字段名和封裝數據對象的屬性名不一致時，必須單獨指定",
          date: "2019/05/02",
          category: "Java",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id luctus urna. Quisque ullamcorper sit amet dui at interdum. Nam mauris diam, fermentum eget diam sit amet, ullamcorper mattis tortor."
        },
        {
          id: 3,
          thumbnailUrl: "/src/assets/1.jpg",
          title: "Mybatis 當查詢的字段名和封裝數據對象的屬性名不一致時，必須單獨指定",
          date: "2019/05/02",
          category: "Java",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id luctus urna. Quisque ullamcorper sit amet dui at interdum. Nam mauris diam, fermentum eget diam sit amet, ullamcorper mattis tortor."
        }
      ]
    })
    return {
      state
    }
  }
}
</script>

<style scoped>
#content-root{
  margin: 0px 0px 20px 0px;
  overflow: hidden;
}
</style>