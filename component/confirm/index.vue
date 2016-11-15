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
            buttonOkText: {
                type: String,
                default: '确定'
            },
            buttonCancelText: {
                type: String,
                default: '取消'
            }
        },
        methods: {
            changeBgColor(action, time, e) {
                setTimeout(() => {
                    e.target.classList[action]('vt-confirm-button--access')
                }, time)
            }
        }
    }
</script>
