import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GStore from './store/globalReactive'
import 'nprogress/nprogress.css'

createApp(App).use(router).use(store).provide('GStore', GStore).mount('#app')
