let resource, CACHE

resource = require('vue-resource')

CACHE = []

function plugin(Vue, opts) {
    if(plugin.installed) {
        return
    }

    opts = Object.assign({}, {
        headers: {},
        timeout: 10000,
        duration: 1000,
        errorCallback(message) {alert(message)}
    }, opts)

    Vue.use(resource)
    Vue.http.options.root = opts.root
    Vue.http.options.credentials = true
    Vue.http.headers.common = opts.headers
    Vue.http.options.timeout = opts.timeout
    Vue.http.options.duration = opts.duration

    Vue.http.interceptors.push((request, next) => {
        let before, timeout

        before = request.before
        timeout = request.timeout

        delete request.timeout

        request.before = function(request) {
            if(before) {
                before.call(this, request)
            }

            request.timerId = setTimeout(() => {
                request.abort()
                delete request.timerId
                opts.errorCallback('Network error')
            }, timeout)
        }

        next((response) => {
            clearTimeout(request.timerId)
            delete request.timerId
        })
    })

    Vue.http.interceptors.push((request, next) => {
        if(request.duration === 0) {
            next()
        }else {
            request.loadingTimerId = setTimeout(() => {
                Vue.loading && Vue.loading(true)
                delete request.loadingTimerId
            }, request.duration)

            next((response) => {
                Vue.loading && Vue.loading(false)
                clearTimeout(request.loadingTimerId)
                delete request.loadingTimerId
            })
        }
    })

    Vue.http.interceptors.push((request, next) => {
        if(request.method.toLowerCase() === 'get') {
            request.url = `${request.url}${request.url.indexOf('?') < 0 ? '?' : '&'}t=${Date.now()}`
        }

        if(request.method.toLowerCase() === 'post'){
            request.emulateJSON = true
        }

        next()
    })

    Vue.http.interceptors.push((request, next) => {
        let uid = `${request.method.toLowerCase()}${request.url}${request.data ? JSON.stringify(request.data) : ''}`

        if (CACHE.indexOf(uid) < 0) {
            CACHE.push(uid)
        }else{
            next(request.respondWith(request.body, {
                status: 0,
                statusText: 'repeat request'
            }))
            return
        }

        next((response) => {
            CACHE.splice(CACHE.indexOf(uid), 1)
        })
    })

    Vue.http.interceptors.push((request, next) => {
        next((response) => {
            if(response.data) {
                response.message = response.data.message
                response.code = response.data.status
                response.data = response.data.data
            }
        })
    })

    Vue.http.interceptors.push((request, next) => {
        next((response) => {
            if(response.status === 0 && response.statusText === '') {
                opts.errorCallback('Network error')
            }

            if(response.status === 0 && response.statusText === 'repeat request') {
                console.error('The last request was in the pending state, not to send multiple requests')
                return new Vue.Promise(() => {})
            }

            if(response.status === 404) {
                return new Vue.Promise(() => {
                    opts.errorCallback('not found')
                })
            }

            if(response.status === 500) {
                return new Vue.Promise(() => {
                    opts.errorCallback(response.statusText)
                })
            }
        })
    })
}

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(plugin)
}

module.exports = plugin
