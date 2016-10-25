<style scoped>
    .example{
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
    }
    .grid{
        display: flex;
        flex-wrap: wrap;
        border-top: 1px solid #dcdcdc; /*no*/
    }
    .grid .item{
        display: flex;
        width: 187.5px;
        height: 187.5px;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #dcdcdc; /*no*/
        border-bottom: 1px solid #dcdcdc; /*no*/
        background-color: #fff;
    }
    .grid .item:nth-child(4n){
        border-right: 0;
    }
    .icon{
        width: 60px;
        height: 60px;
    }
</style>
<template src="./template.html"></template>

<script>
    import icons from './icons'
    import Icon from 'components/icon'

    Icon.add(icons)

    export default {
        components: {
            Icon
        }
    }
</script>
