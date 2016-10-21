<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
    export default {
        props: {
            text: String,
            title: String,
            visible: Boolean,
            buttonOkText: {
                type: String,
                default: '确定'
            },
            buttonCancelText: {
                type: String,
                default: '取消'
            }
        }
    }
</script>
