<template>
  <base-card>
      <h3>Register your building</h3>
      <BuildingForm  @save-data="uploadBuilding"/>
  </base-card>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import BuildingForm from '../../components/buildings/BuildingForm.vue'

export default {
  components: {BuildingForm},

  setup() {
    const store = useStore()
    const router = useRouter()

    function uploadBuilding(data) {
      store.dispatch("buildings/registerBuilding", data)
      router.replace('/')

    }

    return {uploadBuilding}
  }


}
</script>

<style>

</style>