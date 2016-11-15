<style>
    .fields{
        background-color: #fff;
    }
    .fields .field{
        position: relative;
        display: flex;
        padding: 20px 30px;
        color: #000;
        font-size: 30px;
        line-height: 1.41176471;
        align-items: center;
        border-bottom: 1px solid #D9D9D9;
    }
    .fields .field label{
        width: 105px;
        word-break: break-all;
        word-wrap: break-word;
    }
    .fields .field input{
        width: 100%;
    }
    input[type="submit"]{
        width: 100%;
        height: 86px;
        color: #fff;
        font-size: 36px;
        line-height: 80px;
        text-align: center;
        margin-bottom: 20px;
        outline: 0 none;
        border: 0 none;
        background-color: #09bb07;
    }
    .fields .field input[type="checkbox"],
    .fields .field input[type="radio"]{
        width: auto;
    }
    select{
        width: 100%;
    }
</style>
<template src="./template.html"></template>

<script>
    import Validator from 'component/validator'

    export default {
        data() {
            return {
                tel: '',
                url: '',
                date: '',
                text: '',
                radio: '',
                email: '',
                number: '',
                select: '请选择',
                textarea: '',
                password: '',
                checkbox: []
            }
        },
        methods: {
            done(err, event) {
                if(err) {
                    alert(err.message)
                    return
                }

                alert('验证通过')
            }
        },
        components: {
            Validator
        }
    }
</script>
