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
        if (len == 0) {
          return
        }

        this.$emit('change', e)
        if (len == 1) {
          file = files[0]
          // TODO: compress image
          fd.append(this.name, file)
        }

        this.$http.post(this.url, fd, {
          progress: args => {
            this.$emit('progress', args)
          }
        }).then(response => {
          e.target.value = ''
          this.$emit('upload', response)
        }).catch(err => {
          e.target.value = ''
          this.$emit('upload', err)
        })
      }
    }
  }
</script>
