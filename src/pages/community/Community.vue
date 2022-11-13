<template>
    <section>
        <base-sidebar title="Members">
            
            <community-list :members="members"></community-list>
        </base-sidebar>
        <base-card>
                <h2>{{building.name}}</h2>
                
            <post-list></post-list>
        </base-card>
    </section>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import CommunityList from '@/components/community/CommunityList.vue'
import PostList from '@/components/community/PostList.vue'

export default {
  components: { CommunityList, PostList },
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

<style scoped>

section {
    display: grid;
    grid-template-columns: auto 1fr;
}

div {
        display: flex;
        flex-direction: column;
        gap: 4vw;
}



</style>