<template src="./template.html"></template>

<script>
    import CheckList from 'components/checklist'

    export default {
        data() {
            return {
                value: '中国银行',
                options: [
                    '中国银行', '招商银行', '建设银行', '农业银行', '工商银行',
                    '交通银行', '中信银行', '光大银行', '民生银行', '广发银行',
                    '上海浦东搜索发展银行', '中国人民银行', '兴业银行', '华夏银行',
                    '深圳发展银行', '中国邮政储蓄银行', '深圳平安搜索银行', '花旗中国银行',
                    '汇丰中国银行', '渣打中国银行', '瑞士银行', '美国运通银行'
                ]
            }
        },
        components: {
            CheckList
        }
    }
</script>
