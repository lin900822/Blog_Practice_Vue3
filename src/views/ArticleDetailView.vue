<template>
  <div>
    <MyNavBar/>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9">

            <ArticleDetail></ArticleDetail>

          </div>
          <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <SidebarArea></SidebarArea>
          </div>
        </div>
      </div>
    </div>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyNavBar from "../components/Common/MyNavBar.vue";
import MyFooter from "../components/Common/MyFooter.vue";
import SidebarArea from "../components/SidebarArea.vue";
import ArticleDetail from "../components/ArticleDetail.vue";
import {ref, reactive, onMounted} from "vue";

export default {
  name: 'ArticleDetailView',
  components: {MyNavBar, MyFooter, SidebarArea, ArticleDetail},
  setup() {

  }
}
</script>

<style scoped>

</style>