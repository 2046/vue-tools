import Vue from 'vue'
import App from './App'
import router from './router'
import Cell from 'components/cell'
import Swipe from 'components/swipe'

Vue.component('Cell', Cell)
Vue.component('Swipe', Swipe)

new Vue({
    router,
    ...App
}).$mount('#app')
