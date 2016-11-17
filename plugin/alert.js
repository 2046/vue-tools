import Alert from '../component/alert'

function plugin(Vue) {
    if(plugin.installed){
        return
    }

    let Component, component, container, props

    props = {
        text: '',
        title: '',
        hide() {},
        button: '确定',
        visible: false
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
            let children = [createElement('p', { slot: 'button' }, this.options.button)]

            if(this.options.title) {
                children.push(createElement('p', { slot: 'title' }, this.options.title))
            }

            if(this.options.text) {
                children.push(createElement('p', { slot: 'text' }, this.options.text))
            }

            return createElement(Alert, {
                props: {
                    visible: this.options.visible
                },
                on: {
                    hide: function(){
                        this.options.visible = false
                        this.options.hide()
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

    Vue.alert = method
    Vue.prototype.$alert = method
}

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(plugin)
}

module.exports = plugin
