import Confirm from '../component/confirm'

function plugin(Vue) {
    if(plugin.installed){
        return
    }

    let Component, component, container, props

    props = {
        text: '',
        title: '',
        hide() {},
        visible: false,
        cancelButton: '取消',
        confirmButton: '确定',
    }

    Component = Vue.extend({
        props: {
            options: {
                type: Object,
                default() {
                    return props
                }
            }
        },
        render(createElement) {
            let children = [
                createElement('p', { slot: 'cancelButton' }, this.options.cancelButton),
                createElement('p', { slot: 'confirmButton' }, this.options.confirmButton)
            ]

            if(this.options.title) {
                children.push(createElement('p', { slot: 'title' }, this.options.title))
            }

            if(this.options.text) {
                children.push(createElement('p', { slot: 'text' }, this.options.text))
            }

            return createElement(Confirm, {
                props: {
                    visible: this.options.visible
                },
                on: {
                    hide: function(val){
                        this.options.visible = false
                        this.options.hide(val)
                    }.bind(this)
                }
            }, children)
        }
    })

    container = document.createElement('div')
    document.getElementsByTagName('body')[0].appendChild(container)
    component = new Component().$mount(container)

    function method(options) {
        component.options = {
            ...props,
            ...options,
            visible: true
        }
    }

    Vue.confirm = method
    Vue.prototype.$confirm = method
}

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(plugin)
}

module.exports = plugin
