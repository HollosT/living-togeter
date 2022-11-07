export default {
    getPosts(state) {
        return state.allPosts
    },

    isLiked(state, _, _2, rootGetters) {
        const userId = rootGetters.userId
        const posts = state.allPosts
        return posts.filter(post => post.likes.includes(userId))

    }
   
}