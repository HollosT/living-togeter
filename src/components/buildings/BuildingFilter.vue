<template>
   
        <BaseCountryCheckBox
            v-for="country in countries"
            :key="country"
            :id="country"
            :filters="filters"
            @set-filter="setFilter"
             />

        <BaseSearchInput 
        label="Enter the name of the community"
        id="communityName"
        type="text"
        @search-community="search" />
  
</template>

<script>
import BaseCountryCheckBox from '../UI/BaseCountryCheckBox.vue';
import BaseSearchInput from '../UI/BaseSearchInput.vue';


export default {
    props: ["countries", 'filters'],
    emits: ['set-filter', 'search'],
    components: { BaseCountryCheckBox, BaseSearchInput },

    setup(_, context) {

        function setFilter(payload) {
            context.emit('set-filter', payload)
        }
        function search(payload) {
            context.emit('search', payload)
        }

        return {setFilter, search}
    }
}
</script>

<style>

</style>