<template>
        <ul>
            <li v-for="member in members" :key="member.userId" class="member-list">
                <img :src="member.url" :alt="member.firstName">
                <p>{{member.firstName}} {{member.lastName}}</p>
                <p>Flat: {{member.flatAddress}}</p>
            </li>
        </ul>
</template>

<script>

export default {
    props: ['members'],
  

}
</script>

<style scoped>

.member-list {
    display: flex;
    flex-direction: row;
    gap: 2vw;
    align-items: center;
    border: 1px solid var(--mildgrey);
    max-width: 30vw;
    border-radius: 10px;
    margin-bottom: 2vw;
}
.member-list img {
    width: 20%;
    object-fit: contain;
    border-radius: 10px;
}



</style>