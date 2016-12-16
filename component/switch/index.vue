<style src="./style.css"></style>

<template>
    <input type="checkbox" class="vt-checkbox" v-model="val" @change="$emit('change', val)">
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
        updated() {
            this.val = this.value
        },
        watch: {
            val(value) {
                this.$emit('input', value)
            }
        }
    }
</script>
