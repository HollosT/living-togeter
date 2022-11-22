<template>
  <span>
    <label for="id">{{label}}</label>
    <input type="type" id="id" v-model.trim="searchInput" @input="search"/>
  </span>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    props: ['id', 'type', 'label'],
    emits: ['search-community'],
    setup(_, context) {
        const searchInput = ref('');
        let isTyping = false

        function search() {
            isTyping = true
            const timer = setTimeout(() => {
                isTyping = false
                if(!isTyping) {
                    context.emit('search-community', searchInput.value)
                }
                clearTimeout(timer)
            }, 2000)

        }


        return {searchInput, search}
    }
}
</script>

<style>

</style>