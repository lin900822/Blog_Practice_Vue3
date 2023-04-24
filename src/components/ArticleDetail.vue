<template>
  <div class="article-detail shadow">
    <div style="text-align:center;">
      <img class="shadow" :src='articleVO.thumbnail' alt="" style="max-height: 720px; max-width: 100%; margin: 0 auto;"
           v-show="articleVO.thumbnail != ''">
    </div>

    <h1 v-text="articleVO.title"></h1>
    <p class="article-info">
      <i class="bi bi-clock"></i>
      <span v-text="articleVO.createdAt"></span>

      <i class="bi bi-tags"></i>
      <span v-text="articleVO.category"></span>
    </p>
    <hr>

    <div class="content">
      <div v-html="articleVO.content"></div>
    </div>
  </div>

  <div id="comment" class="comment-area shadow">
    <h2>討論</h2>
    <div>
      <div class="comment" v-for="c in comments">
        <h2>{{ c.nickname }} ：</h2>
        <span>發表於{{c.createdAt}}</span>
        <div class="operation" v-show="userId == c.userId">
          <button class="btn btn-secondary" @click="editBtnClicked(c.id)"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-danger" @click="deleteBtnClicked(c.id)"><i class="bi bi-trash"></i></button>
        </div>
        <p v-show="editingId != c.id" v-text="c.content"></p>
        <div v-show="editingId == c.id">
          <textarea class="form-control" v-model="editedComment" :placeholder="c.content"
                    style="width: 100%; max-height: 80px; min-height: 80px; margin-bottom: 10px;"/>
          <button class="btn btn-success" @click="updateComment(c.id)">修改</button>
        </div>
      </div>
    </div>
    <div>
      <textarea class="form-control" v-model="comment" placeholder="說點什麼吧!"
                style="width: 100%; max-height: 80px; min-height: 80px; margin-bottom: 10px;"/>
      <button class="btn btn-primary" @click="addComment">送出</button>
    </div>
  </div>
</template>

<script>
import {ref, reactive, onMounted, onUpdated} from "vue";
import api from "../api/index.js";
import {useRoute} from 'vue-router'
import hljs from "highlight.js/lib/core";
import formatDate from "../utils/dateFormatter.js";

export default {
  name: 'ArticleDetail',
  updated() {
    // const blocks = this.$el.querySelectorAll('.ql-syntax');
    // blocks.forEach((block) => {
    //   // block.classList.add('language-java');
    //   hljs.highlightElement(block);
    // });
  },
  setup() {
    const articleVO = reactive({
      title: "",
      thumbnail: "",
      content: "",
      category: "",
      createdAt: ""
    });

    const comments = ref();

    const userId = ref("");

    const route = useRoute();

    onMounted(() => {
      const articleId = route.params.articleId;

      api.getArticleDetail(articleId).then(response => {
        articleVO.title = response.data.title;
        articleVO.thumbnail = response.data.thumbnail;
        articleVO.content = response.data.content;
        articleVO.category = response.data.category;
        if(articleVO.category.length == 0){
          articleVO.category="未分類";
        }
        articleVO.createdAt = formatDate(response.data.createdAt);
      }).catch(() => {
        location.href = "/404";
      });

      api.getCommentsByArticleId(articleId).then(response => {
        comments.value = response.data;

        for (let i = 0; i < comments.value.length; i++) {
          comments.value[i].createdAt = formatDate(comments.value[i].createdAt);
        }
      })

      api.getUser().then(response => {
        userId.value = response.data.id;
      })
    });

    const comment = ref("");

    const addComment = () => {
      const articleId = route.params.articleId;
      api.addComment(comment.value, articleId).then(response => {
        let data = response.data;
        data.createdAt = formatDate(data.createdAt);
        comments.value.push(data);
        comment.value = "";
      }).catch(error => {
        alert("請先登入!")
      })
    }

    const editedComment = ref("");
    const editingId = ref(0);

    const updateComment = (id) => {
      api.updateComment(id, editedComment.value).then(response => {
        editingId.value = 0;
        for (let i = 0; i < comments.value.length; i++) {
          if (comments.value[i].id == id) {
            comments.value[i].content = editedComment.value;
            break;
          }
        }
      })
    }

    const editBtnClicked = (id) => {
      editingId.value = id;
    }

    const deleteBtnClicked = (id) => {
      if (confirm("您確定要刪除這則評論嗎?")) {
        api.deleteComment(id).then(response => {
          for (let i = 0; i < comments.value.length; i++) {
            if (comments.value[i].id == id) {
              comments.value.splice(i, 1);
              break;
            }
          }
        })
      }
    }

    return {
      articleVO,
      comment,
      comments,
      editingId,
      userId,
      editedComment,
      updateComment,
      addComment,
      editBtnClicked,
      deleteBtnClicked
    }
  }
}
</script>

<style scoped>
.article-detail {
  min-height: 1000px;
  background-color: #fafafa;
  margin: 20px 0 50px 0;
  padding: 20px 30px;
  border-radius: 10px;
}

h1 {
  font-weight: bolder;
  margin: 45px 0 30px 0;
  font-size: 48px;
}

.content {

}

.content :deep(*) {
  font-size: 20px;
  line-height: 36px;
  margin-top: 30px;
}

.content :deep(h2) {
  font-size: 36px;
  font-weight: bolder;
}

.content :deep(h3) {
  font-size: 26px;
  font-weight: bold;
}

.content :deep(img) {
  max-width: 100%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  margin-right: 20px;
}

.content :deep(li) {
  margin-top: 10px;
}

.content :deep(pre) {
  padding: 10px;
  background-color: #474949;
  color: #f8f8f2;
  font-size: 16px;
  line-height: 30px;
}

.content :deep(pre) span {
  font-size: 16px;
  line-height: 30px;
}

.article-info * {
  margin: auto 5px;
}

/**/

.comment-area {
  min-height: 100px;
  background-color: #fafafa;
  margin: 0px 0 50px 0;
  padding: 20px 30px;
  border-radius: 10px;
}

.comment-area h2 {
  font-weight: bold;
  font-size: 36px;
  margin-bottom: 10px;
}

.comment {
  min-height: 100px;
  border: 1px solid #cccccc;
  border-radius: 10px;
  margin: 10px 0;
  padding: 20px;
  background-color: #fff;
  position: relative;
}

.comment span {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 12px;
  color: #9f9f9f;
}

.comment h2 {
  display: inline-block;
  font-weight: bold;
  font-size: 20px;
}

.operation {
  display: inline-block;
  float: right;
}

.operation > button {
  width: 30px;
  height: 25px;
  padding: 0;
  margin-bottom: 5px;
  margin-right: 5px;
}

.comment button i {
  font-size: 12px;
}

.comment p {
  margin-left: 15px;
  width: 100%;
  word-wrap: break-word;
}

</style>