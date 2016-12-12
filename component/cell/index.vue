<style src="./style.css"></style>
<template src="./template.html"></template>

<script>
    import Vue from 'vue'

    Vue.component('Cells', {
        render(h) {
            return h('div', {
                class: 'vt-cells'
            }, this.$slots.default)
        },
        mounted() {
            let $cells = this.$el.querySelectorAll('[data-hook="cell-component"]')

            $cells[0].classList.add('vt-cell--first')
            $cells[$cells.length - 1].classList.add('vt-cell--last')
        }
    })

    export default {
        props: {
            arrow: Boolean
        },
        methods: {
            changeBgColor(action, time) {
                setTimeout(() => {
                    this.arrow && this.$el.classList[action]('vt-cell--access')
                }, time)
            }
        }
    }
</script>
