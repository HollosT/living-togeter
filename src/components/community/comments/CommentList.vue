<template>
  <div class="comment-container">
    <ul>
      <comment-item  v-for="comment in comments" :key="comment.commentDate[1]" :comment="comment"></comment-item>
    </ul>
    <div class="add-comment__container">
      <add-comment @addComment="getComment"></add-comment>
    </div>
  </div>
</template>

<script>
import AddComment from './AddComment.vue'
import CommentItem from './CommentItem.vue'
export default {
  components: { AddComment, CommentItem},
  emits: ['add-comment'],
  props: ['comments'],
  setup(_, context) {

    function getComment(comment) {
      context.emit('add-comment', comment)
    }

    return{getComment}
  }

}
</script>

<style scoped>

.comment-container {
  background: var(--primarly);
  padding: 5%;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(0,0,0, .225);

}

.add-comment__container {
  width: 100%;
}

</style>