<style scoped>
    .box {
        padding-top: 400px;
    }

    .button {
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
        <Upload url=""
                name="file"
                compress
                @change="change"
                @upload="upload"
                @progress="progress">
        </Upload>
        <br><img :src="src" alt="">

        <Upload compress
                base64
                @change="change2"
                @upload="upload2"></Upload>
        <br><img :src="src2" alt="">
    </div>
</template>


<script>
    import Upload from 'components/upload'

    export default {
        data() {
            return {
                src: '',
                src2: ''
            }
        },
        components: {
            Upload
        },
        methods: {
            upload(url){
                if(typeof url == 'object'){
                    console.log(url)
                } else {
                    this.src = url
                }
            },
            upload2(base64){
                this.src2 = base64
            },
            change(args){
            },
            change2(args){
            },
            progress(e){
                console.log('progress', e)
            }
        }
    }
</script>
