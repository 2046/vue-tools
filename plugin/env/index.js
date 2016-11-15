let os, app, Version, browser

os = require('./os')
app = require('./app')
Version = require('./version')
browser = require('./browser')

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
