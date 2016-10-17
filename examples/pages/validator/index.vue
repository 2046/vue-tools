<style>
    .fields{
        border-top: 1px solid #D9D9D9;
        background-color: #fff;
    }
    .fields .field{
        position: relative;
        display: flex;
        padding: 20px 30px;
        color: #000;
        font-size: 34px;
        line-height: 1.41176471;
        align-items: center;
    }
    .fields .field label{
        width: 105px;
        word-break: break-all;
        word-wrap: break-word;
    }
    .fields .field input{
        width: 100%;
    }
</style>
<template src="./template.html"></template>

<script>
    import Validator from 'components/validator'

    export default {
        data() {
            return {
                text: ''
            }
        },
        methods: {
            done() {
                console.log(this.text)
            }
        },
        components: {
            Validator
        }
    }
</script>
