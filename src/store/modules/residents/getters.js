
export default {

    hasApplication(state, _, _2, rootGetters) {
        const userId = rootGetters.userId
        const curApplication = state.applications.filter(app => app.userId === userId)
        return !!curApplication.length > 0
    },

    getApplications(state) {
        return state.applications
    }
}