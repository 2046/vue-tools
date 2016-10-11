import Vue from 'vue'
import App from './App'
import router from './router'
import Cell from 'components/cell'
import Alert from 'components/alert'

Vue.component('Cell', Cell)
Vue.component('Alert', Alert)

new Vue({
    router,
    ...App
}).$mount('#app')
