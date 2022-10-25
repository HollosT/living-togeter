<template>
    <base-card>
        <h2>{{building.name}}</h2>
        <p>{{building.description}}</p>

        <p>{{hasApplication}}</p>
        <base-button v-if="isLoggedIn" link :to="'/residents/' + building.id" type="filled" @click="apply">Join this community</base-button>
        <div v-else-if="!isLoggedIn">
            <p>You need to log in to apply for this community</p>
            <router-link link to="/auth" type="filled">Login</router-link>
        </div>

    </base-card>
</template>

<script>

import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
import BaseButton from '@/components/UI/BaseButton.vue'
export default {
  components: { BaseButton },

    setup() {
       const route = useRoute()
       const store = useStore()

       const isLoggedIn = computed(() => {
        return store.getters.isAuthenticated
       })

       
       const building = computed(() => {
          return store.getters['buildings/buildings'].find(bld => bld.id === route.params.bid)
            
       })

       loadApplications()
      async function loadApplications() {
        try{
           await store.dispatch('residents/fetchApplications', route.params.bid)
        } catch(err) {
            console.log(err);
        }
       }

       const hasApplication = computed(() => {
            return store.getters['residents/hasApplication']
            
       })

       

       const apply = function() {
            

            
            const request = {
                email: localStorage.getItem('email'),
                userId: localStorage.getItem('userId'),
                buildingId: route.params.bid
            }

            store.dispatch('residents/apply', request)

       }

       return{building, isLoggedIn, apply, hasApplication}
       
    }
}
</script>

<style>

</style>