import Vue from 'vue'

let refs, definition

refs = {}
definition = {
    bind(el, binding, vnode) {
        el.dataset.novalidate = el.getAttribute('novalidate')
        el.setAttribute('novalidate', 'novalidate')

        el.callback = function(e) {
            let count, components

            count = 0
            components = [...el.getElementsByClassName('validator')]

            if(binding.modifiers.prevent) {
                e.preventDefault()
            }

            for(let component of components) {
                if(!refs[component.dataset.uuid].execute()) {
                    break
                }

                count += 1
            }

            if(count === components.length) {
                binding.value(e)
            }
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

export {
    refs,
    definition
}
