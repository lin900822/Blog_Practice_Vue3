<template>
  <div>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import {nextTick, provide, ref} from 'vue';

export default {
  name: 'App',
  mounted() {
    this.$router.afterEach((to) => {
      if (to.name === "articles" || to.name === "AdminArticleListView" || to.name === "ArticleEditorCreate" || to.name === "ArticleEditorUpdate") {
        const event = new CustomEvent('onRouted');
        window.dispatchEvent(event);
      }
    });

    const isRouterAlive = ref(true);

    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      });
    };

    provide('reload', reload);
    this.isRouterAlive = isRouterAlive;
  },
  data() {
    return {
      isRouterAlive: null
    };
  }
};
</script>

<style>
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  background-color: #DDDDDD;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
}

</style>
