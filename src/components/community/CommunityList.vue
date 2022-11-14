<template>
        <ul>
            <li v-for="member in members" :key="member.userId" class="member-list">
                <img :src="member.url" :alt="member.firstName">
                <div>
                    <p>{{member.firstName}} {{member.lastName}}</p>
                    <address>Flat: {{member.flatAddress}}</address>
                </div>
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
    background: var(--white);
    max-width: 25vw;
    margin-top: 2%;
    border: 1px solid var(--primarly);
}
.member-list img {
    width: 20%;
    object-fit: contain;
    
}

.member-list div {
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: .2vw;
}




</style>