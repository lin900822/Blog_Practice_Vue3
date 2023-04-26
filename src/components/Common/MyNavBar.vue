<template>
  <div class="shadow">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="nav-link active" aria-current="page" to="/">
          <span id="logo-text" style="margin: 10px;" v-text="websiteName"></span>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" style="margin: 10px;">
              <a href="" @click.prevent="loadPage('/')" style="display: block; width: inherit;">首頁</a>
            </li>
            <li class="nav-item" style="margin: 10px;" v-for="category in state.categories">
              <a href="" @click.prevent="loadPage(category.router)" v-text="category.name"
                 style="display: block; width: inherit;"></a>
            </li>
          </ul>

          <div class="log-reg" v-show="!isAuthenticated">
            <router-link class="nav-link active text-horizontal-center" style="display: inline-block"
                         aria-current="page" to="/login">
              <button type="button" class="btn">登入</button>
            </router-link>
            <router-link class="nav-link active" aria-current="page" style="display: inline-block" to="/register">
              <button type="button" class="btn btn-primary">註冊</button>
            </router-link>
          </div>
          <div v-show="isAuthenticated">
            <b v-text="nickname"></b>
            <span style="margin-right: 15px;"> 您好!</span>
            <button type="button" class="btn btn-primary" @click="logout()">登出</button>
          </div>

        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import {ref, reactive, onMounted} from "vue"
import api from "../../api/index.js";

export default {
  name: 'MyNavbar',
  setup() {
    const websiteName = ref("");

    const state = reactive({
      categories: [
        {id: 0, name: "作品集", router: "/articles"},
        {id: 1, name: "文章", router: "/articles"}
      ]
    });

    const isAuthenticated = ref(false);
    const nickname = ref("");

    const loadPage = (url) => {
      location.href = url;
    }

    onMounted(() => {
      api.getBasic().then(response => {
        websiteName.value = response.data.websiteName;
      })

      if (!localStorage.getItem("token")) return;

      api.getUser().then(response => {
        if (response.data == "JWT Expired") {
          return;
        }

        nickname.value = response.data.nickname;
        isAuthenticated.value = true;
      }).catch(error => {
        console.log(error.response.data);
      });
    });

    const logout = () => {
      if (confirm("您確定要登出嗎?")) {
        localStorage.setItem("token", "");
        location.reload();
      }
    };

    return {
      websiteName,
      state,
      isAuthenticated,
      nickname,
      logout,
      loadPage
    }
  }
}
</script>

<style scoped>
#logo-text {
  font-weight: bold;
}

#navbarSupportedContent {
  margin-left: 20px;
}

.text-horizontal-center {
  display: flex;
  align-items: center;
}

li {
  margin: auto 5px;
}

.log-reg {
  display: flex;
  float: right;
}

a {
  text-decoration: none; /* 去除下划线 */
  color: inherit; /* 继承父元素的文本颜色 */
  margin-right: 15px;
}

</style>
