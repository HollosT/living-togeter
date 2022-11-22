<template>
  <span>
    <label for="id">{{label}}</label>
    <input type="type" id="id" v-model.trim="searchInput" @input="search"/>
  </span>
</template>

<script>
import { ref } from '@vue/reactivity'
// import { watch } from '@vue/runtime-core';
export default {
    props: ['id', 'type', 'label'],
    emits: ['search-community'],
    setup(_, context) {
        const searchInput = ref('');
        // let isTyping = false

        // watch(searchInput, (newValue, oldValue) => {
        //     if(isTyping) {

        //     }
        // })

        function search() {
            // isTyping = true
            context.emit('search-community', searchInput.value)
        }


        return {searchInput, search}
    }
}
</script>

<style>

</style>