<template>
    <span>
        <input type="checkbox" :id="id" checked @change="onChange" />
        <label :for="id" >{{id}}</label>
    </span>
</template>

<script>


export default {
    props: ['id', 'checked', 'onChange',"filters" ],
    emits: ['set-filter'],

    setup(props, context) {
        function onChange(e) {
            const inputId = e.target.id;
            const isActive = e.target.checked


            const updatedFilters = {
                ...props.filters,
                [inputId]: isActive
            }
 
           
            context.emit('set-filter', updatedFilters)
        }

        return{onChange}
    }

}
</script>

<style>

</style>