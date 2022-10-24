<template>
  <header>
    <nav>
      <li>
        <router-link to="/"><h1>Living together</h1></router-link> 
      </li>

      <li v-if="isLoggedIn">
        <base-button @click="logout" type="filled">Logout</base-button> 
      </li>
      <li v-else>
        <router-link to="/auth"><h1>Login</h1></router-link> 
      </li>
  
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

    return{ isLoggedIn, logout}
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

li {
  list-style: none;
}

li a {

  text-decoration: none;
  color: black;
  padding: .5vw 1vw;
  border-radius: 100vw;
  border:  transparent;


} 
li a:active,
li a:hover,
 li a.router-link-active {
  border: #b5b5b5;
  background-color: white;

} 

nav > div  {
  display: flex;
  gap: 5vw
}


</style>