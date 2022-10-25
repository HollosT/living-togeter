export default {
    addApplication(state, payload) {
        console.log(payload);
        state.applications.push(payload)
    },

    setApplications(state, payload) {
        state.applications = payload
    }
    
}