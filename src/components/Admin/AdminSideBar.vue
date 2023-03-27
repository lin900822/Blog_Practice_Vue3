<template>
  <nav>
    <ul class="list-unstyled components">
      <li class="active">
        <div class="sidebar-header">
          <h3>
            <i class="bi bi-speedometer"></i>
            控制台
          </h3>
        </div>

        <a data-bs-toggle="collapse" href="#settingsSubmenu" role="button" aria-expanded="false"
           aria-controls="settingsSubmenu">
          <i class="bi bi-gear-fill"></i>
          基礎
        </a>
        <ul class="collapse list-unstyled" id="settingsSubmenu">
          <li>
            <a href="#">設定</a>
          </li>
        </ul>

        <a data-bs-toggle="collapse" href="#homeSubmenu" role="button" aria-expanded="false"
           aria-controls="homeSubmenu">
          <i class="bi bi-file-earmark-font-fill"></i>
          文章
        </a>
        <ul class="collapse list-unstyled" id="homeSubmenu">
          <li>
            <a href="/admin/ArticleEditor">新增文章</a>
          </li>
          <li>
            <a href="#">文章列表</a>
          </li>
        </ul>

        <a data-bs-toggle="collapse" href="#categorySubmenu" role="button" aria-expanded="false"
           aria-controls="categorySubmenu">
          <i class="bi bi-tags-fill"></i>
          分類
        </a>
        <ul class="collapse list-unstyled" id="categorySubmenu">
          <li>
            <a href="#">分類列表</a>
          </li>
        </ul>

        <a data-bs-toggle="collapse" href="#navBarSubmenu" role="button" aria-expanded="false"
           aria-controls="navBarSubmenu">
          <i class="bi bi-bookmark-check-fill"></i>
          導覽列
        </a>
        <ul class="collapse list-unstyled" id="navBarSubmenu">
          <li>
            <a href="#">設定</a>
          </li>
        </ul>

        <a data-bs-toggle="collapse" href="#sideBarSubmenu" role="button" aria-expanded="false"
           aria-controls="sideBarSubmenu">
          <i class="bi bi-wrench"></i>
          側邊欄
        </a>
        <ul class="collapse list-unstyled" id="sideBarSubmenu">
          <li>
            <a href="#">新增欄位</a>
          </li>
          <li>
            <a href="#">欄位列表</a>
          </li>
        </ul>

        <a data-bs-toggle="collapse" href="#resourcesSubmenu" role="button" aria-expanded="false"
           aria-controls="resourcesSubmenu">
          <i class="bi bi-image-fill"></i>
          資源
        </a>
        <ul class="collapse list-unstyled" id="resourcesSubmenu">
          <li>
            <a href="#">資源列表</a>
          </li>
        </ul>

      </li>
    </ul>

  </nav>
</template>

<script>
import {ref, reactive, toRef} from "vue"

export default {
  name: 'AdminSideBar',
  props: {

  },
  setup(props,ctx) {

    return {

    }
  }
};
</script>

<style scoped>
p {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  background: #363636;
  color: #fff;
  transition: all 0.3s;
}

#sidebar.active {
  margin-left: -250px;
}

#sidebar .sidebar-header {
  padding: 15px;
  background: #333;
}

#sidebar .sidebar-header h3 {
  margin: auto;
  font-size: 24px;
}

#sidebar ul.components {
  border-bottom: 1px solid #333;
}

#sidebar ul p {
  color: #fff;
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}

#sidebar ul li a:hover {
  color: #0088A8;
  background: #fff;
}

#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: #fff;
  background: #333;
}

a[data-toggle="collapse"] {
  position: relative;
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #3d3d3d;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}


/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */

@media (max-width: 768px) {
  #sidebar {
    margin-left: -250px;
  }

  #sidebar.active {
    margin-left: 0;
  }

  #sidebarCollapse span {
    display: none;
  }
}
</style>