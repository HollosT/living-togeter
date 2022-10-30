export default {
    addApplication(state, payload) {
        state.applications.push(payload)
        state.buildingMember = payload.buildingId
    },

    setApplications(state, payload) {
       
        state.applications = payload
    },

    setMember(state, payload) {
        state.buildingMember = payload
    }
    
}