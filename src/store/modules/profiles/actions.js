export default {
        async registerProfile(context, payload) {
            console.log(payload);
            const newProfile = {
                userId: payload.userId,
                firstName: payload.firstName,
                lastName: payload.lastName,
                flatAddress: payload.flatAddress,
                age: payload.age,
                url: payload.url
                
            }
    
            const response = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/profiles/${payload.userId}.json`, {
                method: 'POST',
                body: JSON.stringify(newProfile)
            })
    
            if(!response.ok) {
                const error = new Error(responseData.message || 'Failed to send request.')
                throw error
            }

            const responseData = await response.json()

            context.commit('addProfile', newProfile)
        },


        async fetchProfile(context, payload) {
            const response = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/profiles/${payload}.json`)
    
            if(!response.ok) {
                const error = new Error(responseData.message || 'Failed to send request.')
                throw error
            }

            const responseData = await response.json()
            
            for(const key in responseData) {
                const newProfile = {
                    userId: payload,
                    firstName: responseData[key].firstName,
                    lastName: responseData[key].lastName,
                    flatAddress: responseData[key].flatAddress,
                    age: responseData[key].age,
                    url: responseData[key].url
                    
                }
                
                context.commit('addProfile', newProfile)
            }

        }



}