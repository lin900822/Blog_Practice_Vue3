<template>
  <div id="login-background">
    <div id="login" class="shadow">
      <form action="javascript:void(0)" @keydown.enter="login()">
        <h1>登入</h1>
        <input class="form-control margin-ver-15" type="text" name="username" placeholder="請輸入使用者名稱"
               aria-label="default input example" v-model="username">
        <input class="form-control margin-ver-15" type="password" name="password" placeholder="請輸入密碼"
               aria-label="default input example" v-model="password">
        <div class="form-check margin-ver-15">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
<!--          <label class="form-check-label" for="flexCheckDefault">-->
<!--            記住我-->
<!--          </label>-->
        </div>

        <p v-text="errorMessage" style="color: red; text-align: center; margin-top: 15px"></p>
        <button type="button" class="btn btn-primary" @click.prevent="login()">登入</button>
      </form>
    </div>
  </div>
</template>

<script>
import {ref, reactive, toRef} from "vue"
import axios from "axios";
import api from "../api/index.js";

export default {
  name: 'Article',
  setup(props, ctx) {
    const username = ref("");
    const password = ref("");
    const errorMessage = ref("");

    const login = () => {
      errorMessage.value = "";
      api.login(username.value, password.value).then(response => {
        const token = response.data;
        localStorage.setItem("token", token);

        location.href = "/";
      }).catch(error => {
        console.log(error.response.data);
        errorMessage.value = error.response.data.message;
      });
    }

    return {
      username,
      password,
      errorMessage,
      login
    }
  }
};
</script>

<style scoped>

#login-background {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#login {
  position: relative;
  top: -50px;
  background-color: #fff;
  border-radius: 10px;
  width: 50vw;
  padding: 20px;
  max-width: 450px;
  min-width: 350px;
}

#login > * {
  margin: 15px;
}

.margin-ver-15 {
  margin: 15px auto;
}

h1 {
  text-align: center;
}

button {
  display: block;
  text-align: center;
  width: 100%;
}
</style>