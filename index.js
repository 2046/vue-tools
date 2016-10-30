import plugins from 'plugins'
import components from 'components'

function plugin(Vue) {
    if(plugin.installed) {
        return
    }

    for(let key of Object.keys(plugins)) {
        Vue.use(plugins[key])
    }

    for(let key of Object.keys(components)) {
        Vue.component(key, components[key])
    }
}

plugin.plugins = plugins
plugin.components = components

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(plugin)
}

module.exports = plugin
