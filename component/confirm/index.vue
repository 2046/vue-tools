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
                cancelAccess: false,
                confirmAccess: false
            }
        },
        methods: {
            confirmHandle(time) {
                setTimeout(() => {
                    this.confirmAccess = !this.confirmAccess
                }, time)
            },
            cancelHandle(time) {
                setTimeout(() => {
                    this.cancelAccess = !this.cancelAccess
                }, time)
            }
        }
    }
</script>
