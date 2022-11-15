<template>
  <header>
   

        <router-link to="/"><h1>Living together</h1></router-link> 
        <i class="fa-solid fa-bars fa-2x" @click="toggleMenu"></i>
      
      <transition-group name="nav">
        <nav v-if="menuOpen">
          <base-button v-if="isLoggedIn" @click="getMember">My community</base-button> 
          <base-button v-if="isLoggedIn" @click="getProfile"  link>Profile</base-button> 
  
  
          <base-button v-if="isLoggedIn" @click="logout" >Logout</base-button>

        </nav>
      </transition-group>


        <router-link  v-if="!isLoggedIn" to="/auth"><h1>Login</h1></router-link> 
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
    const menuOpen = ref(false)

    const isLoggedIn = computed(() => {
      return store.getters.isAuthenticated
    })

    function toggleMenu () {
      menuOpen.value = !menuOpen.value
    }


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

    return{ isLoggedIn, logout, getMember, buildingId, getProfile, userId, toggleMenu, menuOpen}
  }

}
</script>

<style scoped>
header {
  padding-block: 1%;
  padding-inline: 5%;
  margin: 0;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .25);
  background-color: var(--primarly);
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  
}
nav {
  display: flex;
  flex-direction: column;
  height: 100%;
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

.nav-enter-from {
  transform: translateX(50vw);
}
.nav-enter-active {
  transition: all 250ms ease-in;

}
.nav-enter-to {
  transform: translateX(0vw);
}

.nav-leave-active {
  transition: all 250ms ease-out;

}
.nav-leave-from {
  transform: translateX(0vw);
}

.nav-leave-to {
  transform: translateX(50vw);
}



</style>