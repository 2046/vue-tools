<style scoped>
    .box{
        padding-top: 400px;
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
</style>

<template>
    <div class="box">
        <div class="button" @click="visibleAlert = true">Show Alert Dialog</div>
        <div class="button" @click="visibleMessageAlert = true">Show Message Aler Dialog</div>

        <Alert :visible="visibleAlert" title="Example" @hide="visibleAlert = false"></Alert>
        <Alert :visible="visibleMessageAlert" title="Example" text="Example text cjahsdkajshdkajshdkajshdkajshdkajshdkajhsdlkajsldkjalsdkjalskdjlsakjdlaksjdlsakj" @hide="visibleMessageAlert = false"></Alert>
    </div>
</template>


<script type="text/javascript">
export default {
    data() {
        return {
            visibleAlert: false,
            visibleMessageAlert: false
        }
    }
}
</script>
