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


        function search() {
            context.emit('search-community', searchInput.value)
        }


        return {searchInput, search}
    }
}
</script>

<style scoped>
span {
  display: flex;
  gap: 2vw;
}

input {
  width: 20vw;
  border-radius: 10px;
  border: 1px solid var(--primarly);
}

</style>