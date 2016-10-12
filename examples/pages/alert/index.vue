<style scoped>
    .button{
        height: 100px;
        width: 200px;
    }
</style>

<template src="./template.html"></template>

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
        show() {
            this.visible = true;
        },
        hide() {
            this.visible = false;
        }
    }
}
</script>
