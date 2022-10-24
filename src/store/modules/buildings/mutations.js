export default {
    registerBuilding(state, payload) {
        state.buildings.push(payload)
    },


    setBuildings(state, payload) {
        state.buildings = payload
    }
}