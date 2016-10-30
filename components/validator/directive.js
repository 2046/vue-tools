let refs, definition, Vue

Vue = require('vue')

refs = {}
definition = {
    bind(el, binding, vnode) {
        el.dataset.novalidate = el.getAttribute('novalidate')
        el.setAttribute('novalidate', 'novalidate')

        el.callback = function(e) {
            let count, components, result

            count = 0
            components = [...el.getElementsByClassName('validator')]

            if(binding.modifiers.prevent) {
                e.preventDefault()
            }

            for(let component of components) {
                if((result = refs[component.dataset.uuid].execute()) !== true) {
                    break
                }

                count += 1
            }

            binding.value(count === components.length ? null : result, e)
        }

        el.addEventListener('submit', el.callback, false)
    },
    unbind(el, binding, vnode) {
        if(el.dataset.novalidate === null) {
            el.removeAttribute('novalidate')
        }else {
            el.setAttribute('novalidate', el.dataset.novalidate)
        }

        el.removeEventListener('submit', el.callback, false)
        delete el.dataset.novalidate
    }
}

module.exports = {
    refs,
    definition
}
