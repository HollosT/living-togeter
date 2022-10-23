import { createStore } from 'vuex'

import buildingsModule from './modules/buildings/index.js'
import residentsModule from './modules/residents/index.js'

const store = createStore({
  modules: {
    buildings: buildingsModule,
    residents: residentsModule
  },

})

export default store
