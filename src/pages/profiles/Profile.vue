<template>
    <base-card>
            {{profile.firstName}} {{profile.lastName}}
    </base-card>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
    
    setup() {
        const store = useStore()
        const profile = ref({})

       async function getProfile() {
            const userId = localStorage.getItem('userId')
            try{
              await store.dispatch('profiles/fetchProfile', userId)
              const curProfile = store.getters['profiles/getProfile']
              profile.value = curProfile

            } catch(err) {
            }
        }

        getProfile()

        return{profile}
    }

}
</script>

<style>

</style>