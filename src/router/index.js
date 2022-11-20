import { createRouter, createWebHistory } from 'vue-router'

import store from '../store/index.js'

import buildingList from '../pages/buildings/BuildingList.vue'
import buildingDetail from '../pages/buildings/BuildingDetail.vue'
import buildingRegistration from '../pages/buildings/BuildingRegistration.vue'
import useAuth from '../pages/auth/UseAuth.vue'
import community from '../pages/community/Community.vue'
import profile from '../pages/profiles/Profile.vue'



const router = createRouter({
      history: createWebHistory(),
      routes: [
      {
      path: '/',
      redirect: '/buildings'
      },
      {
      path: '/buildings',
      name: 'buildinglist',
      component: buildingList,
      },
      {
      path: '/buildings/:bid',
      name: 'buildingDetail',
      component: buildingDetail
      },
      {
      path: '/buildings/registration',
      name: 'buildingRegistration',
      component: buildingRegistration,
      meta: {requiresAuth: true},
      },
      {
      path: '/auth',
      name: 'useAuth',
      component: useAuth
      },
      {
      path: '/profiles/:id',
      name: 'profile',
      component: profile,
      meta: {requiresAuth: true},
      },
      {
      path: '/community/:bid',
      name: 'community',
      component: community,
      meta: {requiresAuth: true},
      }

      ]
})

router.beforeEach(function(to, _, next) {
  if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else {
    next()
  }
})

export default router
