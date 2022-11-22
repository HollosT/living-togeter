import { ref, computed, watch } from "vue"
import { useStore } from 'vuex'


// Filtering by checkboxes
export default function useSearch() {
       const store = useStore()
       const filterCountry = ref('');
       const searchNameInput = ref('');

    const filteredBuildings = computed(() => {
    
        const buildings = store.getters["buildings/buildings"]
        let wannabeBuildings = [];
        
        const buildingsByCheckBox =  buildings.filter(building => {
            for(const key in filterCountry.value) {
              if(filterCountry.value[key] && building.address.country === key) {
                return true
              }
            }
            return false;
        })
        
        if(searchNameInput.value) {
            buildingsByCheckBox.filter(building => {
             if(building.name.toLowerCase().includes(searchNameInput.value)) {
               wannabeBuildings.push(building)
             } 
             return false
           })
        } else {
            wannabeBuildings = buildingsByCheckBox
        }
        return wannabeBuildings
      })

      watch(searchNameInput, function (newValue) {
        setTimeout(() => {
            if(newValue === searchNameInput.value) {
                searchNameInput.value = newValue.toLowerCase();
            }
        }, 300)
      })
    
      function setFilter(updatedFilters) {
        filterCountry.value = updatedFilters
      }
    
      function searchByCommunityName(searchInput) {
        searchNameInput.value = searchInput
      }

      return {
        setFilter,
        searchByCommunityName,
        filteredBuildings,
        filterCountry,
        searchNameInput
      }
}

