<style scoped>
    .example{
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    button{
        width: 688px;
        height: 86px;
        color: #fff;
        font-size: 36px;
        line-height: 80px;
        text-align: center;
        margin-bottom: 20px;
        outline: 0 none;
        border-radius: 5px;
        background-color: #09bb07;
        border: 1px solid #029400; /*no*/
    }
    button:last-child{
        margin-bottom: 0;
    }
    .popup__content{
        height: 400px;
        color: #000;
        font-size: 36px;
        line-height: 72px;
        text-align: center;
        background-color: #fff;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
    }
    .popup__content--full{
        height: 100%;
    }
    .popup__content p{
        border-bottom: 1px solid #dcdcdc;
    }
</style>
<template src="./template.html"></template>

<script>
    export default {
        data() {
            return {
                visiblePopup: false,
                visibleFullPopup: false
            }
        },
        methods: {
            hideFullPopup() {
                this.visibleFullPopup = false
            }
        }
    }
</script>
