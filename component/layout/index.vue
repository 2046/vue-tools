<style>
    .vt-wrap{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
    }
    .vt-main{
        position: relative;
        flex: 1;
        height: 100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
    .vt-main::-webkit-scrollbar{
        display: none;
    }
</style>

<template>
    <div class="vt-wrap">
        <slot name="header"></slot>
        <main class="vt-main"><slot></slot></main>
        <slot name="footer"></slot>
        <slot name="overlay"></slot>
    </div>
</template>
