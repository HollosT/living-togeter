<template>
  <form @submit.prevent="getComment">
        <textarea :class="{invalidTextarea:  !isValid}" name="addComment" id="addComment"  rows="3" placeholder="Add your thoughts..." v-model.trim="comment"></textarea>
        <div class="btn-container">
            <base-button @click.prevent="cancel" type="secondary">Cancel</base-button>
            <base-button :class="{invalid: !isValid}" :type="buttonType">Add</base-button>
        </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core';


export default {
    emits: ['add-comment'],
    setup(_, context) {
        const comment = ref('');
        const isValid = ref(false)
        const buttonType = ref('inactive')

        function getComment() {
            
            context.emit('add-comment', comment.value)
            comment.value = ''
        }

        function cancel() {
            comment.value = ''
        }

        watch(comment, (oldComment, newComment) => {
            if(oldComment.length === 0 || newComment.length === 0) {
                isValid.value = false
                buttonType.value = 'inactive'
            } else {
                isValid.value = true
                buttonType.value = 'green'

            }
        })



      
        

        return {comment, getComment, isValid, buttonType, cancel}
    }

}
</script>

<style scoped>
textarea {
    border-radius: 5px;
    border: none;
    width: 100%;
    border-left: 5px solid var(--blockgreen);
    margin-top: 2vw;
}

.invalidTextarea {
    border-left: 5px solid var(--mildgrey);
}




.btn-container{
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}

</style>