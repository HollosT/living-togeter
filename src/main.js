import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'

// Base components
import BaseCard from './components/UI/BaseCard.vue'
import BaseButton from './components/UI/BaseButton.vue'
import BaseForm from './components/UI/BaseForm.vue'

// Global css
import './assets/global.css'

const app = createApp(App)

app.use(store)
app.use(router)

// Components
app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-form', BaseForm)

app.mount('#app')
