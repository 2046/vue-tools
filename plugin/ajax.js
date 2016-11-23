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
        errorCallback(message) { alert(message) }
    }, opts)

    Vue.use(resource)
    Vue.http.options.root = opts.root
    Vue.http.options.credentials = true
    Vue.http.headers.common = opts.headers
    Vue.http.options.timeout = opts.timeout
    Vue.http.options.duration = opts.duration

    Vue.http.interceptors.push((request, next) => {
        let before, time, timeout

        time = request.timeout
        before = request.before

        delete request.timeout

        request.before = function(request) {
            if(before) {
                before.call(this, request)
            }

            timeout = setTimeout(() => {
                request.abort()

                next(request.respondWith(request.body, {
                    status: 0,
                    statusText: ''
                }))
            }, time)
        }

        next((response) => {
            clearTimeout(timeout)
        })
    })

    Vue.http.interceptors.push((request, next) => {
        if(request.duration === 0) {
            next()
        }else {
            let timeout = setTimeout(() => {
                Vue.loading && Vue.loading(true)
            }, request.duration)

            next((response) => {
                clearTimeout(timeout)
                Vue.loading && Vue.loading(false)
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
        let uid = ''

        if(request.method.toLowerCase() === 'get') {
            uid = `${request.method.toLowerCase()}${request.url}${request.params ? JSON.stringify(request.params) : ''}`
        }

        if(request.method.toLowerCase() === 'post'){
            uid = `${request.method.toLowerCase()}${request.url}${request.data ? JSON.stringify(request.data) : ''}`
        }

        if (CACHE.indexOf(uid) === -1) {
            CACHE.push(uid)

            next((response) => {
                CACHE.splice(CACHE.indexOf(uid), 1)
            })
        }else{
            next(request.respondWith(request.body, {
                status: 0,
                statusText: 'repeat request'
            }))
        }
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
                return new Vue.Promise(opts.errorCallback.bind(null, 'Network error'))
            }

            if(response.status === 0 && response.statusText === 'repeat request') {
                return new Vue.Promise(() => console.error('The last request was in the pending state, not to send multiple requests'))
            }

            if(response.status === 404) {
                return new Vue.Promise(opts.errorCallback.bind(null, 'not found'))
            }

            if(response.status === 500) {
                return new Vue.Promise(opts.errorCallback.bind(null, response.statusText))
            }
        })
    })
}

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(plugin)
}

module.exports = plugin
