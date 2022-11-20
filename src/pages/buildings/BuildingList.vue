<template>
  <base-card>
  <div class="intro">
    <h2>Community list</h2>
    <p>Find your neighbourhood and join the community</p>
  </div>

  <section>
    <building-filter :countries="countryArr" :filters="filterCountry" @set-filter="setFilter"></building-filter>
  </section>

  <h2 v-if="!hasBuildings">There is no registered buildings yet!</h2>
  <div v-else-if="hasBuildings && isLoading">Loading...</div>
  <building-item v-else-if="hasBuildings && !isLoading" v-for="building in filteredBuildings" :key="building.id" :building="building"></building-item>
  </base-card>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import BuildingItem from '@/components/buildings/BuildingItem.vue'
import BuildingFilter from '@/components/buildings/BuildingFilter.vue'


export default {
  components: { BuildingItem, BuildingFilter },

 
  setup() {
    const store = useStore()
    const isLoading = ref(true);
    const countryArr = ref([])
    const filterCountry = ref({})


    const hasBuildings = computed(() => {
      return store.getters["buildings/hasBuildings"]
    })

    const filteredBuildings = computed(() => {
      console.log(filterCountry.value);
      
      const buildings = store.getters["buildings/buildings"]
      return buildings.filter(building => {
          for(const key in filterCountry.value) {
            if(filterCountry.value[key] && building.address.country === key) {
              return true
            }
          }
          return false;
        })
    })

    function setFilter(updatedFilters) {
     
      
      filterCountry.value = updatedFilters
    }

    loadBuildings()
    async function loadBuildings() {
      isLoading.value = true
      try{
        await store.dispatch('buildings/loadBuildings')


        const arr = store.getters["buildings/getCountries"]

        const obj = {}
        arr.forEach(a => {
           obj[a] = true
        })

        filterCountry.value = obj

        
        countryArr.value = arr;

      } catch(err) {
        console.log(err);
      }
      isLoading.value = false

    }
    

    return{ hasBuildings, isLoading, countryArr, filterCountry, setFilter, filteredBuildings}

  }


}
</script>

<style>
.intro {
  text-align: center;
  margin-bottom: 3vw;
}

</style>