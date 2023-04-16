<template>
  <div :id="selectorId" class="modal">
    <div class="modal-content">
      <span class="close" @click="close()">&times;</span>

      <div>
        <span style="font-weight:bold; font-size: 36px; margin: 20px 0 15px 10px; display: inline-block; width: 200px">資源列表</span>
        <label class="btn btn-outline-secondary"
               style="display: inline-block; width: 120px; height: 45px; font-size: 18px; line-height: 31px;
                margin: 24px 30px auto 0px; float: right;">
          <input type="file" ref="fileInput" @change="handleThumbnailUpload()" style="display: none;">
          上傳圖片
        </label>
      </div>


      <div id="resource-list">
        <div class="resource shadow" v-for="r in resourceList">
          <img class="shadow" :src="r.url"
               alt="">
          <p v-text="r.name"></p>
          <span v-text="r.fileSize"></span>
          <span v-text="r.createdAt"></span>
          <button class="btn btn-secondary" @click="onSelected(r.url)">選擇</button>
        </div>

      </div>

      <PageSelector :change-page="changePage" :page-info="pageInfo"></PageSelector>

    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import api from "../../api/index.js";
import PageSelector from "../Common/PageSelector.vue";

export default {
  name: 'ResourceSelector',
  components: {PageSelector},
  props:{
    onSelected:{
      type: Function,
      required: true
    },
    selectorId: ""
  },
  setup(props) {
    const open = () => {
      // 因為這裡是直接用dom查ID，如果同個頁面有兩個以上ResourceSelector組件的話，就都會查到第一個即果，第二個以後都不會被查到
      // 所以要讓每個ResourceSelector有獨立的ID，避免這個摁提
      document.getElementById(props.selectorId).style.display = "block";

      api.getAllResources(1).then(response => {
        resourceList.value = response.data.list;
        pageInfo.value = response.data;
      })
    }

    const close = () => {
      document.getElementById(props.selectorId).style.display = "none";
    }

    const resourceList = ref([]);
    const pageInfo = ref({});


    onMounted(() => {

    });

    const changePage = (pageNum) => {
      if (pageNum < 1 || pageNum > pageInfo.pages) return;

      api.getAllResources(pageNum).then(response => {
        resourceList.value = response.data.list;
        pageInfo.value = response.data;
      })
    };

    const fileInput = ref(null);

    const handleThumbnailUpload = () => {
      const file = fileInput.value.files[0];

      api.uploadFile(file).then(response => {
        changePage(1);
      })
    };


    return {
      open,
      close,
      changePage,
      handleThumbnailUpload,
      resourceList,
      pageInfo,
      fileInput
    }
  }
}
</script>

<style scoped>
.modal {
  display: none;
  position: fixed; /* 設置為固定位置 */
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4); /* 設置背景顏色和透明度 */
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 75%;
  height: 90%;
  position: absolute; /* 設置為絕對位置 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 使其置中 */
}

.close {
  color: #000;
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

/**/

#resource-list {
  width: 100%;
  height: 100%;
}

.resource {
  height: 230px;
  width: 200px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: inline-block;
  padding: 10px;
  margin: 5px;
}

.resource img {
  display: block; /* 将 <img> 标签设置为块级元素 */
  margin: 5px auto 0px auto; /* 将左右外边距设置为 auto，使其在父容器中水平居中 */
  max-width: 100%;
  height: 80px;
  border: 1px solid #3d3d3d;
}

.resource p {
  text-align: center;
  color: black;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
  margin-top: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.resource span {
  display: block;
  text-align: center;
  color: black;
  font-size: 14px;
}

.resource button {
  text-align: center;
  margin: 5px auto 10px auto; /* 将左右外边距设置为 auto，使其在父容器中水平居中 */
  width: 100%;
  display: block;
}

label {
  margin-right: 10px;
  font-weight: bold;
  font-size: 24px;
}

</style>