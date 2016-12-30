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
                        return {
                            rule: rule,
                            name: this.name,
                            value: this.model,
                            element: this.element,
                            message: this.getMessage(rule, this.name)
                        }
                    }
                }

                return true
            },
            getMessage(rule, name) {
                let message = rules[rule][1].replace('{{name}}', name)

                if(this[rule]){
                    message = message.replace(`{{${rule}}}`, this[rule])
                }

                return message
            }
        },
        render(h) {
            let children = this.$slots.default

            if(!children) {
                console.error('Validator component must contain the input element')
                return
            }

            if(children.length !== 1) {
                console.error('Validator component template should contain exactly one root element')
                return
            }

            return children[0]
        },
        mounted() {
            if(this.$el.nodeType === 8) {
                return
            }

            if(!getElementByForm(this.$el)) {
                console.error('Validator component must within the form element')
                return
            }

            if(!(this.element = getElementByInput(this.$el))) {
                console.error('Validator component must contain the input element')
                return
            }

            refs[this.uuid = guid()] = this
            this.$el.dataset.uuid = this.uuid
            this.$el.dataset.key = 'validator'
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

        if(el.tagName.toUpperCase() === 'FORM') {
            return el
        }

        return getElementByForm(el.parentNode)
    }

    function getElementByInput(el) {
        if(!el.tagName) {
            return null
        }

        if(el.tagName.toUpperCase() === 'INPUT' || el.tagName.toUpperCase() === 'SELECT' || el.tagName.toUpperCase() === 'TEXTAREA') {
            return el
        }

        return getElementByInput(el.children[0])
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
        }

        return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
    }
</script>
