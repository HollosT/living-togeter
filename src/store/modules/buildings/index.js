import mutations from './mutations.js'
import getters from './getters.js'
import actions from './actions.js'

export default {
    namespaced: true,
    state() {
        return{
            buildings : [
                {
                    id: 'b1',
                    address: {
                        country: 'Denmark',
                        city: 'Aalborg',
                        street: 'Borgmester Vej',
                        buildingNumber: 7, 
                        postalCode: 9000,
                    },
                    flats: 25,
                    name: 'Borgmester 7th building',
                    description: 'Student dormitory complex located in Aalborg. This is the 7th building of the complexum.',

                },
                {
                    id: 'b2',
                    address: {
                        country: 'Denmark',
                        city: 'Aalborg',
                        street: 'Norrensudby',
                        buildingNumber: 2, 
                        postalCode: 9200,
                    },
                    flats: 10,
                    name: 'Norrensudby 2nd floor',
                    description: 'Second floor of Norrensudby 2. 9000. Our aim to make our neigbourhood and the life here better and more cautions towards out neighbours.'
                },
            ]

        }
    },

    mutations,
    actions,
    getters,
}