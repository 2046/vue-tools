'use strict';

var app = void 0,
    ua = void 0;

ua = window.navigator.userAgent;

if (ua.match(/Weibo/i)) {
    app = {
        name: 'Weibo',
        isWeibo: true
    };
} else if (ua.match(/MicroMessenger/i)) {
    app = {
        name: 'Weixin',
        isWeixin: true
    };
}

if (!app) {
    app = {
        name: 'unknown',
        isWeibo: false,
        isWeixin: false
    };
}

module.exports = app;