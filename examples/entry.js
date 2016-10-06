import Vue from 'vue'
import App from './App'
import router from './router'
import Cell from 'components/cell'

Vue.component('Cell', Cell)

new Vue({
    router,
    ...App
}).$mount('#app')
