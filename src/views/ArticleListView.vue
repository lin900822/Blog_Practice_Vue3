<template>
  <div>
    <MyNavBar/>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-9">
            <ArticleListArea></ArticleListArea>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-3">
            <SidebarArea></SidebarArea>
          </div>
        </div>
      </div>
    </div>
    <MyFooter></MyFooter>
  </div>
</template>

<script setup>
import MyNavBar from "../components/Common/MyNavBar.vue";
import MyFooter from "../components/Common/MyFooter.vue";
import SidebarArea from "../components/SidebarArea.vue"
import ArticleListArea from "../components/ArticleListArea.vue";
</script>

<style>

</style>