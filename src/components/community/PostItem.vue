<template>

    <li>
        <p>{{post.post}}</p> 
        <p>{{post.date[0]}} - {{post.date[1]}}</p>
        <p>{{post.firstName}}</p>

        <div class="like-container">
          <div>
            <base-button @click="interaction(post, 'likes')"> {{post.likes.length}} <i class="fa-regular fa-thumbs-up"></i></base-button>
          </div>
          <div>
            <base-button @click="interaction(post, 'dislikes')"> {{post.dislikes.length}} <i class="fa-regular fa-thumbs-down"></i> </base-button>
          </div>
          <div class="comment-container">
            <base-button @click="toggleComments">{{commentCaption}}</base-button>
            <Comments v-if="commentsVisible" />
          </div>
        </div>
    </li>
</template>

<script>
import { ref } from '@vue/reactivity'
import Comments from './comments/Comments.vue'
import { computed } from '@vue/runtime-core';


export default {
    components: {Comments},
    emits: ['interaction'],
    props: ['key', 'post'],
    setup(props, context) {
        const commentsVisible = ref(false)

        function interaction(post, mode) {
            
            const payload = {
              ...post,
              mode: mode
            }
            context.emit('interaction', payload)
        }

        const commentCaption = computed(() => {
          const commentNum = props.post.comments.length
          if(commentNum) {
            return commentNum === 1 ? `${commentNum} comment` : `${commentNum} comments`

          } else {
            return 'Add comment'
          }
        })

        function toggleComments() {
          commentsVisible.value = !commentsVisible.value
        }

    
       

        return {interaction, toggleComments, commentsVisible, commentCaption}
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

.comment-container {
  display: flex;
  flex-direction: column;
}

</style>