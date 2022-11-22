<template>
    <span>
        <label :for="id" >{{id}}</label>
        <input class="checkbox" type="checkbox" :id="id" checked @change="onChange" />
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

<style scoped>
span {
    display: flex;
    flex-direction: row;
    gap: 3vw;
    margin-bottom: 1vw;
}



input {
    scale: 2;
}


</style>