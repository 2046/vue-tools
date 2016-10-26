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

    function method(title = '', text = '', buttonOkText, buttonCancelText, onHide = noop) {
        if(typeof buttonOkText === 'function') {
            onHide = buttonOkText
            buttonOkText = ''
        }

        if(typeof buttonCancelText === 'function') {
            onHide = buttonCancelText
            buttonCancelText = ''
        }

        component.text = text
        component.title = title
        component.visible = true

        if(buttonOkText) {
            component.buttonOkText = buttonOkText
        }else {
            component.buttonOkText = '确定'
        }

        if(buttonCancelText) {
            component.buttonCancelText = buttonCancelText
        }else {
            component.buttonCancelText = '取消'
        }

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
