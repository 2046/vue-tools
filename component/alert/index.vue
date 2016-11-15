<style src="./style.css"></style>
<template src="./template.html"></template>

<script>
    export default {
        props: {
            text: String,
            title: {
                type: String,
                required: true
            },
            visible: {
                type: Boolean,
                required: true
            },
            buttonText: {
                type: String,
                default: '确定'
            }
        },
        methods: {
            changeBgColor(action, time, e) {
                setTimeout(() => {
                    e.target.classList[action]('alert__button--access')
                }, time)
            }
        }
    }
</script>
