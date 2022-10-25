<template>
  <theHeader/>
  <router-view/>
</template>

<script>
import { computed } from '@vue/runtime-core'
import TheHeader from './components/layouts/TheHeader.vue'
import { useStore } from 'vuex'


export default {
  components: { TheHeader },
  setup() {
    const store = useStore()
    login()
    function login()  {
        store.dispatch('tryLogin')
    }
    
  }
}
</script>

<style>

</style>
