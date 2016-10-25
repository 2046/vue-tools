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
    <Layout>
        <div class="box">
            <div class="button" @click="visibleConfirm = true">Show Confirm</div>
            <div class="button" @click="visibleConfirm1 = true">Show Confirm text</div>

            <Confirm :visible="visibleConfirm" title="Example" @hide="hide"></Confirm>
            <Confirm :visible="visibleConfirm1" title="Example" text="confirm contont text" @hide="hide1"></Confirm>
        </div>
    </Layout>
</template>


<script type="text/javascript">
    import Confirm from 'components/confirm'

    export default {
        data() {
            return {
                visibleConfirm: false,
                visibleConfirm1: false,
            }
        },
        methods: {
            hide(val) {
                this.visibleConfirm = false
                console.log(val)
            },
            hide1(val) {
                this.visibleConfirm1 = false
                console.log(val+'1')
            }
        },
        components: {
            Confirm
        }
    }
</script>
