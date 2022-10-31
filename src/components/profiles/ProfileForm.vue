<template>
            <div class="input-container">
                <label for="firstName">First name:</label>
                <input type="text" id="firstName"  @blur="getData($event, 'firstName')">
            </div>
          <div class="input-container">
                <label for="lastName">Last name:</label>
                <input type="text" id="lastName" @blur="getData($event, 'lastName')">
            </div> 
            <div class="input-container">
                <label for="age">Age:</label>
                <input type="age" id="age"  @blur="getData($event, 'age')">
            </div>
            <div class="input-container">
                <label for="flatAddress">Flat address:</label>
                <input type="text" id="flatAddress" @blur="getData($event, 'flatAddress')">
            </div>
            <div class="input-container">
                <label for="url">Profile picture url:</label>
                <input type="text" id="url"  @blur="getData($event, 'url')">
            </div>
            
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    emits: ['profileData'],
    setup(props, context) {
    
        function getData(e, profielKey) {
            context.emit('profileData', e.target.value, profielKey)
        }



        return {getData}
    }

}
</script>

<style scoped>
.input-container {
        width: 80%;
        margin: auto;
        display: flex;
        gap: 2vw;
        margin-bottom: 3vw;
        justify-content: center;
        
    }

    input,
    textarea {
        width: 25vw;
        border-radius: .5vw;

    }

    span {
        text-decoration: underline;
        cursor: pointer;
    }

</style>