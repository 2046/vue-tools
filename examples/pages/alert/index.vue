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
            title:"test",
            text:"dkajsdhkajshdk"
        }
    },
    methods: {
        show() {
            this.visible = !this.visible;
        }
    }
}
</script>
