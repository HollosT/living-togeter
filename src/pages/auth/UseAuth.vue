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
            <profile-form v-if="mode=== 'signup'" @profileData="sortProfileData"></profile-form>
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
import ProfileForm from '@/components/profiles/ProfileForm.vue';

export default {
  components: { BaseButton, ProfileForm },

  setup() {
    const email = ref('');
    const password = ref('')

    // Profile information 
    const profile = ref({
        firstName: '',
        lastName: '',
        age: null,
        flatAddress: '',
        url: '',
    })
    
    const mode = ref('login')
    const isLoading = ref(false)
    const store = useStore()
    const router = useRouter()



    function sortProfileData(data, keyValue)  {
        for(const key in profile.value) {
            if(key === keyValue) {
                profile.value[key] = data
            }
        }

    }

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

                const userId = store.getters['userId']

                await store.dispatch('profiles/registerProfile', {
                    ...profile.value,
                    userId: userId
                })
            }
            router.replace('/')
        }catch(err) {
            console.log(err);
        }
    }



    return {email, password, submitBtnCaption, authContent, switchAuth, submitForm, isLoading, mode, sortProfileData}
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