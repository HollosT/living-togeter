export default {

    async registerBuilding(context, data) {
        const response = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/buildings.json`, {
            method: 'POST',
            body: JSON.stringify(data)
        })

        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to upload!')
            throw error
        }

        const responseData = await response.json()

        context.commit('registerBuilding', {
            ...responseData

        })
    },


    async loadBuildings(context) {
        const response = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/buildings.json`)
        const responseData = await response.json()

        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!')
            throw error
        }

        const buildings = [];

        for(const key in responseData) {
            const building = {
                id: key,
                address: {
                    country: responseData[key].address.country,
                    city: responseData[key].address.city,
                    street: responseData[key].address.street,
                    buildingNumber: responseData[key].address.buildingNumber, 
                    postalCode: responseData[key].address.postalCode,
                },
                flats: responseData[key].flats,
                name: responseData[key].name,
                description: responseData[key].description,
                residents: [responseData[key].residents]
            }

            buildings.push(building)
        }
        context.commit('setBuildings', buildings)
    },

    async loadBuilding(context, buildingId) {
        const response = await fetch(`https://living-together-90530-default-rtdb.europe-west1.firebasedatabase.app/buildings/${buildingId}.json`)
        const responseData = await response.json()

        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!')
            throw error
        }

        const building = {
                id: buildingId,
                address: {
                    country: responseData.address.country,
                    city: responseData.address.city,
                    street: responseData.address.street,
                    buildingNumber: responseData.address.buildingNumber, 
                    postalCode: responseData.address.postalCode,
                },
                flats: responseData.flats,
                name: responseData.name,
                description: responseData.description
        }

        context.commit('setBuildings', building)

    },

    
    
}