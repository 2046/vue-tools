<style src="./style.css" scoped></style>
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
        }
    }
</script>
