<template>
    <input type="file" @change="change($event)"/>
</template>

<script>
    import Vue from 'vue'
    import Imager from 'Imager'

    export default {
        props: {
            url: {
                type: String
            },
            name: {
                type: String,
                default: 'file'
            },
            compress: {
                type: Boolean
            },
            base64: {
                type: Boolean
            }
        },
        methods: {
            change(e){
                let file, image

                file = e.target.files[0]

                if(!file) {
                    return
                }
                this.$emit('change', e)

                if(Imager.isImage(file) && this.compress) {
                    image = new Imager({
                        file: file,
                        quality: 0.8
                    })
                    image.getExif().then(data => {
                        return image.loaded()
                    }).then(base64 => {
                        if(this.base64) {
                            this.upload(base64)
                        } else {
                            this.upload(Imager.base64ToFile(base64, file.name))
                        }
                    })
                } else {
                    this.upload(file)
                }

            },
            upload(file){
                if(this.url) {
                    let fd = new FormData()
                    fd.append(this.name, file)
                    Vue.http.post(this.url, fd, {
                        progress: e => {
                            this.$emit('progress', e)
                        }
                    }).then(response => {
                        console.log(response)
                        this.$emit('upload', response)
                    }).catch(response => {
                        this.$emit('upload', response)
                    })
                } else {
                    this.$emit('upload', file)
                    this.$emit('progress', function() {
                        console.warn('if url was not input, progress not work')
                    })
                }
            }
        }
    }
</script>
