<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
    export default {
        props: {
            isFull: Boolean,
            visible: {
                type: Boolean,
                required: true
            }
        }
    }
</script>
