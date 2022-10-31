<template>
  <base-card>
  <div class="intro">
     <h2>Community list</h2>
     <base-button link to="/buildings/registration" type="filled">Register a new community</base-button>
  </div>

  <h2 v-if="!hasBuildings">There is no registered buildings yet!</h2>
  <div v-else-if="hasBuildings && isLoading">Loading...</div>
  <building-item v-else-if="hasBuildings && !isLoading" v-for="building in buildings" :key="building.id" :building="building"></building-item>
  

  </base-card>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import BuildingItem from '@/components/buildings/BuildingItem.vue'


export default {
  components: { BuildingItem },

 
  setup() {
    const store = useStore()
    const isLoading = ref(true);
    
    const buildings = computed(() => {
      return store.getters["buildings/buildings"]
    })
    const hasBuildings = computed(() => {
      return store.getters["buildings/hasBuildings"]
    })

    loadBuildings()
    async function loadBuildings() {
      isLoading.value = true
      try{
        await store.dispatch('buildings/loadBuildings')

      } catch(err) {
        console.log(err);
      }
      isLoading.value = false

    }
    

    return{buildings, hasBuildings, isLoading}

  }


}
</script>

<style>
.intro {
  display: flex;
  justify-content: space-between;
}


</style>