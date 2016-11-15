const SPLIT_PATTERN = /\s+/

function Events() {}

Events.prototype = {
    on(eventNames, callback, ctx) {
        let cache, eventName

        if (callback) {
            cache = this.__events || (this.__events = {})
            eventNames = eventNames.split(SPLIT_PATTERN)

            while (eventName = eventNames.shift()) {
                (cache[eventName] || (cache[eventName] = [])).push(callback, ctx)
            }
        }

        return this
    },
    once(eventNames, callback, ctx) {
        let that = this

        function cb() {
            that.off(eventNames, cb)
            callback.apply(ctx || that, arguments)
        }

        return this.on(eventNames, cb, ctx)
    },
    off(eventNames, callback, ctx) {
        let index, cache, eventName, list

        if (cache = this.__events) {
            if (arguments.length === 0) {
                delete this.__events
            } else {
                eventNames = eventNames.split(SPLIT_PATTERN)

                while (eventName = eventNames.shift()) {
                    if (!(list = cache[eventName])) {
                        continue
                    }

                    if (!(callback || ctx)) {
                        delete cache[eventName]
                        continue
                    }

                    for (index = list.length - 2; index >= 0; index -= 2) {
                        if (callback && list[index] === callback || ctx && list[index + 1] === ctx) {
                            list.splice(index, 2)
                        }
                    }
                }
            }
        }

        return this
    },
    trigger(eventNames) {
        let index, len, list, args, returned, eventName, cache

        args = []
        returned = true

        if (!(cache = this.__events)) {
            return this
        }

        eventNames = eventNames.split(SPLIT_PATTERN)

        for (index = 1, len = arguments.length; index < len; index++) {
            args[index - 1] = arguments[index]
        }

        while (eventName = eventNames.shift()) {
            if (list = cache[eventName]) {
                returned = callEach(list.slice(), args, this) && returned
            }
        }

        return returned
    }
}

function callEach(list, args, ctx) {
    let i, len, a1, a2, a3, pass

    i = 0
    pass = true
    a1 = args[0]
    a2 = args[1]
    a3 = args[2]
    len = list.length

    switch (args.length) {
        case 0:
            for (; i < len; i += 2) {
                pass = list[i].call(list[i + 1] || ctx) !== false && pass
            }
            break
        case 1:
            for (; i < len; i += 2) {
                pass = list[i].call(list[i + 1] || ctx, a1) !== false && pass
            }
            break
        case 2:
            for (; i < len; i += 2) {
                pass = list[i].call(list[i + 1] || ctx, a1, a2) !== false && pass
            }
            break
        case 3:
            for (; i < len; i += 2) {
                pass = list[i].call(list[i + 1] || ctx, a1, a2, a3) !== false && pass
            }
            break
        default:
            for (; i < len; i += 2) {
                pass = list[i].apply(list[i + 1] || ctx, args) !== false && pass
            }
            break
    }

    return pass
}

let eventBus = new Events()

function plugin(Vue) {
    if (plugin.installed) {
        return
    }

    Vue.eventBus = eventBus
    Vue.prototype.$eventBus = eventBus
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
}

module.exports = plugin
