import { createStore } from 'vuex'

import buildingsModule from './modules/buildings/index.js'
import residentsModule from './modules/residents/index.js'
import authModel from './modules/auth/index.js'

const store = createStore({
  modules: {
    buildings: buildingsModule,
    residents: residentsModule,
    auth: authModel
  },

})

export default store
