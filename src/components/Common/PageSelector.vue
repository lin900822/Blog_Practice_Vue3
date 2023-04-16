<template>
  <div style="height: 100px; display: flex; justify-content: center; align-items: center;">
    <div>

      <button class="page-button" @click.prevent="changePage(pageInfo.prePage)">
        <i class="bi bi-chevron-left" style="font-size: 20px; text-align: center;"></i>
      </button>

      <button class="page-button" @click.prevent="changePage(n)" v-for="n in pageInfo.navigatepageNums"
              :class="{ 'button-selected': n == pageInfo.pageNum }">
        <span style="font-size: 20px; text-align: center;" v-text="n"></span>
      </button>

      <button class="page-button" @click.prevent="changePage(pageInfo.nextPage)">
        <i class="bi bi-chevron-right" style="font-size: 20px; text-align: center;"></i>
      </button>

    </div>
  </div>
</template>

<script>
import {onMounted} from "vue";

export default {
  name: 'PageSelector',
  props: {
    changePage:{
      type: Function,
      required: true
    },
    pageInfo: {},
  },
  setup(props, ctx) {
    onMounted(() => {

    });

    return {
    }
  }
}
</script>

<style scoped>
.page-button {
  background-color: #fff;
  width: 35px;
  height: 35px;
  margin: 0 2px 0 2px;
}

.button-selected{
  background-color: #bbb;
}

</style>