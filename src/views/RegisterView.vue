<template>
  <div id="register-background">
    <div id="register" class="shadow">
      <form action="javascript:void(0)" id="register-form">
        <h1>註冊</h1>
        <input class="form-control margin-ver-15" type="text" name="username" placeholder="請輸入使用者名稱"
               aria-label="default input example">
        <input class="form-control margin-ver-15" type="email" name="email" placeholder="請輸入電子郵件信箱"
               aria-label="default input example">
        <input class="form-control margin-ver-15" type="text" name="nickname" placeholder="請輸入暱稱"
               aria-label="default input example">
        <input class="form-control margin-ver-15" type="password" name="password" placeholder="請輸入密碼"
               aria-label="default input example" v-model="password">
        <input class="form-control margin-ver-15" type="password" name="confirmPassword" placeholder="確認密碼"
               aria-label="default input example" v-model="confirmPassword">

        <p v-text="errorMessage" style="color: red; text-align: center; margin-top: 15px"></p>
        <button type="button" class="btn btn-primary" @click="register()">註冊</button>
      </form>
    </div>
  </div>
</template>

<script>
import {ref, reactive, onMounted} from "vue"
import api from "../api/index.js";

export default {
  name: 'RegisterView',
  setup() {
    const password = ref("");
    const confirmPassword = ref("");

    const errorMessage = ref("");

    const register = () => {
      errorMessage.value = "";

      if(password.value != confirmPassword.value){
        errorMessage.value = "密碼不一致!";
        return;
      }

      const formData = new FormData(document.getElementById('register-form'));

      api.register(formData).then(response => {
        console.log(response.data);
        alert("註冊成功!");
        location.href = "/login";
      }).catch(error => {
        console.log(error.response.data);
        errorMessage.value = error.response.data.message;
      })
    };

    return {
      register,
      errorMessage,
      password,
      confirmPassword
    }
  }
}
</script>

<style scoped>

#register-background {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#register {
  position: relative;
  top: -50px;
  background-color: #fff;
  border-radius: 10px;
  width: 50vw;
  padding: 20px;
  max-width: 450px;
  min-width: 350px;
}

#register > * {
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