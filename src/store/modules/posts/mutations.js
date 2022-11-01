export default {
    addPosts(state, payload) {
        state.allPosts = payload
    },
    addPost(state, payload) {
        state.myPost = payload
    }
}