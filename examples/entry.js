import Vue from 'vue'
import App from './App'
import router from './router'
import Cell from 'components/cell'
import Swipe from 'components/swipe'
import Popup from 'components/popup'

Vue.component('Cell', Cell)
Vue.component('Swipe', Swipe)
Vue.component('Popup', Popup)

new Vue({
    router,
    ...App
}).$mount('#app')
