<template>

  
    <li>
      <div class="post-content-container">
        <div>
          <h6 class="author">{{post.firstName}} {{post.lastName}}</h6>
          <time class="date">{{post.displayDate}} </time>
        </div>
        <p class="post">{{post.post}}</p> 
      </div>

        <div class="interaction-contianer">
          <div class="btn-container">
            <base-button  @click="interaction(post, 'likes')" type="reverse"> {{post.likes.length}} <i class="fa-regular fa-thumbs-up"></i></base-button>
            
            <base-button @click="interaction(post, 'dislikes')" type="reverse"> {{post.dislikes.length}} <i class="fa-regular fa-thumbs-down"></i> </base-button>
            
            <base-button @click="toggleComments" type="reverse">{{commentCaption}}</base-button>
          </div>
          <div>
              <CommentList :comments="post.comments" v-if="commentsVisible" @addComment="getComment" />
            </div>
          </div>
        </li>

</template>

<script>
import { ref } from '@vue/reactivity'
import CommentList from './comments/CommentList.vue'
import { computed } from '@vue/runtime-core';
import store from '@/store';


export default {
    components: {CommentList},
    emits: ['interaction'],
    props: ['post'],
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

          if(commentsVisible.value === false) {
            return `${commentNum > 0 ? 'See comments (' + commentNum + ')' : 'Add comment'}`
          } else {
            return 'See less'
          }
          

          // if(commentNum) {
          //   return commentNum === 1 ? `See comment (${commentNum})` : `See comments (${commentNum})`

          // } 
          // else {
          //   return 'Add comment'
          // }
        })

        function toggleComments() {
          commentsVisible.value = !commentsVisible.value
        }

        async function getComment(comment) {
            try{  
                const userId = localStorage.getItem('userId')
                await store.dispatch('profiles/fetchProfile', userId)
                const profile = await store.getters['profiles/getProfile']
              
                const curDate = new Date().getTime()
                const commentsWannabe = {
                  body: comment,
                  userId: userId,
                  buildingId: props.post.buildingId,
                  commentDate: curDate,
                  firstName: profile.firstName,
                  lastName: profile.lastName
                }

                const commentsArr = props.post.comments
                commentsArr.push(commentsWannabe)


                
                const payload = {
                    ...props.post,
                    comments: commentsArr
                }
                await store.dispatch('posts/addComment', payload)
            }catch(err) {
              console.log(err);
            }
        }
    
       

        return {interaction, toggleComments, commentsVisible, commentCaption, getComment}
    }

}
</script>

<style scoped>


li {
  display: flex;
  flex-direction: column;
  margin-bottom: 4vw;
  box-shadow: 2px 2px 2px rgba(0,0,0, .225);
  border-radius: 5px;
  padding: 2%;
  border-left: 5px solid  var(--yellow);
  width: 60vw;
}

.btn-container {
  display: flex;
  gap: 10px;
}

.comment-container {
 width: 100%;
}

.post-content-container {
  display: flex;
  flex-direction: column;
  gap: 1vw;

}
.post-content-container > div {
  padding: 0 1vw;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
}

.post-content-container > p {
  border-radius: 5px;
  background: var(--primarly);
  padding: 1vw;
  margin-bottom: 1vw;
  box-shadow: 2px 2px 2px rgba(0,0,0, .225);

}

.active {
  background: red;
}

.btn-container{
  margin-bottom: 2vw;

}


</style>