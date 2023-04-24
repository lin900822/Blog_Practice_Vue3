<template>
  <div>
    <MyNavBar/>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <div style="overflow: hidden;">
              <div class="thumbnail">
                <img :src="websiteThumbnail" alt="">
              </div>
              <p class="name">林緯宸</p>
              <div class="github">
                <a href="https://github.com/lin900822">
                  <i class="bi bi-github" style="font-size: 28px;"></i>
                </a>
              </div>
              <div class="school">
                <span>國立台北教育大學 | 數位科技設計學系(2019-2023)</span>
              </div>
              <div class="portfolio">
                <button class="btn btn-secondary">作品集</button>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
            <div style="padding: 10px">
              <div class="intro">
                <h2>簡介</h2>
                <p>
                  從國中時期就對程式設計非常感興趣，大學之後憑藉著熱情學習程式開發，經常一寫就是一整天。
                  <br><br>
                  最開始因為想要做出自己的遊戲，因此學習Unity+C#，做出了幾項小作品，其中手機平台的音樂遊戲「Pentagon」更榮獲<a href="https://prj.gamer.com.tw/acgaward/2022/demo.php?t=3&sn=46">2022巴哈姆特ACG創作大賽遊戲組</a>入圍的肯定。
                  <br><br>
                  後來因為希望遊戲能有註冊登入等功能，所以也接觸了後端開發，學習的是Java Spring
                  Boot框架以及MySQL資料庫，同時也學習了前端的Vue+Axios等技術，並以此開發了一個簡單的個人部落格網站，用來記錄自己的學習歷程。
                </p>
              </div>
              <div class="skill">
                <h2>技能</h2>
                <ui>
                  <li>
                    <b>前端</b>：熟悉HTML CSS JS語法，以及 jQuery, Bootstrap, Vue, Axios等框架的基本使用
                  </li>
                  <li>
                    <b>後端</b>：熟悉Java語法, 及Spring Boot, Mybatis等常用框架
                  </li>
                  <li>
                    <b>資料庫</b>：熟悉MySQL常用增刪改查語句
                  </li>
                  <li>
                    <b>Unity</b>：熟悉Unity引擎操作、C#語法、常見的Design Pattern(單例、狀態、觀察者…)
                  </li>
                  <li>
                    <b>OpenGL</b>：了解C++基礎語法，並能夠使用OpenGL寫出簡單的3D遊戲
                  </li>
                  <li>
                    <b>版本控制</b>：熟悉Git指令，以及GitHub基本使用
                  </li>
                  <li>
                    <b>作業系統</b>：了解CentOS基礎指令，能夠部屬個人部落格網頁
                  </li>
                </ui>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyNavBar from "../components/Common/MyNavBar.vue";
import MyFooter from "../components/Common/MyFooter.vue";
import {onMounted, ref} from "vue";
import api from "../api/index.js";

export default {
  name: "HomeView",
  components: {MyNavBar, MyFooter},
  setup() {
    const websiteThumbnail = ref("");

    onMounted(() => {
      api.getBasic().then(response => {
        websiteThumbnail.value = response.data.websiteThumbnail;
      })
    })

    return {
      websiteThumbnail
    }
  }
}

</script>

<style scoped>
p {
  line-height: 30px;
}

a{
  text-decoration: none;
  color: cornflowerblue;
}

.thumbnail {
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 130px;
  margin-bottom: 20px;
}

.thumbnail img {
  width: 35%;
  border-radius: 50%;
}

.name {
  font-weight: 550;
  font-size: 36px;
  text-align: center;
  margin-bottom: 10px;
}

.github {
  display: flex;
  align-content: center;
  justify-content: center;
  margin-bottom: 10px;
}

.github a {
  text-decoration: none;
  color: black;
}

.school {
  display: flex;
  align-content: center;
  justify-content: center;
  margin-bottom: 35px;
}

.school span {
  text-align: center;
}

.portfolio {
  display: flex;
  align-content: center;
  justify-content: center;
}

.portfolio button {
  border-radius: 50px;
}

/**/

.intro {
  margin-top: 50px;
  margin-bottom: 20px;
}

.intro h2 {
  font-weight: bold;

}

.skill {
  margin-bottom: 50px;
}

.skill h2 {
  font-weight: bold;
}

.skill h3 {
  font-weight: 500;
  font-size: 24px;
}

.skill li{
  margin-bottom: 10px;
}
</style>