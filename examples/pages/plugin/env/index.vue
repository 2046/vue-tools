<template src="./template.html"></template>

<script>
    import Vue from 'vue'
    import env from 'plugin/env'
    import Cell from 'component/cell'

    Vue.use(env)

    export default {
        components: {
            Cell
        }
    }
</script>
