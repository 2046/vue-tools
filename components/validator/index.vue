<style scoped>
    .validator{
        display: inline-block;
        flex: 1;
    }
</style>

<template>
    <div class="validator" :data-uuid="uuid">
        <slot></slot>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { refs, definition } from './directive'
    import { rules, getRule, addRule } from './rule'

    Vue.directive('submit', definition)

    export default {
        props: {
            name: {
                type: String,
                required: true
            },
            model: {
                type: null,
                required: true
            },
            errorHandle: {
                type: Function,
                default(message, rule, name, element, val) {
                    this.$alert ? this.$alert(message) : alert(message)
                }
            },
            rule: String,
            required: Boolean,
            min: [Number, String],
            max: [Number, String],
            minlength: [Number, String],
            maxlength: [Number, String]
        },
        data() {
            return {
                uuid: null,
                element: null
            }
        },
        computed: {
            tasks() {
                let rule = [].concat(this.required ? 'required' : [])

                rule = rule.concat(this.min ? 'min': [])
                rule = rule.concat(this.max ? 'max': [])
                rule = rule.concat(this.minlength ? 'minlength': [])
                rule = rule.concat(this.maxlength ? 'maxlength': [])
                rule = rule.concat(this.rule || [])

                return rule
            }
        },
        methods: {
            execute() {
                for(let rule of this.tasks){
                    if(rules[rule] && !rules[rule][0](this.model, this.element, rule, this)){
                        this.showMessage(this.model, this.element, rule, this.name, this)
                        return false
                    }
                }

                return true
            },
            showMessage(val, element, rule, name, ctx) {
                let message = rules[rule][1].replace('{{name}}', name)

                if(this[rule]){
                    message = message.replace(`{{${rule}}}`, this[rule])
                }

                this.errorHandle(message, rule, name, element, val)
            }
        },
        mounted() {
            if(!getElementByForm(this.$el)) {
                console.error('Validator component must within the form element')
                return
            }

            if(!(this.element = getElementByInput(this.$el))) {
                console.error('Validator component must contain the input element')
                return
            }

            refs[this.uuid = guid()] = this

            this.$nextTick(function () {
                let parentNode = this.$el.parentNode;
                let children = this.$el.children;
                let className = this.$el.className.split(' ');
                let dataUuid = this.$el.dataset.uuid;
                if(children.length !== 1){
                    console.error('Component template should contain exactly one root element')
                    return;
                }
                children[0].dataset.uuid = dataUuid;
                for (var i = 0; i < className.length; i++) {
                    children[0].classList.add(className[i])
                }
                parentNode.appendChild(children[0])
                parentNode.removeChild(this.$el)

            })
        },
        destroyed() {
            delete refs[this.uuid]
        },
        getRule,
        addRule
    }

    function getElementByForm(el) {
        if(!el.tagName) {
            return null
        }

        if(el.tagName === 'FORM') {
            return el
        }

        return getElementByForm(el.parentNode)
    }

    function getElementByInput(el) {
        return getElementsByTagName(el, 'input') || getElementsByTagName(el, 'select') || getElementsByTagName(el, 'textarea')
    }

    function getElementsByTagName(el, selector) {
        return [...el.getElementsByTagName(selector)][0]
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
        }

        return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
    }
</script>
