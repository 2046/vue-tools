import Loading from 'components/Loading'

function plugin(Vue) {
    if(plugin.installed){
        return
    }

    let Component, component, container, propsData

    propsData = {
        visible: false
    }

    Component = Vue.extend(Loading)
    container = document.createElement('div')
    document.getElementsByTagName('body')[0].appendChild(container)
    component = new Component({propsData}).$mount(container)

    function method(visible, text) {
        component.text = text
        component.visible = visible
    }

    Vue.loading = method
    Vue.prototype.$loading = method
}

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(plugin)
}

module.exports = plugin
