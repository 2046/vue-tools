<style src="./style.css"></style>
<template src="./template.html"></template>

<script>
    export default {
        props: {
            visible: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                access: false
            }
        },
        methods: {
            handle(time) {
                setTimeout(() => {
                    this.access = !this.access
                }, time)
            }
        }
    }
</script>
