<template>
  <h2>Posts</h2>
  <base-button v-if="!isPosting" @click="addPost" type="filled">Share your thoughts...</base-button>
  <div v-if="isPosting">
      <textarea  cols="50" rows="5" autofocus placeholder="..." v-model.trim="post"></textarea>
        <div>
            <base-button @click="cancelPost" type="filled">Cancel</base-button>
            <base-button  @click="uploadPost" type="filled">Post</base-button>
        </div>
  </div>
  <p v-if="!posts.length > 0">There are no posts for this community yet...</p>
  <post-list v-else :posts="posts" :isLikedPosts="isLikedPosts" @interaction="addInteraction"></post-list>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import PostList from './PostList.vue'


export default {
  components: { PostList },

    setup() {
        const store = useStore()
        const isPosting = ref(false)
        const post = ref('')
        const posts = ref([])
        const isLikedPosts = ref([])
        const isLiked = ref(false)

        function addPost() {
            isPosting.value = true
        }
        function cancelPost() {
            isPosting.value = false
        }

     
        async function addInteraction(payload) {

            const userId = localStorage.getItem('userId')
            try {
                await store.dispatch('posts/interactionWithThePost', {
                    ...payload,
                    curUser: userId
                })


            }catch(err) {
                console.log(err);
            }

            if(payload.mode === 'likes') {
                isLiked.value = !isLiked.value
            }
        }

        async function uploadPost(e) {
            try{
                const userId =  localStorage.getItem('userId')

                await store.dispatch('profiles/fetchProfile', userId)
                const profile = store.getters['profiles/getProfile']


                const curDate = new Date().toLocaleString('eu-dk').split(',')

                const postWannabe = {
                    buildingId: localStorage.getItem('buildingMember'),
                    userId: userId,
                    email: localStorage.getItem('email'),
                    post: post.value,
                    date: curDate,
                    firstName: profile.firstName,
                    lastName: profile.lastName
                }

                await store.dispatch('posts/generatePost', postWannabe)
                post.value = ''
                e.target.value = ''
                isPosting.value = false
                


            }catch(err) {
                console.log(err);
            }
        }

        async function init() {
            try {
  
                await store.dispatch('posts/loadPosts', localStorage.getItem('buildingMember'))

                const postsArr = store.getters['posts/getPosts']
                
                const isLikedArr = store.getters['posts/isLiked']
                isLikedPosts.value = isLikedArr

                posts.value = postsArr


            }catch (err) {
                console.log(err);
            }
        }

        init()

        return {addPost, isPosting, cancelPost, post, uploadPost, posts, addInteraction, isLikedPosts}
    }
}
</script>

<style>

</style>