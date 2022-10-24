<template>
      <base-form @submit.prevent="submitForm">

        <div class="input-container">
          <label for="name">Add a name for your community:</label>
          <input type="text" id="name" v-model.trim="name.val" requeired autofocus >
        </div>

       <div class="input-container">
          <label for="country">Country:</label>
          <input type="text" id="country" v-model.trim="address.country.val" requeired >
        </div> 

        <div class="input-container">
          <label for="city">City:</label>
          <input type="text" id="city" v-model.trim="address.city.val" requeired>
        </div>

        <div class="input-container">
          <label for="postalCode">Postal code:</label>
          <input type="number" id="postalCode" v-model.trim="address.postalCode.val" requeired>
        </div>

        <div class="input-container">
          <label for="street">Street:</label>
          <input type="text" id="street" v-model.trim="address.street.val" requeired>
        </div>

        <div class="input-container">
          <label for="buildingNumber">Building number:</label>
          <input type="number" id="buildingNumber" v-model.trim="address.buildingNumber.val" requeired >
        </div>
        <div class="input-container">
          <label for="flats">Number of flats:</label>
          <input type="number" id="flats" v-model.trim="flats.val" requeired >
        </div>
        <div class="input-container">
          <label for="description">Description:</label>
          <textarea  id="description"  rows="3" v-model.trim="description.val" requeired ></textarea>
        </div>

        <!-- <p v-if="!formIsValid">Sorry, but there is alr</p> -->
     
  
        <base-button type="filled">Send</base-button>
      </base-form>
</template>

<script>
import { Namespaces } from '@vue/compiler-core'
import { isRef, ref } from '@vue/reactivity'
import { useStore } from 'vuex'



export default {
    emits: ['save-data'],


    setup(_, context) {
        const store = useStore()
        const buildings =  store.getters["buildings/buildings"]
        
        const formIsValid = ref(true)
        const name = ref({
                val: '',
                isValid: true
        })
        const address = ref({
            country: {
                val: '',
                isUnique: true,
                isValid: true
            },
            city: {
                val: '',
                isUnique: true,
                isValid: true
            },
            postalCode: {
                val: '',
                isUnique: true,
                isValid: true
            },
            street: {
                val: '',
                isUnique: true,
                isValid: true
            },
            buildingNumber: {
                val: '',
                isUnique: true,
                isValid: true
            }
        })
        const flats = ref({
                val: '',
                isValid: true
        })
        const description = ref({
                val: '',
                isValid: true
        })
 
        
        
        // Checking the address
        // function checkValidation() {
      // function addressValidation(input) {
      //     buildings.forEach(bld => {
      //     const existingAddress = bld.address
  
      //     if(existingAddress[input] === address.value[input].val) {
      //       address.value[input].isUnique = false
      //     }
  
              
      //   })
                    
      // }
    //     let falseArr = []
    //     for(const key in address.value) {
    //       if(address.value[key].isUnique === false) {
    //         falseArr.push(key)

    //       }
          
    //     }
    //     if(falseArr.length === 5) {
    //       formIsValid.value = false;
    //       for(const key in address.value) {
    //         // if(address.value[key].isUnique === false) {
    //         //   address.value[key].val = ''
    //         //   // address.value[key].isUnique = 

    //         // }
          
    //     }
    //     }
    // }





    function submitForm() {
        const buildingWannabe = {
          address: {
              country: address.value.country.val,
              city: address.value.city.val,
              street: address.value.street.val,
              buildingNumber: address.value.buildingNumber.val, 
              postalCode: address.value.postalCode.val,
          },
          flats: flats.value.val,
          name: name.value.val,
          description: description.value.val,
      }
      context.emit('save-data', buildingWannabe)
    }



    return {name, address, flats, description, submitForm}
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
    }

    input,
    textarea {
        width: 25vw;
        border-radius: .5vw;

    }


</style>