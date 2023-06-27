import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toaster from "@meforma/vue-toaster";
import store from "./store";

import './bootstrap'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Toaster)
app.mount('#app')

