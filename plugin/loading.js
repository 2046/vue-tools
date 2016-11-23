let Loading = require('../component/loading')

function plugin(Vue) {
    if(plugin.installed){
        return
    }

    let Component, component, container, propsData, counter

    propsData = {
        visible: false
    }

    counter = 0
    Component = Vue.extend(Loading)
    container = document.createElement('div')
    document.getElementsByTagName('body')[0].appendChild(container)
    component = new Component({propsData}).$mount(container)

    function method(visible, text) {
        if(text) {
            component.text = text
        }else {
            component.text = '数据加载中'
        }

        counter = visible ? counter + 1 : counter - 1

        if(!visible && counter !== 0) {
            return
        }

        component.visible = visible
    }

    Vue.loading = method
    Vue.prototype.$loading = method
}

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(plugin)
}

module.exports = plugin
