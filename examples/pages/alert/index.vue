<style scoped>
    .button{
        height: 100px;
        width: 200px;
        background: rgba(0, 0, 0, 0.5);
        text-align: center;
        line-height: 100px;
        border-radius: 20px;
        color:#fff;
        margin: 50px auto;
        border:1px solid #d5d5d6;
    }
</style>
<template lang="html">
    <div>
        <div class="button" @click="show" data-type="alert">alert</div>
        <div class="button" @click="show" data-type="message">message</div>
        <alert :visible="visible" :title="title" :text="text" v-on:hide="hide"></alert>
    </div>
</template>


<script type="text/javascript">
export default {
    data(){
        return {
            visible:false,
            title:"提示",
            text:"Alert 测试成功"
        }
    },
    methods: {
        show(event) {
            let type = event.currentTarget.dataset.type;
            if(type === 'message'){
                this.title = '';
                this.text = "message 测试成功"
            }
            this.visible = true;
        },
        hide() {
            this.visible = false;
        }
    }
}
</script>
