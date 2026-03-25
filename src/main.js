import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import api from './plugins/axios'

const app = createApp(App)

app.use(store)
app.use(router)

app.config.globalProperties.$api = api

app.mount('#app')