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
        computed: {
            val: {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                }
            }
        }
    }
</script>