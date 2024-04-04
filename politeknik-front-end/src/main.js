import './assets/main.css'
import axios from 'axios'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})

app.config.globalProperties.$axios = axios

app.use(vuetify).use(router)
app.mount('#app')
