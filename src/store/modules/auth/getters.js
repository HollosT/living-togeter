
export default {
    isAuthenticated(state) {
        return !!state.token
    },


    userId(state) {
        return state.userId
    }
    

}