let rules = {}

addRule('mobile', /^1\d{10}$/, '{{name}}的格式不正确')
addRule('email', /^\s*([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,20})\s*$/, '{{name}}的格式不正确')
addRule('url', /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, '{{name}}的格式不正确')
addRule('date', /^\d{4}\-[01]?\d\-[0-3]?\d$|^[01]\d\/[0-3]\d\/\d{4}$|^\d{4}年[01]?\d月[0-3]?\d[日号]$/, '{{name}}的格式不正确')
addRule('number', /^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$|^0$/, '{{name}}的格式不正确')

addRule('required', (val, element, rule, ctx) => {
    switch (element.type) {
        case 'radio':
        case 'checkbox':
            return Boolean(val)
        default:
            return Boolean(trim(val))
    }
}, '请输入{{name}}')

addRule('min', (val, element, rule, ctx) => {
    return Number(val) >= Number(ctx[rule])
}, '{{name}}必须大于或等于{{min}}')

addRule('max', (val, element, rule, ctx) => {
    return Number(val) <= Number(ctx[rule])
}, '{{name}}必须小于或等于{{max}}')

addRule('minlength', (val, element, rule, ctx) => {
    return (val || '').toString().length >= Number(ctx[rule])
}, '{{name}}的长度必须大于或等于{{minlength}}')

addRule('maxlength', (val, element, rule, ctx) => {
    return (val || '').toString().length <= Number(ctx[rule])
}, '{{name}}的长度必须小于或等于{{maxlength}}')

function addRule(name, operator, message) {
    if(rules[name]){
        console.error('Rule already exists')
        return
    }

    if (operator instanceof RegExp) {
        rules[name] = [(val, element, rule, ctx) => {
            return operator.test(val)
        }, message]
    } else if (isFunction(operator)) {
        rules[name] = [(val, element, rule, ctx) => {
            return operator.call(null, val, element, rule, ctx)
        }, message]
    }
}

function getRule(name){
    return rules[name] ? rules[name][0] : null
}

function trim(val) {
    return (val || '').toString().trim()
}

function isFunction(val) {
    return Object.prototype.toString.call(val) === '[object Function]'
}

export {
    rules,
    getRule,
    addRule
}
