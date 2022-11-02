<template>
  <ul>
    <li v-for="post in posts" :key="post.postId">
        <p>{{post.post}}</p> 
        <p>{{post.date[0]}} - {{post.date[1]}}</p>
        <p>{{post.firstName}}</p>

        <div class="like-container">
          <div>
            <p>0</p>
            <base-button @click="addLike(post)">Like</base-button>
          </div>
          <div>
            <p>0</p>
            <base-button>Dislike</base-button>
          </div>
          <div>
            <p>0</p>
            <base-button>Add comment</base-button>
          </div>
        </div>
    </li>
  </ul>
</template>

<script>
export default {
    emits: ['addLike'],
    props: ['posts'],
    setup(_, context) {

        function addLike(post) {
            
            context.emit('addLike', {
              ...post,
              
            })
        }

        return{addLike}
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

</style>