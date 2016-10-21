<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
    let count = 0
    let instances = {}

    export default {
        props: {
            visible: Boolean,
            type: {
                type: String
            },
            time: {
                type: [Number, String],
                default: 2000
            },
            text: {
                type: String
            }
        },
        data() {
            return {
                uuid: 0,
                timerId: 0
            }
        },
        watch: {
            visible(val) {
                if(val) {
                    for(let item of [...document.querySelectorAll('.toast')]) {
                        let instance = instances[item.dataset.uuid]

                        if(instance && instance.visible && instance !== this) {
                            instance.$emit('hide')
                            clearTimeout(instance.timerId)
                        }
                    }

                    instances[this.uuid = `toast${++count}`] = this
                    this.timerId = setTimeout(this.$emit.bind(this, 'hide'), Number(this.time))
                }else {
                    this.$emit('hide')
                    clearTimeout(this.timerId)
                    delete instances[this.uuid]
                }
            }
        }
    }
</script>
