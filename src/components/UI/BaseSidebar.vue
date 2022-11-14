<template>
    <aside>
        <h4>{{title}}</h4>
        <slot></slot>
    </aside>
</template>

<script>


export default {
    props: ['title']

}
</script>

<style scoped>
    aside {
        background: var(--lightyellow);
        height: 100%;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 2vw;
        padding-top: 5%;
    }

</style>