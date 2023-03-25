<template>
  <div id="login-view">
    <div id="login" class="shadow">
      <form action="javascript:void(0)">
        <h1>註冊</h1>
        <input class="form-control margin-ver-15" type="text" name="username" placeholder="請輸入使用者名稱" aria-label="default input example">
        <input class="form-control margin-ver-15" type="text" name="nickname" placeholder="請輸入暱稱" aria-label="default input example">
        <input class="form-control margin-ver-15" type="password" name="password" placeholder="請輸入密碼" aria-label="default input example">
        <input class="form-control margin-ver-15" type="password" name="confirm" placeholder="確認密碼" aria-label="default input example">

        <button type="button" class="btn btn-primary">註冊</button>
      </form>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

#login-view {
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

.margin-ver-15{
  margin: 15px auto;
}

h1 {
  text-align: center;
}

button{
  display: block;
  text-align: center;
  width: 100% ;
}
</style>