let app, ua

ua = window.navigator.userAgent

if (ua.match(/Weibo/i)) {
    app = {
        name: 'Weibo',
        isWeibo: true
    }
} else if (ua.match(/MicroMessenger/i)) {
    app = {
        name: 'Weixin',
        isWeixin: true
    }
}

if (!app) {
    app = {
        name: 'unknown',
        isWeibo: false,
        isWeixin: false
    }
}

export default app
