<template>
  <base-card>
  <div class="intro">
    <h2>Community list</h2>
    <p>Find your neighbourhood and join the community</p>
  </div>

  <base-button @click="toggleFilter" type="filled" class="filter-icon"><i :class="filterClass"></i></base-button>

  <div v-if="isFilter" class="filter-control">
    <building-filter :countries="countryArr" :filters="filterCountry" @set-filter="setFilter" @search="searchByCommunityName"></building-filter>
  </div>

  <h2 v-if="!hasBuildings">There is no registered buildings yet!</h2>
  <div v-else-if="hasBuildings && isLoading">Loading...</div>
  <ul v-else-if="hasBuildings && !isLoading">
    <building-item  v-for="building in filteredBuildings" :key="building.id" :building="building"></building-item>
  </ul>
  </base-card>
</template>

<script>
import { ref, computed} from '@vue/runtime-core'
import { useStore } from 'vuex'
import BuildingItem from '@/components/buildings/BuildingItem.vue'
import BuildingFilter from '@/components/buildings/BuildingFilter.vue'
import useSearch  from '../../hooks/buildings/search.js'

export default {
  components: { BuildingItem, BuildingFilter },

  setup() {
    const store = useStore()
    const isLoading = ref(true);
    const countryArr = ref([])
    const isFilter = ref(false)
    // const filterClass = ref([])

    const {setFilter, searchByCommunityName, filteredBuildings, filterCountry} = useSearch()

    const hasBuildings = computed(() => {
      return store.getters["buildings/hasBuildings"]
    })

    function toggleFilter() {
      isFilter.value = !isFilter.value
    }

    const filterClass = computed(() => {
      if(!isFilter.value) {
        return ['fa-solid fa-filter fa-2x']
      } else {
        return ['fa-solid fa-filter fa-2x active']
      }

    })

    


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
    
    return{ hasBuildings, isLoading, countryArr, filterCountry, setFilter, filteredBuildings, searchByCommunityName, isFilter, toggleFilter, filterClass}

  }


}
</script>

<style>
.intro {
  text-align: center;
  margin-bottom: 3vw;
}

.filter-control {
  display: flex;
  flex-direction: column;
}

.fa-filter {
  color: white;
}

.active {
  color: var(--yellow);
}

</style>