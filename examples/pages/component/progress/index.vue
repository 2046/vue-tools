<style scoped>
    .box{
        padding-top:400px;
    }
    .box__item{
        margin-bottom: 20px;
    }
    .button{
        width:80%;
        padding:20px 0;
        font-size:30px;
        margin:20px auto;
        display: block;
        border-radius:5px;
        background-color:#26a2ff;
        color:#fff;
        border:0;
    }
</style>
<template>
    <div class="box">
        <Progress class="box__item" value="20">
            <div slot="start">0%</div>
            <div slot="end">100%</div>
        </Progress>

        <Progress :value="value" :bar-height="10">
        </Progress>
        <input type="button" @touchstart="run" value="上传" class="button">
    </div>
</template>
<script>
    import Vue from 'vue'
    import toast from 'plugin/toast'
    import Progress from 'component/progress'
    Vue.use(toast)

    export default {
        data(){
            return {
                value: 0
            }
        },
        methods: {
            run(){
                this.circle(() => {
                    this.$toast('success', '上传成功')
                })
            },
            circle(done){
                setTimeout(() => {
                    if(this.value == 100){
                       done()
                    } else {
                        this.value++
                        this.circle(done)
                    }
                }, 20)
            }
        },
        components: {
            Progress
        }
    }
</script>
