<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
    export default {
        props: {
            text: String,
            title: String,
            visible: Boolean,
            buttonText: {
                type: String,
                default: '确定'
            }
        }
    }
</script>
