<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
    export default {
        props: {
            disabled: Boolean,
            distance: {
                type: [String, Number],
                default: 400
            }
        },
        data() {
            return {
                status: '',
                target: null,
            }
        },
        methods: {
            scroll() {
                let element, target, trigger, distance, scrollTop, viewportBottom, elementBottom

                if(this.status === 'loading'){
                    return
                }

                trigger = false
                element = this.$el
                target = this.target
                distance = this.distance
                scrollTop = getScrollTop(target)
                viewportBottom = scrollTop + getElementHeight(target)

                if(target === element){
                    trigger = target.scrollHeight - viewportBottom <= distance
                }else{
                    elementBottom = getElementTop(element) - getElementTop(target) + element.offsetHeight + scrollTop
                    trigger = viewportBottom + distance >= elementBottom
                }

                if(trigger){
                    this.$emit('load')
                    this.status = 'loading'
                }
            }
        },
        watch: {
            disabled(val) {
                this.status = val ? '' : this.status
            }
        },
        mounted() {
            this.target = getTarget(this.$el)
            this.scrollListener = throttle(this.scroll, 200)
            this.target.addEventListener('scroll', this.scrollListener, false)
        },
        destroyed() {
            this.target.removeEventListener('scroll', this.scrollListener, false)
        }
    }

    function getTarget(currentNode){
        while(currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1){
            let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
            if (overflowY === 'scroll' || overflowY === 'auto') {
                return currentNode
            }
            currentNode = currentNode.parentNode
        }

        return window
    }

    function getScrollTop(element){
        return element === window ? Math.max(window.pageYOffset || 0, document.documentElement.scrollTop) : element.scrollTop
    }

    function getElementTop(element){
        return element === window ? getScrollTop(window) : element.getBoundingClientRect().top + getScrollTop(window)
    }

    function getElementHeight(element){
        return element === window ? document.documentElement.clientHeight : element.clientHeight
    }

    function throttle(func, wait, options = {}){
        let context, args, result, timeout, previous

        function later() {
            previous = options.leading === false ? 0 : Date.now()
            timeout = null
            result = func.apply(context, args)
            if (!timeout) {
                context = args = null
            }
        }

        return function() {
            let now, remaining

            now = Date.now()
            if (!previous && options.leading === false) {
                previous = now
            }

            context = this
            args = arguments
            remaining = wait - (now - previous)

            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout)
                    timeout = null
                }
                previous = now
                result = func.apply(context, args)
                if (!timeout) {
                    context = args = null
                }
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining)
            }

            return result
        }
    }
</script>
