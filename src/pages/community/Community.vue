<template>
  This is the community page

  <h2 v-for="applicant in applications" :key="applicant.userId">{{applicant.email}}</h2>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()
        const applications = ref([])

       async function getMembers() {
            const buildingId = localStorage.getItem('memberBuilding')
            try{
                await store.dispatch('residents/fetchApplications', buildingId)

               const wannaBeApplicants =  await store.getters['residents/getApplications']
               applications.value = wannaBeApplicants

            } catch(err) {
                console.log(err);
            }
              
        }

        getMembers()
        

        return {applications}
    }


}
</script>

<style>

</style>