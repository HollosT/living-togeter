<template>
  <base-form @submit.prevent="getComment">
        <textarea name="addComment" id="addComment"  rows="3" placeholder="Add your thoughts..." v-model.trim="comment"></textarea>
        <div class="btn-container">
            <!-- <base-button type="submit">Cancel</base-button> -->
            <base-button type="button">Add</base-button>
        </div>
  </base-form>
</template>

<script>
import { ref } from '@vue/reactivity'


export default {
    emits: ['add-comment'],
    setup(_, context) {
        const comment = ref('');

        function getComment() {
            context.emit('add-comment', comment.value)
        }
        

        return {comment, getComment}
    }

}
</script>

<style scoped>

.btn-container{
    display: flex;
    gap: 10px;
    margin-left: auto;
}

</style>