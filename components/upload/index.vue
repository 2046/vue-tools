<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
  import vue from 'vue'
  import vueResource from 'vue-resource'
  import { isSameFile } from './utils'
  vue.use(vueResource)

  export default {
    props: {
      url: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    methods: {
      change(e){
        let cache = []
          , files = e.target.files
          , fd = new FormData()
          , file
          , len = files.length
        if(len == 0){
          return
        }

        this.$emit('changeHandler', e)
        if (len == 1) {
          file = files[0]
          // TODO: compress image
          fd.append(this.name, file)
        }

        this.$http.post(this.url, fd).then(response => {
          e.target.value = ''
          this.$emit('uploadHandler', response)
        }).catch(err => {
          e.target.value = ''
          this.$emit('uploadHandler', err)
        })
      }
    }
  }
</script>
