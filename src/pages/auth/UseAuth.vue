<template>
  <base-card>
    <h2>Register as a resident</h2>
    <div v-if="isLoading">Authenticating...</div>
    <base-form v-else @submit.prevent="submitForm">
            <div class="input-container">
                <label for="email">Email address:</label>
                <input type="email" id="email" v-model.trim="email" requeired>
            </div>

            <div class="input-container">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model.trim="password" requeired>
            </div>
            <div class="input-container">
                <base-button type="filled">{{submitBtnCaption}}</base-button>
                <p>Or <span @click="switchAuth">{{authContent}}</span> instead!</p>
            </div>
  </base-form>
</base-card>

</template>

<script>
import BaseButton from '@/components/UI/BaseButton.vue'
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  components: { BaseButton },

  setup() {
    const email = ref('');
    const password = ref('')
    const mode = ref('login')
    const isLoading = ref(false)
    const store = useStore()
    const router = useRouter()

    const submitBtnCaption = computed(() => {
        if(mode.value === 'login') {
            return 'Login'
        } else {
            return 'Signup'
        }
    })
    const authContent = computed(() => {
        if(mode.value === 'login') {
            return 'Sign up'
        } else {
            return 'Log in'
        }
    })

    function switchAuth() {
        if (mode.value === 'login') {
            mode.value = 'signup'
        } else if (mode.value === 'signup') {
            mode.value = 'login'
        }
    }

   async function submitForm() {
        const payload = {
            email: email.value,
            password: password.value
        }

        isLoading.value = true
        try{
            if(mode.value === 'login') {
                await store.dispatch('login', payload)
            } else {
                await store.dispatch('signup', payload)
            }
            router.replace('/')
        }catch(err) {
            console.log(err);
        }
    }



    return {email, password, submitBtnCaption, authContent, switchAuth, submitForm, isLoading}
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