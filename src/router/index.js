import { createRouter, createWebHistory } from 'vue-router'
import buildingList from '../pages/buildings/BuildingList.vue'
import residentList from '../pages/residents/ResidentList.vue'
import buildingDetail from '../pages/buildings/BuildingDetail.vue'
import buildingRegistration from '../pages/buildings/BuildingRegistration.vue'
import useAuth from '../pages/auth/UseAuth.vue'



const routes = [
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
    component: buildingRegistration
  },
  {
    path: '/auth',
    name: 'useAuth',
    component: useAuth
  },
  {
    path: '/residents',
    name: 'residentlist',
    component: residentList,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
