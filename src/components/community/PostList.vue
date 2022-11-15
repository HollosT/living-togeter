<template>
    <div class="addpost-container">
        <h4>Share your thoughts...</h4>
            <div>
                    <textarea :class="{invalidTextarea: !isValid}"  cols="80" :rows="rowLength" autofocus placeholder="..." v-model.trim="post" @focus="addjustRowLength" @blur="reduceRowLength"></textarea>
                    <div class="addpost-btn-container">
                        <base-button @click.prevent="cancel" type="secondary">Cancel</base-button>
                        <base-button  @click="uploadPost" :type="buttonType">Post</base-button>
                    </div>
            </div>
        </div>
  <p v-if="!posts.length > 0">There are no posts for this community yet...</p>
  <ul v-else>
        <h3>Posts</h3>
      <post-item v-for="post in posts" :key="post.postId" :post="post"  @interaction="addInteraction"></post-item>
  </ul>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import PostItem from './PostItem.vue'
import { watch } from '@vue/runtime-core';



export default {
  components: { PostItem },

    setup() {
        const store = useStore()
        const post = ref('')
        const posts = ref([])
        const isValid = ref(false)
        const buttonType = ref('inactive')
        const rowLength = ref(1)

        function addPost() {
            isPosting.value = true
        }
        function cancelPost() {
            isPosting.value = false
        }

        function cancel() {
            post.value = ''
        }

        function addjustRowLength() {
            rowLength.value = 5
        }
        function reduceRowLength() {
            rowLength.value = 1
        }


        watch(post, (oldPost, newPost) => {
            if(oldPost.length === 0 || newPost.length === 0) {
                isValid.value = false
                buttonType.value = 'inactive'
            } else {
                isValid.value = true
                buttonType.value = 'green'
            }
        })
     
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


                const curDate = new Date().getTime()

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
                rowLength.value = 1
                


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

        return {addPost, cancelPost, post, uploadPost, posts, addInteraction, buttonType, isValid, cancel, rowLength, addjustRowLength, reduceRowLength}
    }
}
</script>

<style scoped>
textarea {
    border-radius: 5px;
    border: none;
    width: 100%;
    border-left: 5px solid var(--blockgreen);
    box-shadow: 2px 2px 2px rgba(0,0,0, .225);   
}

.invalidTextarea {
    border-left: 5px solid var(--mildgrey);
}

.addpost-container {
    width: 100%;
}

.addpost-btn-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 2vw;
}   

h5 {
    margin-bottom: 2vw;
}





</style>