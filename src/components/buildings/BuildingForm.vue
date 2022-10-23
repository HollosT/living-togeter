<template>
      <base-form >

        <div class="input-container">
          <label for="name">Add a name for your neighborhood:</label>
          <input type="text" id="name" v-model.trim="formData.name.val" requeired autofocus @blur="inputUniqueValidation('name')">
        </div>
        <input type="text">

       <div class="input-container">
          <label for="country">Country:</label>
          <input type="text" id="country" v-model.trim="formData.country.val" requeired >
        </div> 

        <!-- <div class="input-container">
          <label for="city">City:</label>
          <input type="text" id="city" v-model.trim="city.val" requeired >
        </div>
        <div class="input-container">
          <label for="postalCode">Postal code:</label>
          <input type="number" id="postalCode" v-model.trim="postalCode.val" requeired >
        </div>

        <div class="input-container">
          <label for="street">Street:</label>
          <input type="text" id="street" v-model.trim="street.val" requeired >
        </div>

        <div class="input-container">
          <label for="buildingNumber">Building number:</label>
          <input type="number" id="buildingNumber" v-model.trim="buildingNumber.val" requeired >
        </div>

        <div class="input-container">
          <label for="flats">Number of flats:</label>
          <input type="number" id="flats" v-model.trim="flats.val" requeired >
        </div>
        <div class="input-container">
          <label for="description">Description:</label>
          <textarea  id="description"  rows="3" v-model.trim="description.val" requeired ></textarea>
        </div> -->

        <base-button type="filled">Send</base-button>
      </base-form>
</template>

<script>
import { isRef, ref } from '@vue/reactivity'
import { useStore } from 'vuex'



export default {


    setup() {
        const store = useStore()
        const buildings =  store.getters["buildings/buildings"]
        console.log(buildings);

        const formIsValid = ref(true)
        const formData = ref({
            name: {
                id: 1,
                val: '',
                isValid: true
            },
            country: {
                val: '',
                isValid: true
            }
        })
      
       
            // const country = ref({
            //     val: '',
            //     isValid: true
            // }),
            // const city = ref({
            //     val: '',
            //     isValid: true
            // }),
            // const postalCode = ref({
            //     val: '',
            //     isValid: true
            // }),
            // const street = ref({
            //     val: '',
            //     isValid: true
            // }),
            // const buildingNumber = ref({
            //     val: '',
            //     isValid: true
            // }),
            // const flats = ref({
            //     val: '',
            //     isValid: true
            // }),
            // const description = ref({
            //     val: '',
            //     isValid: true
            // })

      

        function inputUniqueValidation(input) {
            for( const key in formData.value) {
               if(key === input) {
                   const error = buildings.some(bld => {
                      if(bld[input].includes(formData.value[input].val) && bld[input].length === formData.value[input].val.length) return true
                        
                    })
                    console.log(error);
                    
               }
            }
        
        }



    // function submitForm() {
        
    // }



    return {formData, inputUniqueValidation}
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