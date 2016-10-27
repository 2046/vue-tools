function plugin(Vue, opts) {
    if(plugin.installed){
        return
    }

    if(!window.wx) {
        console.error('Please load the wechat js sdk, <script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"><\/script>')
        return
    }

    let apis, url, weixin

    weixin = {}
    opts = Object.assign({}, { url: '' }, opts)
    url = `${opts.url}${opts.url.indexOf('?') < 0 ? '?' : '&'}url=${encodeURIComponent(location.href)}`
    apis = Object.keys(window.wx).filter((item) => ['config', 'ready', 'error', 'checkJsApi'].indexOf(item) === -1)

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

    Vue.wx = weixin
    Vue.prototype.$wx = weixin
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

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(plugin)
}

module.exports = plugin
