<template>
  <li>
    <h3>{{building.name}}</h3>
    

    <div class="address">
        <p>{{building.address.country}},</p>
        <p>{{building.address.city}}</p>
        <p>{{building.address.street}}</p>
        <p>{{building.address.buildingNumber}}.</p>
        <p>{{building.address.postalCode}}.</p>
    </div>
    <div>
        <base-button link :to="'buildings/' + building.id"  type="filled" >See more</base-button>
    </div>
  </li>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue'

export default {
  components: { BaseButton },

    props: ['building']

}
</script>

<style scoped>

li {
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 2px rgba(0, 0, 0, .25);
    border-radius: .5vw;
    max-width: 45vw;
    padding: 2vw;
    margin: auto;
    margin-bottom: 3vw;
    justify-content: space-between;
}

.address{
    display: flex;
    gap: 1vw;
    margin: 2vw 0;
}
</style>