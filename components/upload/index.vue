<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
  import vue from 'vue'
  import vueResource from 'vue-resource'
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
        let
          fd = new FormData()
          , file = e.target.files[0]
          , len = files.length

        if(!file){
          return
        }
        this.$emit('change', e)

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
