let Alert = require('components/alert')

function plugin(Vue) {
    if(plugin.installed){
        return
    }

    let Component, component, container, propsData

    propsData = {
        text: '',
        title: '',
        visible: false
    }

    Component = Vue.extend(Alert)
    container = document.createElement('div')
    document.getElementsByTagName('body')[0].appendChild(container)
    component = new Component({propsData}).$mount(container)

    function method(title = '', text = '', buttonText, onHide = noop) {
        if(typeof buttonText === 'function') {
            onHide = buttonText
            buttonText = ''
        }

        component.text = text
        component.title = title
        component.visible = true

        if(buttonText) {
            component.buttonText = buttonText
        }else {
            component.buttonText = '确定'
        }

        component.$on('hide', () => {
            onHide()
            component.visible = false
        })
    }

    Vue.alert = method
    Vue.prototype.$alert = method
}

function noop(){}

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(plugin)
}

module.exports = plugin
