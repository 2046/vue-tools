import Vue from 'vue'
import App from './App'
import router from './router'
import Cell from 'components/cell'
import Icon from 'components/icon'
import Swipe from 'components/swipe'
import Popup from 'components/popup'
import Alert from 'components/alert'
import Toast from 'components/toast'
import Modal from 'components/modal'
import Confirm from 'components/confirm'
import Loading from 'components/loading'

Vue.component('Cell', Cell)
Vue.component('Icon', Icon)
Vue.component('Alert', Alert)
Vue.component('Swipe', Swipe)
Vue.component('Popup', Popup)
Vue.component('Toast', Toast)
Vue.component('Modal', Modal)
Vue.component('Confirm', Confirm)
Vue.component('Loading', Loading)

new Vue({
    router,
    ...App
}).$mount('#app')
