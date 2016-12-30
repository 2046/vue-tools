<style src="./style.css"></style>
<template src="./template.html"></template>

<script>
    export default {
        props: {
            visible: {
                type: Boolean,
                required: true
            },
            text: {
                type: String,
                default: '数据加载中'
            }
        }
    }
</script>
