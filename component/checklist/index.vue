<style src="./style.css"></style>
<template src="./template.html"></template>

<script>
    export default {
        props: {
            value: {
                type: String,
                required: true
            },
            options: {
                type: Array,
                required: true
            }
        },
        methods: {
            changeBgColor(action, time, e) {
                setTimeout(() => {
                    e.target.parentNode.classList[action]('vt-checklist__list--access')
                }, time)
            }
        },
        computed: {
            val: {
                get(){
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                }
            }
        }
    }
</script>
