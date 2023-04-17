<template>
  <div id="myfooter">
    Copyright © 2023 {{websiteName}}. All rights reserved.
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import api from "../../api/index.js";

export default {
  name: 'MyFooter',
  setup(){
    const websiteName = ref();

    onMounted(() => {
      api.getBasic().then(response => {
        websiteName.value = response.data.websiteName;
      })
    })

    return{
      websiteName
    }
  }
}
</script>

<style>
#myfooter{
  height: 50px;
  background-color: #333;
  text-align: center;
  line-height: 50px;
  color: #f2f2f2;
  font-size: 12px;
}
</style>