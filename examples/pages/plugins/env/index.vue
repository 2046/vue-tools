<template src="./template.html"></template>

<script>
    import Vue from 'vue'
    import env from 'plugins/env'
    import Cell from 'components/cell'

    Vue.use(env)

    export default {
        components: {
            Cell
        }
    }
</script>
