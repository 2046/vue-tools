<style>
    .vt-progress {
        position: relative;
        display: flex;
        align-items: center;
    }

    .vt-progress__content {
        width: 100%;
        background-color: #e6e6e6;
    }

    .vt-progress__thumb {
        height: 100%;
        background-color: #26a2ff;
    }
</style>
<template>
    <div class="vt-progress">
        <slot class="vt-progress__start" name="start"></slot>
        <div class="vt-progress__content" :style="{height: barHeight + 'px'}">
            <div class="vt-progress__thumb" :style="{width: value + '%'}"></div>
        </div>
        <slot class="vt-progress__end" name="end"></slot>
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
