import { createStore } from 'vuex'

import buildingsModule from './modules/buildings/index.js'
import residentsModule from './modules/residents/index.js'
import authModel from './modules/auth/index.js'
import profilesModule from './modules/profiles/index.js'
import postsModule from './modules/posts/index.js'

const store = createStore({
  modules: {
    buildings: buildingsModule,
    residents: residentsModule,
    auth: authModel,
    profiles: profilesModule,
    posts: postsModule
  },

})

export default store
