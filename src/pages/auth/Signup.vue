<template>
  <base-card>
    <h2>Register as a resident</h2>
    <base-form>
            <div class="input-container">
                <label for="firstName">First name:</label>
                <input type="text" id="firstName" v-model.trim="firstName" requeired autofocus >
            </div>

            <div class="input-container">
                <label for="lastName">Country:</label>
                <input type="text" id="lastName" v-model.trim="lastName" requeired >
            </div> 

            <div class="input-container">
                <label for="birth">Born:</label>
                <input type="date" id="birth" v-model.trim="birth" requeired>
            </div>

            <div class="input-container">
                <label for="email">Email address:</label>
                <input type="email" id="email" v-model.trim="email" requeired>
            </div>

            <div class="input-container">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model.trim="password" requeired>
            </div>
            <div class="input-container">
                <base-button type="filled">Sign up</base-button>
            </div>
  </base-form>
</base-card>

</template>

<script>
import BaseButton from '@/components/UI/BaseButton.vue'

export default {
  components: { BaseButton },
 

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

</style>