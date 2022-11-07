<template>
  <ul>
    <li v-for="post in posts" :key="post.postId">
        <p>{{post.post}}</p> 
        <p>{{post.date[0]}} - {{post.date[1]}}</p>
        <p>{{post.firstName}}</p>

        <div class="like-container">
          <div>
            <base-button @click="interaction(post, 'likes')"> {{post.likes.length}} <i class="fa-regular fa-thumbs-up"></i></base-button>
          </div>
          <div>
            <base-button @click="interaction(post, 'dislikes')"> {{post.dislikes.length}} </base-button>
          </div>
          <div>
            <p>0</p>
            <base-button @click="interaction(post, 'comments')">Comments</base-button>
          </div>
        </div>
    </li>
  </ul>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    emits: ['interaction'],
    props: ['posts', 'isLikedPosts'],
    setup(props, context) {


        function interaction(post, mode) {
            
            const payload = {
              ...post,
              mode: mode
            }
            context.emit('interaction', payload)
        }

    
       

        return {interaction}
    }

}
</script>

<style scoped>

.like-container {
  display: flex;
  
}
.like-container > div {
  display: flex;
  margin-right: 5vw;

}

.likedByMe {
  background: red;
}

</style>