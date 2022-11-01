<template>
<base-card>
        <h2>{{building.name}}</h2>

            <community-list :members="members"></community-list>
    
            <post></post>
            
     

</base-card>

</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import CommunityList from '@/components/community/CommunityList.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import Post from '@/components/community/Post.vue'

export default {
  components: { CommunityList, BaseCard, Post },
     setup() {
        const store = useStore()
        const building = ref({})
        const members = ref([])


        async function init() {
            const buildingId = localStorage.getItem('buildingMember')
            try {
                // Fetch the current building
                await store.dispatch('buildings/loadBuilding', buildingId)

               const curBuilding = await store.getters['buildings/buildings']
                building.value = curBuilding


                // Fetch the residents of the building
                await store.dispatch('residents/fetchApplications', buildingId)

                const curApplications = await store.getters['residents/getApplications']

               for(const key in curApplications) {
                   const userId = curApplications[key].userId;

                   await store.dispatch('profiles/fetchProfile', userId)

                   const wannabeMember = await store.getters['profiles/getProfile']
                   members.value.push(wannabeMember)

                    
               }
            } catch(err) {
                console.log(err);
            }

        }
        
        init()
        

        return {building, members}
    }


}
</script>

<style >



</style>