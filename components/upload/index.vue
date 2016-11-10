<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
    const isSameFile = (file1, file2) => {
        return file1.name == file2.name &&
          file1.size == file2.size &&
          file1.type == file2.type
    }

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
        data(){
            return {
                src: ''
            }
        },
        methods: {
            change(e){
                let fd = new FormData()
                  , file = e.target.files[0]
                  , flag = false

                if (!file) {
                    return
                }
                if(isImage(file)){
                }
                this.$emit('change', e)

                var vm = this
                flag = true
                fd.append(vm.name, file)

                flag && vm.$http.post(vm.url, fd, {
                    progress: args => {
                        vm.$emit('progress', args)
                    }
                }).then(response => {
                    e.target.value = ''
                    vm.$emit('upload', response)
                    flag = false
                }).catch(err => {
                    e.target.value = ''
                    vm.$emit('upload', err)
                    flag = false
                })

            }
        }
    }
</script>
