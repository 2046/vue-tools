function plugin(Vue, opts = {}) {
    if(plugin.installed){
        return
    }

    if(!opts.url) {
        console.error('Configure the url parameter to inject the wechat js sdk configuration information')
        return
    }

    let weixin, jssdk

    weixin = {}
    jssdk = 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js'

    getScript(jssdk, () => {
        let url, apis, exclude

        exclude = ['config', 'ready', 'error', 'checkJsApi']
        apis = Object.keys(window.wx).filter((item) => exclude.indexOf(item) === -1)
        url = `${opts.url}${opts.url.indexOf('?') < 0 ? '?' : '&'}url=${encodeURIComponent(location.href)}`

        getJSONP(url, (res) => {
            window.wx.config(Object.assign({}, res.data, {
                debug: false,
                jsApiList: apis
            }))

            window.wx.error((res) => alert(JSON.stringify(res)))
        })

        apis.map((item) => {
            weixin[item] = (options) => {
                window.wx.ready(() => {
                    window.wx[item](options)
                })
            }
        })
    })

    Vue.wx = weixin
    Vue.prototype.$wx = weixin
}

function getScript(url, callback) {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = url

    scriptOnload(script, callback)

    setTimeout(() => {
        let element = document.getElementsByTagName('script')[0]
        element.parentNode.insertBefore(script, element)
    }, 0)

    return script
}

function getJSONP(url, callback) {
    let script, callbackName

    script = document.createElement('script')
    callbackName = `jsonpCallback${Math.round(10000 * Math.random())}${Math.round(10000 * Math.random())}`

    window[callbackName] = function(data) {
        clear()
        callback && callback(data)
    }

    script.id = callbackName
    script.addEventListener('error', clear)
    script.src = `${url}${url.indexOf('?') < 0 ? '?' : '&'}callback=${callbackName}`
    document.getElementsByTagName('head')[0].appendChild(script)

    function clear() {
        delete window[callbackName]
        let element = document.getElementById(callbackName)
        element.parentNode.removeChild(element)
    }
}

function scriptOnload(el, fn) {
    if(el.addEventListener) {
        el.addEventListener('load', (_, e) => {
            fn(null, e)
        }, false)

        el.addEventListener('error', (e) => {
            let err = new Error(`script error ${el.src}`)
            err.event = e
            fn(err)
        }, false)
    }else {
        el.attachEvent('onreadystatechange', (e) => {
            if (!/complete|loaded/.test(el.readyState)) {
                return
            }

            fn(null, e)
        })

        el.attachEvent('onerror', (e) => {
            let err = new Error(`failed to load the script ${el.src}`)
            err.event = e || window.event
            fn(err)
        })
    }
}

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(plugin)
}

module.exports = plugin
