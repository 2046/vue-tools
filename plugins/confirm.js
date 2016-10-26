import Confirm from 'components/confirm'

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

    Component = Vue.extend(Confirm)
    container = document.createElement('div')
    document.getElementsByTagName('body')[0].appendChild(container)
    component = new Component({propsData}).$mount(container)

    function method(title = '', text = '', onHide = noop) {
        component.text = text
        component.title = title
        component.visible = true
        component.$on('hide', (bool) => {
            onHide(bool)
            component.visible = false
        })
    }

    Vue.confirm = method
    Vue.prototype.$confirm = method
}

function noop(){}

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(plugin)
}

module.exports = plugin
