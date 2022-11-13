<template>
  <header>
    <nav>

        <router-link to="/"><h1>Living together</h1></router-link> 


        <base-button v-if="isLoggedIn" @click="getMember"  type="filled">My community</base-button> 
        <base-button v-if="isLoggedIn" @click="getProfile"  link type="filled">Profile</base-button> 


        <base-button v-if="isLoggedIn" @click="logout" type="filled">Logout</base-button>

        <router-link  v-else to="/auth"><h1>Login</h1></router-link> 
  
    </nav>

  </header>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import BaseButton from '../UI/BaseButton.vue'

export default {
  components: { BaseButton },

  setup() {
    const store = useStore()
    const buildingId = ref('')
    const router = useRouter()
    const userId = ref('')

    const isLoggedIn = computed(() => {
      return store.getters.isAuthenticated
    })


    function logout() {
      store.dispatch('logout')
      router.replace('/')

    }

     function getProfile() {
     userId.value = localStorage.getItem('userId')

     router.push('/profiles/' + userId.value)
    }

    async function getMember() {
      const userId = localStorage.getItem('userId')

      if(!localStorage.getItem('buildingMember')) {
        await store.dispatch('residents/fetchApplication', userId)
      } 
      
      buildingId.value = localStorage.getItem('buildingMember')
      router.push('/community/' + buildingId.value)
    }

    return{ isLoggedIn, logout, getMember, buildingId, getProfile, userId}
  }

}
</script>

<style scoped>
header {
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .25);
  background-color: #f3f3f3;
  width: 100%;
  
}
nav {
  padding: 2vw 0;
  display: flex;
  width: 90%;
  justify-content: space-between;
  margin: auto;
}


 a {

  text-decoration: none;
  color: black;
  padding: .5vw 1vw;
  border-radius: 100vw;
  border:  transparent;


} 
 a:active,
 a:hover,
 a.router-link-active {
  border: #b5b5b5;
  background-color: white;
} 

nav > div  {
  display: flex;
  gap: 5vw
}


</style>