import os from './os'
import app from './app'
import Version from './version'
import browser from './browser'

let env = {
    os,
    app,
    browser,
    Version
}

function plugin(Vue) {
    if (plugin.installed) {
        return
    }

    Vue.env = env
    Vue.prototype.$env = env
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
}

module.exports = plugin
