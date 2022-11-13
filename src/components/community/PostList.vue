<template>
    <div class="addpost-container">
        <transition-group name="addpost">
            <base-button v-if="!isPosting" @click="addPost" type="filled">Share your thoughts...</base-button>
            <div v-if="isPosting">
                    <textarea  cols="80" rows="5" autofocus placeholder="..." v-model.trim="post"></textarea>
                    <div class="addpost-btn-container">
                        <base-button @click="cancelPost" type="filled">Cancel</base-button>
                        <base-button  @click="uploadPost" type="filled">Add</base-button>
                    </div>
            </div>
        </transition-group>
        </div>
  <p v-if="!posts.length > 0">There are no posts for this community yet...</p>
  <ul v-else>
      <post-item v-for="post in posts" :key="post.postId" :post="post"  @interaction="addInteraction"></post-item>
  </ul>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import PostItem from './PostItem.vue'


export default {
  components: { PostItem },

    setup() {
        const store = useStore()
        const isPosting = ref(false)
        const post = ref('')
        const posts = ref([])
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
               
                posts.value = postsArr


            }catch (err) {
                console.log(err);
            }
        }

        init()

        return {addPost, isPosting, cancelPost, post, uploadPost, posts, addInteraction}
    }
}
</script>

<style scoped>


.addpost-container {
    width: max-content;
}

.addpost-btn-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 2vw;
}   


/* Transition */
.addpost-enter-active {
    animation: addModal 350ms ease-in;
}
.addpost-leave-active {
    animation: addModal 350ms ease-in reverse;
}

@keyframes addModal {
    from {
        opacity: 0;
        transform: translateY(-50px) scale(0.9);
    } to {
        opacity: 1;
    transform: translateY(0) scale(1);
    }
}

</style>