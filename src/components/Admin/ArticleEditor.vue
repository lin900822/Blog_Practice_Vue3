<template>
  <div class="article-editor-detail">
    <div class="left-content">
      <div class="input-container">
        <label for="title" style="width: 70px">標題</label>
        <input type="text" class="form-control" id="title" placeholder="請輸入文章標題" style="margin-right: 10px;"
               v-model="articleVO.title">
        <button @click="saveContent()" class="btn btn-success" style="height: 35px; width: 75px">保存</button>
      </div>

      <div>
        <QuillEditor ref="editor"></QuillEditor>
      </div>
    </div>

    <div class="right-content">
      <div class="article-info shadow">
        <div style="background-color: #4a4a4a; padding: 1px 0">
          <p style="text-align: center; margin: 5px auto; font-weight: bold; font-size: 24px; color: white">
            文章詳情
          </p>
        </div>

        <div class="right-content-item">
          <label>縮圖</label>
          <label class="btn btn-outline-secondary" style="display: block; width: 120px; height: 35px; font-size: 16px; line-height: 22px;">
            <input type="file" ref="fileInput" @change="handleFileUpload()" style="display: none;">
            <i class="bi bi-image"></i>
            上傳圖片
          </label>
          <img :src="articleVO.thumbnail" alt="" style="margin-top: 10px; max-height: 150px; max-width: 100%;">
        </div>

        <div class="right-content-item">
          <label>摘要</label>
          <textarea type="text" class="form-control" id="title" placeholder="請輸入文章摘要" v-model="articleVO.summary"/>
        </div>

        <div class="right-content-item">
          <label>分類</label>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu" data-bs-toggle="dropdown"
                    aria-expanded="false">
              未分類
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </div>

        <div class="right-content-item">
          <label>發布狀態</label>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu" data-bs-toggle="dropdown"
                    aria-expanded="false">
              草稿
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
import QuillEditor from "./QuillEditor.vue";
import {reactive, ref} from "vue";
import api from "../../api/index.js";

export default {
  name: 'ArticleEditor',
  setup() {
    const articleVO = reactive({
      title: "",
      summary: "",
      thumbnail: "",
      category: "",
      status: 0
    })

    const fileInput = ref(null);

    const editor = ref(null);

    const handleFileUpload = () => {
      const file = fileInput.value.files[0];

      api.uploadFile(file).then(response => {
        articleVO.thumbnail = response.data;
      })
    };

    const saveContent = () => {
      const formData = new FormData();

      const content = editor.value.getContent();

      console.log(content);

      formData.append("token", localStorage.getItem("token"));
      formData.append("title", articleVO.title);
      formData.append("summary", articleVO.summary);
      formData.append("content", content);
      formData.append("thumbnail", articleVO.thumbnail);
      formData.append("categoryId", articleVO.category);
      formData.append("status", articleVO.status);

      api.createArticle(formData).then(response => {
        alert("保存成功!");
      })
    };

    return {
      editor,
      articleVO,
      saveContent,
      handleFileUpload,
      fileInput
    }
  },
  components: {
    QuillEditor,
  }
}
</script>

<style scoped>
.article-editor-detail {
  width: 100%;
  display: flex;
}

.left-content {
  display: inline-block;
  width: 75%;
  margin: 0 10px;
}

.right-content {
  display: inline-block;
  width: 25%;
  margin: 0 10px;
  padding: 10px;
}

.right-content-item {
  padding: 0 5px;
  margin: 10px 0;
}

.article-info {
  height: 650px;
  background-color: #fafafa;
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

label {
  margin-right: 10px;
  font-weight: bold;
  font-size: 24px;
}

textarea {
  min-height: 100px;
  max-height: 100px;
}

</style>