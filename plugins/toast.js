import Toast from 'components/toast'

function plugin(Vue) {
    if(plugin.installed){
        return
    }

    let Component, component, container, propsData

    propsData = {
        type: '',
        text: '',
        visible: false
    }

    Component = Vue.extend(Toast)
    container = document.createElement('div')
    document.getElementsByTagName('body')[0].appendChild(container)
    component = new Component({propsData}).$mount(container)

    function method(type = '', text, time) {
        component.type = type
        component.text = text
        component.time = time
        component.visible = true
        component.$on('hide', () => {
            component.visible = false
        })
    }

    Vue.toast = method
    Vue.prototype.$toast = method
}

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(plugin)
}

module.exports = plugin
