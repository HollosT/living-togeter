<template>
  <header>
    <nav>

        <router-link to="/"><h1>Living together</h1></router-link> 


        <base-button v-if="isLoggedIn" @click="logout" type="filled">Logout</base-button> 
        <base-button v-if="isLoggedIn" @click="getMember" link to="/community" type="filled">My community</base-button> 

        <router-link  v-else to="/auth"><h1>Login</h1></router-link> 
  
    </nav>

  </header>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {

  setup() {
    const store = useStore()

    const isLoggedIn = computed(() => {
      return store.getters.isAuthenticated
    })


    function logout() {
      store.dispatch('logout')
    }

    async function getMember() {
      const userId = localStorage.getItem('userId')
      store.dispatch('residents/fetchApplication', userId)
    }

    return{ isLoggedIn, logout, getMember}
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