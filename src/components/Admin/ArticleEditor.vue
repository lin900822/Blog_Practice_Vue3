<template>
  <div class="article-detail">
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
          <label class="btn btn-outline-secondary"
                 style="display: block; width: 120px; height: 35px; font-size: 16px; line-height: 22px;">
            <input type="file" ref="fileInput" @change="handleThumbnailUpload()" style="display: none;">
            <i class="bi bi-image"></i>
            上傳圖片
          </label>
          <img :src="articleVO.thumbnail" alt="" style="margin-top: 10px; max-height: 150px; max-width: 100%;">
        </div>

        <div class="right-content-item">
          <label>摘要</label>
          <textarea type="text" class="form-control" id="title" placeholder="請輸入文章摘要"
                    v-model="articleVO.summary"/>
        </div>

        <div class="right-content-item">
          <label>分類</label>
          <select class="form-control" id="category" v-model="articleVO.category">
            <option v-for="c in categories" :value="c.name">
              <span v-for="n in c.level">--</span>
              {{c.name}}
            </option>
          </select>
        </div>

        <div class="right-content-item">
          <label>發布狀態</label>
          <select class="form-control" id="status" v-model="articleVO.status">
            <option value="0">不公開</option>
            <option value="1">公開</option>
          </select>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
import QuillEditor from "./QuillEditor.vue";
import {onMounted, reactive, ref, toRaw, toRefs} from "vue";
import api from "../../api/index.js";
import {useRoute} from "vue-router";


export default {
  name: 'ArticleEditor',
  components: {
    QuillEditor
  },
  setup() {
    const route = useRoute();
    const articleId = route.params.articleId;

    const categories = ref([]);

    const articleVO = reactive({
      title: "",
      summary: "",
      thumbnail: "",
      content: "",
      category: "",
      status: 0,
      createdAt: "",
      updatedAt: ""
    })

    const fileInput = ref(null);

    const editor = ref(null);

    const handleThumbnailUpload = () => {
      const file = fileInput.value.files[0];

      api.uploadFile(file).then(response => {
        articleVO.thumbnail = response.data;
      })
    };

    const saveContent = () => {
      const formData = new FormData();

      articleVO.content = editor.value.getContent();

      formData.append("token", localStorage.getItem("token"));

      if (articleId != null)
        formData.append("id", articleId);

      formData.append("title", articleVO.title);
      formData.append("summary", articleVO.summary);
      formData.append("thumbnail", articleVO.thumbnail);
      formData.append("content", articleVO.content);
      formData.append("category", articleVO.category);
      formData.append("status", articleVO.status);

      api.saveArticle(formData).then(response => {
        alert("保存成功!");

        if (articleId == null)
          location.href = "/admin/ArticleEditor/" + response.data;
      });
    };

    onMounted(() => {
      if (articleId != null) {
        api.getArticleDetail(articleId).then(response => {
          articleVO.title = response.data.title;
          articleVO.summary = response.data.summary;
          articleVO.thumbnail = response.data.thumbnail;
          articleVO.content = response.data.content;
          articleVO.category = response.data.category;
          articleVO.status = response.data.status;
          articleVO.createdAt = response.data.createdAt;
          articleVO.updatedAt = response.data.updatedAt;

          editor.value.setContent(articleVO.content);
        }).catch(() => {
          location.href = "/admin/ArticleEditor";
        })
      }

      document.addEventListener('keydown', function(event) {
        // 如果同时按下Ctrl和S键
        if (event.ctrlKey && event.keyCode === 83) {
          event.preventDefault(); // 阻止默认行为，即保存页面
          // 在这里添加自定义代码，例如发送保存请求等等
          saveContent();
        }
      });

      api.getAllCategoriesTree().then(response => {
        categories.value = response.data;
      })

    });

    return {
      categories,
      editor,
      articleVO,
      saveContent,
      handleThumbnailUpload,
      fileInput
    }
  }
};
</script>

<style scoped>
.article-detail {
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