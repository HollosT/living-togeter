<template>
  <base-card>
  <h2>Building list</h2>
  <base-button link to="/buildings/registration" type="filled">Register a new community</base-button>
    <div>
      <building-item v-for="building in buildings" :key="building.id" :building="building"></building-item>
    </div>

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
    
    const buildings = computed(() => {
      return store.getters["buildings/buildings"]
    })
    

    return{buildings}

  }


}
</script>

<style>

</style>