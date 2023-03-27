<template>
  <div class="content">
    <div class="left-content">
      <div class="input-container">
        <label for="title" style="width: 70px">標題</label>
        <input type="text" class="form-control" id="title" placeholder="請輸入文章標題" style="margin-right: 10px;"
               v-model="title">
        <button @click="saveContent()" class="btn btn-success" style="height: 35px; width: 75px">保存</button>
      </div>

      <div>
        <QuillEditor ref="editor"></QuillEditor>
      </div>
    </div>

    <div class="right-content">
      <div class="article-detail shadow">
        <div style="background-color: #4a4a4a; padding: 1px 0">
          <p style="text-align: center; margin: 5px auto; font-weight: bold; font-size: 24px; color: white">
            文章詳情
          </p>
        </div>

        <div class="right-content-item">
          <label for="title">縮圖</label>
          <button style="display: block;" class="btn btn-outline-secondary">上傳圖片</button>
          <img src="" alt="">
        </div>

        <div class="right-content-item">
          <label for="title">摘要</label>
          <textarea type="text" class="form-control" id="title" placeholder="請輸入文章摘要" v-model="summary"/>
        </div>

        <div class="right-content-item">
          <label for="category">分類</label>
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
          <label for="category">發布狀態</label>
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
import {ref} from "vue";
import api from "../../api/index.js";

export default {
  name: 'ArticleEditor',
  setup() {
    const title = ref("");
    const summary = ref("");
    const thumbnail = ref("");
    const categoryId = ref(0);
    const status = ref(0);

    const editor = ref(null);

    const saveContent = () => {
      const formData = new FormData();

      const content = editor.value.getContent();

      console.log(content);

      formData.append("token", localStorage.getItem("token"));
      formData.append("title", title.value);
      formData.append("summary", summary.value);
      formData.append("content", content);
      formData.append("thumbnail", thumbnail.value);
      formData.append("categoryId", categoryId.value);
      formData.append("status", status.value);

      api.createArticle(formData).then(response => {
        alert("保存成功!");
      })
    };

    return {
      editor,
      saveContent,
      title,
      summary,
      thumbnail,
      categoryId,
      status
    }
  },
  components: {
    QuillEditor,
  }
}
</script>

<style scoped>
.content {
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
  padding: 5px;
}

.right-content-item {
  padding: 0 5px;
  margin: 10px 0;
}

.article-detail {
  height: 700px;
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
  height: 100px;
}
</style>