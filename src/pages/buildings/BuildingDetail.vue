<template>
    <base-card>
        <h2>{{building.name}}</h2>
        <p>{{building.description}}</p>

        <base-button link to="/residents" type="filled">Join this community</base-button>
    </base-card>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
import BaseButton from '@/components/UI/BaseButton.vue'
export default {
  components: { BaseButton },

    setup() {
       const route = useRoute()
       const store = useStore()
       
       const building = computed(() => {
          return store.getters['buildings/buildings'].find(bld => bld.id === route.params.bid)
            
       })

        return{building}
       
    }
}
</script>

<style>

</style>