import Vue from 'vue'
import App from './App'
import router from './router'
import Validator from 'vt-validator'

Vue.component('Validator', Validator)

new Vue({
    router,
    ...App
}).$mount('#app')
