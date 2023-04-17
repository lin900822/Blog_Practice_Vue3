<template>
  <div>
    <div class="wrapper">
      <!-- Sidebar  -->
      <AdminSideBar id="sidebar"></AdminSideBar>
      <!-- Page Content  -->
      <div id="content">
        <button type="button" id="sidebarCollapse" class="btn"
                style="background-color: #333; color: white; border-radius: 0px">
          <span>
            <i class="bi bi-speedometer"></i>
          </span>
        </button>

        <div style="padding: 10px;">
          <span style="font-weight:bold; font-size: 40px;">基礎設定</span>

          <div>
            <label>網站名稱</label>
            <input type="text" class="form-control" placeholder="請輸入網站名稱" v-model="websiteName"/>
          </div>

          <div>
            <label>網站縮圖</label>
            <label class="btn btn-outline-secondary"
                   style="display: inline-block; width: 120px; height: 35px; font-size: 16px; line-height: 22px; margin-right: 5px;"
                   @click.prevent="openResourceSelector">
              選擇圖片
            </label>
            <label class="btn btn-outline-secondary"
                   style="display: inline-block; width: 50px; height: 35px; font-size: 16px; line-height: 22px;"
                   @click="clearThumbnail">
              <i class="bi bi-trash-fill"></i>
            </label>
            <img :src="websiteThumbnail" alt="">
          </div>

          <button style="margin-top: 20px;" class="btn btn-success" @click="saveBasic">儲存</button>

        </div>

      </div>
    </div>
  </div>

  <ResourceSelector selectorId="admin-basic-view" ref="resourceSelectorRef"
                    :on-selected="handleSelected"></ResourceSelector>

</template>

<script>
import $ from 'jquery'
import AdminSideBar from "../../components/Admin/AdminSideBar.vue";
import {onMounted, ref} from "vue";
import ResourceSelector from "../../components/Admin/ResourceSelector.vue"
import api from "../../api/index.js";

$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });
});

export default {
  name: "AdminBasicView",
  components: {ResourceSelector, AdminSideBar},
  setup() {
    const resourceSelectorRef = ref();
    const websiteName = ref("");
    const websiteThumbnail = ref("");

    const openResourceSelector = () => {
      resourceSelectorRef.value.open();
    }

    const handleSelected = (value) => {
      resourceSelectorRef.value.close();
      websiteThumbnail.value = value;
    }

    const clearThumbnail = () => {
      websiteThumbnail.value = "";
    }

    const saveBasic = () => {
      api.saveBasic(websiteName.value, websiteThumbnail.value).then(() => {
        location.reload();
      })
    }

    onMounted(() => {
      api.getBasic().then(response => {
        websiteName.value = response.data.websiteName;
        websiteThumbnail.value = response.data.websiteThumbnail;
      })
    })

    return {
      resourceSelectorRef,
      websiteName,
      websiteThumbnail,
      openResourceSelector,
      handleSelected,
      clearThumbnail,
      saveBasic
    }
  }
}

</script>

<style scoped>
body {
  background: #fafafa;
}

p {
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

#content {
  width: 100%;
  min-height: 100vh;
  transition: all 0.3s;
}

/**/

label {
  display: block;
  font-weight: bold;
  font-size: 24px;
  margin: 10px auto 10px auto;
}

input {
  width: 50%;
}

img {
  display: block;
  max-width: 250px;
  max-height: 250px;
}

</style>