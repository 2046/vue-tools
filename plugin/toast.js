let Toast = require('../component/toast')

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

    function method(type, text, time) {
        if(typeof text === 'number') {
            time = text
            text = ''
        }

        if(['success', 'error', 'warn'].indexOf(type) === -1) {
            text = type
            type = ''
        }

        if(time) {
            component.time = time
        }else {
            component.time = 2000
        }

        if(type) {
            component.type = type
        }else {
            component.type = ''
        }

        component.text = text
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
