<template>
    <router-view></router-view>
</template>

<script>

import router from './router/index.js';
import store from './store/index.js'

export default {
  name: 'App',
  
  data(){
      return {
          text:123,
      }
  },

  router,

  store,
  
}
</script>

<style>

</style>
