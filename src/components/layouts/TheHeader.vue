<template>
  <header>
   
      <div v-if="menuOpen" class="backdrop"></div>
        <router-link to="/" @click="initNavClasses"><h1>Living together</h1></router-link> 
        <i v-if="isLoggedIn" :class="[['fa-solid'], menuOpen ? ['fa-x'] : ['fa-bars'], ['fa-2x']]" @click="toggleMenu"></i>
      
      <transition-group name="nav">
        <nav v-if="menuOpen && isLoggedIn">
          <ul>
            <li :class="{active: memberActive}" >
              <base-button type="nav"  @click="getMember">My community</base-button> 
            </li>
            <li :class="{active: profileActive}">
              <base-button type="nav"  @click="getProfile">Profile</base-button> 
            </li>

            <li :class="{active: registerActive}">
              <base-button type="nav"  @click="registerCommunity">Register a new community</base-button> 
              
            </li>
          </ul>
  
          <li data-logout="true">
            <base-button type="nav" @click="logout">Logout</base-button>
          </li>

        </nav>
      </transition-group>


    <router-link  v-if="!isLoggedIn" type="nav" to="/auth"><h1>Login</h1></router-link> 
  </header>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import BaseButton from '../UI/BaseButton.vue'

export default {
  components: { BaseButton },

  setup(props) {
    const store = useStore()

    const buildingId = ref('')
    const router = useRouter()
    const userId = ref('')
    const menuOpen = ref(false)
    const memberActive = ref(false)
    const profileActive = ref(false)
    const registerActive = ref(false)

    const isLoggedIn = computed(() => {
      return store.getters.isAuthenticated
    })


    function initNavClasses () {
      memberActive.value = false
      profileActive.value = false
      registerActive.value = false
    } 

    function toggleMenu () {
      menuOpen.value = !menuOpen.value

    }

    function logout() {
      store.dispatch('logout')
      router.replace('/')

     menuOpen.value = false
      initNavClasses()
    }
    function registerCommunity() {
      initNavClasses()
      router.push('/buildings/registration')

      menuOpen.value = false
      registerActive.value = true

    }

     function getProfile() {
      initNavClasses()
     userId.value = localStorage.getItem('userId')

     router.push('/profiles/' + userId.value)

     menuOpen.value = false

     profileActive.value = true

    }

    async function getMember() {
      initNavClasses()
      const userId = localStorage.getItem('userId')

      if(!localStorage.getItem('buildingMember')) {
        await store.dispatch('residents/fetchApplication', userId)
      } 
      
      buildingId.value = localStorage.getItem('buildingMember')
      router.push('/community/' + buildingId.value)

      menuOpen.value = false
      memberActive.value = true
    }



    return{ isLoggedIn, logout, getMember, buildingId, getProfile, userId, toggleMenu, menuOpen, registerCommunity, registerActive, profileActive, memberActive, initNavClasses}
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

i {
  z-index: 101;
}

nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  position: fixed;
  right: 0%;
  top: 0%;
  background: var(--primarly);
  padding-block: 10%;
  z-index: 100;
  text-align: left;
  width: 30vw;
}

nav li {
  display: inline;
  position: relative;
  width: 100%;
  padding-block: 5%;
}
nav li:hover > * {
  color: white;
}


nav li::before {
  content: "";
  inset: 0;
  width: 0%;
  position: absolute;
  height: 100%;
  z-index: -1;
  background: var(--blockgreen);
  cursor: pointer;

}

nav li:hover:before {
  animation: navAnimation 350ms ease-in-out forwards;
}

nav li[data-logout="true"] {
  border-top: 2px solid black;
}

nav li[data-logout="true"]::before  {
    background: var(--mildgrey);
}

@keyframes navAnimation {
  from{
      width: 0%;
  } to {
      width: 100%;
  }
}

nav > ul {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
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
  transition: all 300ms ease-in;

}
.nav-enter-to {
  transform: translateX(0vw);
}

.nav-leave-active {
  transition: all 200ms ease-out;

}
.nav-leave-from {
  transform: translateX(0vw);
}

.nav-leave-to {
  transform: translateX(100vw);
}



.active {
  pointer-events: none;
}
.active::before {
  content: "";
  inset: 0;
  width: 0%;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
  background: var(--blockgreen);

}

.active > * {
  color: white;
}


</style>