<style scoped>
    .example {
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .cells,
    .cell {
        width: 100%;
    }
</style>
<template src="./template.html"></template>

<script>
    import Cell from 'component/cell'
    import Switchs from 'component/switch'

    export default {
        data() {
            return {
                enable: true,
                enable2: false
            }
        },
        components: {
            Cell,
            Switchs
        }
    }
</script>
