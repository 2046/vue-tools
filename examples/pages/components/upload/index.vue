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
    <Upload :url="url" :name="name" @changeHandler="change" @uploadHandler="upload"></Upload>
  </div>
</template>


<script type="text/javascript">
  import Upload from 'components/upload'

  export default {
    data() {
      return {
        url: 'http://192.168.22.118:8088/api/upload',
        name: 'file'
      }
    },
    components: {
      Upload
    },
    methods: {
      upload(args){
        console.log('upload', args)
      },
      change(args){
        console.log('change', args)
      }
    }
  }
</script>
