<style scoped>
    .header {
        height: 88px;
        font-size: 36px;
        line-height: 88px;
        text-align: center;
        background-color: red;
    }
    .main {
        display: flex;
        height: 100%;
        font-size: 36px;
        text-align: center;
        align-items: center;
        justify-content: center;
        background-color: yellow;
    }
    .footer {
        height: 88px;
        font-size: 36px;
        line-height: 88px;
        text-align: center;
        background-color: blue;
    }
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>

<template src="./template.html"></template>

<script>
    import Layout from 'components/layout'

    export default {
        components: {
            Layout
        }
    }
</script>
