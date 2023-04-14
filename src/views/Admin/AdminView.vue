<template>
  <div>
    <div class="wrapper">
      <!-- Sidebar  -->
      <AdminSideBar id="sidebar"></AdminSideBar>
      <!-- Page Content  -->
      <div id="content">
        <button type="button" id="sidebarCollapse" class="btn" style="background-color: #333; color: white; border-radius: 0px">
          <span>
            <i class="bi bi-speedometer"></i>
          </span>
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
import $ from 'jquery'
import AdminSideBar from "../../components/Admin/AdminSideBar.vue";

$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });
});
</script>

<style scoped>
body {
  background: #fafafa;
}

p {
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

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

#content {
  width: 100%;
  min-height: 100vh;
  transition: all 0.3s;
}


</style>