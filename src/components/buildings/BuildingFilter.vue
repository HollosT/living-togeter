<template>
        <h2>Filter</h2>
        <div>
            
            <BaseCountryCheckBox
                v-for="country in countries"
                :key="country"
                :id="country"
                :filters="filters"
                @set-filter="setFilter"
                 />
        </div>

        <div class="input-search">
            <BaseSearchInput 
            label="Community name: "
            id="communityName"
            type="text"
            @search-community="search" />

        </div>

  
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

<style scoped>


</style>