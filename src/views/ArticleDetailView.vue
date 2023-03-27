<template>
  <div>
    <MyNavBar/>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9">

            <div class="content shadow">
              <img src="" alt="" style="width: 80%;">
              <h1>Mybatis Plus basemapper iservice serviceimpl</h1>

              <div v-html="articleContent"></div>

            </div>

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
import {ref, reactive, onMounted} from "vue";

export default {
  name: 'ArticleDetail',
  components: {MyNavBar, MyFooter, SidebarArea},
  setup() {
    const articleContent = ref("<p>MyBatis-Plus是基於MyBatis進行擴展的一個開源持久層框架，提供了一系列方便、快捷的操作數據庫的方法和工具，進一步簡化了基於MyBatis的開發。</p><p>其中，BaseMapper、IService和ServiceImpl是MyBatis-Plus中三個核心接口和類，它們各自的用途如下：</p><ol><li>BaseMapper：BaseMapper是MyBatis-Plus提供的一個基礎的Mapper接口，它提供了一系列常用的CRUD操作方法，例如插入、更新、刪除和查詢等。BaseMapper中的方法都是通用的，可以應對大部分的數據庫操作需求，可以大大減少開發人員的代碼量。開發人員可以在自己的Mapper接口中繼承BaseMapper，從而獲得這些通用的操作方法。</li><li>IService：IService是MyBatis-Plus提供的一個基礎的Service接口，它定義了一系列的CRUD操作方法，例如插入、更新、刪除和查詢等。IService的作用是將對數據庫的操作從Controller層轉移到Service層，提高代碼的可維護性和可重用性。開發人員可以在自己的Service接口中繼承IService，從而獲得這些通用的操作方法。</li><li>ServiceImpl：ServiceImpl是MyBatis-Plus提供的一個基礎的Service實現類，它實現了IService中定義的CRUD操作方法。ServiceImpl的作用是提供一個通用的Service實現，減少開發人員的代碼量。開發人員可以在自己的Service實現類中繼承ServiceImpl，從而實現IService中定義的CRUD操作方法。</li></ol><p>總之，BaseMapper、IService和ServiceImpl是MyBatis-Plus中三個核心接口和類，它們分別用於定義通用的CRUD操作方法和提供通用的實現，可以大大減少開發人員的代碼量，提高開發效率和代碼的可維護性。</p>");

    return {
      articleContent
    }
  }
}
</script>

<style scoped>
.content {
  height: 1000px;
  background-color: #fff;
  margin: 20px;
  padding: 15px;
}
</style>