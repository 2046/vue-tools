<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>

    export default {
        props: {
            visible: {
                type: Boolean
            },
            onShow: {
                type: Function,
                default: function(){}
            },
            onHide: {
                type: Function,
                default: function(){}
            },
            title: {
                type: String
            },
            text: {
                type: String
            },
            buttonText: {
                type: String,
                default: '确定'
            }
        },

        methods: {
            hide: function() {
              this.$emit('hide')
            }
        },
        watch: {
            visible(val) {
                if(val){
                    this.onShow()
                    setTimeout(() => {this.$el.style.opacity = 1})
                }else{
                    this.onHide()
                    this.$el.style.opacity = 0
                }
            }
        }
    }
</script>
