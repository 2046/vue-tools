<style scoped>
    .box {
        padding-top: 400px;
    }
    .box__content {
        padding:30px 15px;
        text-align: center;
        line-height: 30px;
        font-size: 30px;
    }
    .button{
        width: 688px;
        height: 86px;
        color: #fff;
        font-size: 36px;
        line-height: 80px;
        text-align: center;
        margin: 20px auto;
        outline: 0 none;
        border-radius: 5px;
        background-color: #09bb07;
        border: 1px solid #029400; /*no*/
    }
    .buttonBox{
        text-align: center;
    }
    .buttonBox__closeButton{
        display: block;
        height: 100px;
        color: #00c200;
        font-size: 36px;
        line-height: 100px;
        text-align: center;
        border-top: 1px solid #d5d5d6; /*no*/
    }
</style>

<template>
    <div class="box">
        <div class="button" @click="visibleDialog = true">Show Modal</div>

        <Modal :visible="visibleDialog">
            <p class="box__content">Example</p>
            <p class="buttonBox">
                <a href="javascript:;" class="buttonBox__closeButton" @click="visibleDialog = false">关闭</a>
            </p>
        </Modal>
    </div>
</template>


<script type="text/javascript">
    import Modal from 'components/modal'

    export default {
        data() {
            return {
                visibleDialog: false,
            }
        },
        components: {
            Modal
        }
    }
</script>
