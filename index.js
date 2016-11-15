import Cell from './component/cell'
import Icon from './component/icon'
import Swipe from './component/swipe'
import Alert from './component/alert'
import Modal from './component/modal'
import Popup from './component/popup'
import Toast from './component/toast'
import Videos from './component/video'
import Layout from './component/layout'
import Headers from './component/header'
import Switchs from './component/switch'
import Loading from './component/loading'
import Confirm from './component/confirm'
import Infinite from './component/infinite'
import Validator from './component/validator'
import Upload from './component/upload'
import Progress from './component/progress'

import wx from './plugin/wx'
import env from './plugin/env'
import ajax from './plugin/ajax'
import alert from './plugin/alert'
import toast from './plugin/toast'
import confirm from './plugin/confirm'
import loading from './plugin/loading'
import eventBus from './plugin/eventBus'

function plugin(Vue, opts) {
    if(plugin.installed) {
        return
    }

    opts = Object.assign({}, {
        config: {},
        exclude: []
    }, opts)

    for(let key of Object.keys(plugin.plugins)) {
        if(opts.exclude.indexOf(key) === -1) {
            if(opts.config[key]) {
                Vue.use(plugin.plugins[key], opts.config[key])
            }else {
                Vue.use(plugin.plugins[key])
            }
        }
    }

    for(let key of Object.keys(plugin.components)) {
        Vue.component(key, plugin.components[key])
    }
}

plugin.plugins = {
    wx,
    env,
    ajax,
    alert,
    toast,
    confirm,
    loading,
    eventBus
}
plugin.components = {
    Cell,
    Icon,
    Alert,
    Modal,
    Popup,
    Swipe,
    Toast,
    Videos,
    Layout,
    Switchs,
    Headers,
    Loading,
    Confirm,
    Infinite,
    Validator,
    Upload,
    Progress
}

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(plugin)
}

module.exports = plugin
