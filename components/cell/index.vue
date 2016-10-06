<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
    import Vue from 'vue'

    Vue.component('Cells', {
        template: '<div class="cells"><slot></slot></div>',
        mounted() {
            let $cells = this.$el.querySelectorAll('[data-hook="cell-component"]')

            $cells[0].classList.add('cell--first')
            $cells[$cells.length - 1].classList.add('cell--last')
        }
    })

    export default {
        props: {
            arrow: Boolean
        },
        methods: {
            changeBgColor(action, time) {
                setTimeout(() => {
                    this.arrow && this.$el.classList[action]('cell--access')
                }, time)
            }
        }
    }
</script>
