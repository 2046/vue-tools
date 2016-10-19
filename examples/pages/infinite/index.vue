<style scoped>
    p{
        color: #000;
        font-size: 36px;
        line-height: 72px;
        text-align: center;
        background-color: #fff;
        border-bottom: 1px solid #dcdcdc;
    }
</style>

<template src="./template.html"></template>

<script>
    import Infinite from 'components/infinite'

    let n = 1

    export default {
        data() {
            return {
                arr: gen(80),
                disabled: false
            }
        },
        methods: {
            loadMore() {
                this.disabled = false

                setTimeout(() => {
                    this.arr = [...this.arr, ...gen(20)]
                    this.disabled = true
                }, 2000)
            }
        },
        components: {
            Infinite
        }
    }

    function gen(max) {
        let arr = []

        for(let index = 1; index <= max; index++) {
            arr.push(n++)
        }

        return arr
    }
</script>
