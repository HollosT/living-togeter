<template>
   
        <BaseCountryCheckBox
            v-for="country in countries"
            :key="country"
            :id="country"
            :filters="filters"
            @set-filter="setFilter"
             />

    
  
</template>

<script>
import BaseCountryCheckBox from '../UI/BaseCountryCheckBox.vue';



export default {
    props: ["countries", 'filters'],
    emits: ['set-filter'],
    components: { BaseCountryCheckBox },

    setup(_, context) {

        function setFilter(payload) {
            context.emit('set-filter', payload)
        }

        return {setFilter}
    }
}
</script>

<style>

</style>