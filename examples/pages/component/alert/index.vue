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
            <div class="button" @click="visibleAlert = true">Show Alert Dialog</div>
            <div class="button" @click="visibleMessageAlert = true">Show Message Alert Dialog</div>

            <Alert :visible="visibleAlert" @hide="visibleAlert = false">
                <p slot="title">Example</p>
            </Alert>
            <Alert :visible="visibleMessageAlert" @hide="visibleMessageAlert = false">
                <p slot="title">Example</p>
                <p slot="text">Example text</p>
                <p slot="button">OK</p>
            </Alert>
        </div>
    </Layout>
</template>


<script type="text/javascript">
    import Alert from 'component/alert'

    export default {
        data() {
            return {
                visibleAlert: false,
                visibleMessageAlert: false
            }
        },
        components: {
            Alert
        }
    }
</script>
