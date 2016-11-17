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
</style>
<template>
    <Layout>
        <div class="example">
            <button @click="showConfirm">Show Confirm Dialog</button>
            <button @click="showConfirmMessage">Show Confirm Message Dialog</button>
        </div>
    </Layout>
</template>

<script>
    import Vue from 'vue'
    import confirm from 'plugin/confirm'

    Vue.use(confirm)

    export default {
        methods: {
            showConfirm() {
                this.$confirm({
                    title: 'Example'
                })
            },
            showConfirmMessage() {
                this.$confirm({
                    title: 'Example',
                    text: 'Example text',
                    confirmButton: 'ok',
                    cancelButton: 'cancel',
                    hide(bool) {
                        console.log('hide', bool)
                    }
                })
            }
        }
    }
</script>
