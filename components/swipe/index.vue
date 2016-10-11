<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
    import Swipe from './swipe'

    export default {
        props: {
            point: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                pointNum: []
            }
        },
        computed: {
            isPoint() {
                return this.point && this.pointNum.length !== 1
            }
        },
        mounted() {
            let items = (this.$slots.default || []).filter(item => item.elm.style)

            this.pointNum = items.map((item, index) => !index)
            items.map(item => item.elm.style.position = 'relative')

            new Swipe(this.$el, {
                continuous: items.length > 1,
                callback: function(index) {
                    if (items.length === 2) {
                        this.pointNum.splice(1, 1, !(index === 0 || index === 2))
                        this.pointNum.splice(0, 1, index === 0 || index === 2)
                    } else {
                        this.pointNum.splice(index - 1, 1, false)
                        this.pointNum.splice(index, 1, true)
                    }
                }.bind(this)
            })
        }
    }
</script>
