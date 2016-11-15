<style scoped>
    .progress {
        position: relative;
        display: flex;
        align-items: center;
    }

    .progress__content {
        width: 100%;
        background-color: #e6e6e6;
    }

    .progress__progress {
        height: 100%;
        background-color: #26a2ff;
    }
</style>
<template>
    <div class="progress">
        <slot class="progress__start" name="start"></slot>
        <div class="progress__content" :style="{height: barHeight + 'px'}">
            <div class="progress__progress" :style="{width: value + '%'}"></div>
        </div>
        <slot class="progress__end" name="end"></slot>
    </div>
</template>
<script>
    export default {
        props: {
            barHeight: {
                type: Number,
                default: 5
            },
            value: {
                type: [Number, String],
                required: true
            }
        },
        methods: {}
    }
</script>
