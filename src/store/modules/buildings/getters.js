export default {
    buildings(state) {
        return state.buildings
    },

    hasBuildings(state) {
        return state.buildings && state.buildings.length > 0
    },

    getCountries(state) {
        const buildignsCountries = state.buildings.map(building => building.address.country);
        const countries = [...new Set(buildignsCountries)]
        return countries
    }

   

}