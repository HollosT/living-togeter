export default {
    async apply(context, payload) {
        const newApplication = {
            buildingId: payload.buildingId,
            userEmail: payload.email,
            userId: payload.userId
        }

        const response = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/residents/${payload.buildingId}.json`, {
            method: 'POST',
            body: JSON.stringify(newApplication)
        })

        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.')
            throw error
        }

        localStorage.setItem('buildingMember', payload.buildingId)

        const responseData = await response.json()
        newApplication.id = responseData.name
        newApplication.buildingId = payload.buildingId

        context.commit('addApplication', newApplication)
    },

    async fetchApplications(context, buildingId) {
        const response = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/residents/${buildingId}.json`)
        const responseData = await response.json()
        
        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }

        const applications = []

        for(const key in responseData) {
            const application = {
                applicationId: key,
                buildingId: buildingId,
                email: responseData[key].userEmail,
                userId: responseData[key].userId
            }
            applications.push(application)
        }

        context.commit('setApplications', applications)
    },

    async fetchApplication(context, payload) {
        
        const response = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/residents.json`)
        const responseData = await response.json()
        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }

        for(const key in responseData) {
            for(const innerKey in responseData[key]) {
                if(responseData[key][innerKey].userId === payload) {
                    localStorage.setItem('buildingMember', responseData[key][innerKey].buildingId)
                    context.commit('setMember', responseData[key][innerKey].buildingId)
                }
            }
        }


    },

    tryMember(context) {
        const buildingId = localStorage.getItem('buildingMember')

        if(buildingId) {
            context.commit('setMember', buildingId)
        }

    }


    
}