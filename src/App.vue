<template>
  
  <theHeader/>
  <router-view/>
</template>

<script>

import TheHeader from './components/layouts/TheHeader.vue'
import { useStore } from 'vuex'



export default {
  components: { TheHeader },
  setup() {
    const store = useStore()
    login()
   async function login()  {
      try{
        await store.dispatch('tryLogin')
      } catch(err) {
        console.log(err);
      }
    }

 
  }
}
</script>

<style scoped>



</style>
