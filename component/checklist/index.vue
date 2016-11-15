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
        data() {
            return {
                val: this.value
            }
        },
        methods: {
            changeBgColor(action, time, e) {
                setTimeout(() => {
                    e.target.parentNode.classList[action]('vt-checklist__list--access')
                }, time)
            }
        },
        watch: {
            val(value) {
                this.$emit('input', value)
            }
        }
    }
</script>
