<style src="./style.css" scoped></style>

<template>
    <input type="checkbox" v-model="val" @change="$emit('change', val)">
</template>

<script>
    export default {
        props: {
            value: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return { val: this.value }
        },
        watch: {
            val(value) {
                this.$emit('input', value)
            }
        }
    }
</script>
