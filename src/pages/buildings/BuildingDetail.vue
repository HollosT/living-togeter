<template>
    <base-card>
        <h2>{{building.name}}</h2>
        <p>{{building.description}}</p>


        <base-button v-if="isLoggedIn && !isApplied" link :to="'/community/' + building.id" type="filled" @click="apply">Join this community</base-button>
        <div v-else-if="!isLoggedIn">
            <p>You need to log in to apply for this community</p>
            <router-link link to="/auth" type="filled">Login</router-link>
        </div>

    </base-card>
</template>
<script>

import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from '@vue/runtime-core'
import BaseButton from '@/components/UI/BaseButton.vue'
export default {
  components: { BaseButton },
    props: ['building'],
    setup(props) {
       const route = useRoute()
       const router = useRouter()
       const store = useStore()
       const isApplied = ref(false)

       const isLoggedIn = computed(() => {
        return store.getters.isAuthenticated
       })

       
       const building = computed(() => {
          return store.getters['buildings/buildings'].find(bld => bld.id === route.params.bid)
            
       })


       async function loadApplications() {
           try{
               
               await store.dispatch('residents/fetchApplications', route.params.bid)
               const application = store.getters['residents/hasApplication']
               isApplied.value = application
               
            } catch(err) {
                console.log(err);
            }
        }
        loadApplications()


       

       function  apply() {    
            const request = {
                email: localStorage.getItem('email'),
                userId: localStorage.getItem('userId'),
                buildingId: route.params.bid
            }

            store.dispatch('residents/apply', request)
       }

       return{building, isLoggedIn, apply, isApplied}
       
    }
}
</script>

<style>

</style>