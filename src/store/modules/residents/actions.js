export default {
    async apply(context, payload) {
        const newApplication = {
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
        const responseData = await response.json()
        newApplication.id = responseData.name
        newApplication.buildingId = payload.buildingId

        context.commit('addApplication', newApplication)
    },

    async fetchApplications(context, buildingId) {
        // const token = context.rootGetters.token
        const response = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/residents/${buildingId}.json`)
        const responseData = await response.json()

        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }

        const applications = []

        for(const key in responseData) {
            const application = {
                buildingId: key,
                email: responseData[key].userEmail,
                userId: responseData[key].userId
            }
            applications.push(application)
        }

        context.commit('setApplications', applications)
    }
    
}