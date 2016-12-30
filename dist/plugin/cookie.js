'use strict';

var decode = void 0,
    encode = void 0,
    cookie = void 0;

decode = decodeURIComponent;
encode = encodeURIComponent;

cookie = {
    get: function get(key, opt) {
        opt = opt || {};
        validateCookieName(key);
        return (opt.converter || same)(parseCookieString(document.cookie, !opt.raw)[key]);
    },
    set: function set(key, val, opt) {
        var expires, domain, path, text, date;

        validateCookieName(key);

        opt = opt || {};
        path = opt.path;
        expires = opt.expires;
        domain = opt.domain;

        if (!opt.raw) {
            val = encode(String(val));
        }

        date = expires;
        text = key + '=' + val;

        if (typeof date === 'number') {
            date = new Date();
            date.setDate(date.getDate() + expires);
        }

        if (date instanceof Date) {
            text += '; expires=' + date.toUTCString();
        }

        if (isNonEmptyString(domain)) {
            text += '; domain=' + domain;
        }

        if (isNonEmptyString(path)) {
            text += '; path=' + path;
        }

        if (opt.secure) {
            text += '; secure';
        }

        document.cookie = text;
        return text;
    },
    remove: function remove(key, opt) {
        opt = opt || {};
        opt.expires = new Date(0);
        return this.set(key, '', opt);
    }
};

function plugin(Vue) {
    if (plugin.installed) {
        return;
    }

    Vue.cookie = cookie;
    Vue.prototype.$cookie = cookie;
}

function parseCookieString(text, shouldDecode) {
    var cookies, cookieKey, cookieVal, cookieKeyVal, decodeVal, cookieParts, index, len;

    cookies = {};
    decodeVal = shouldDecode ? decode : same;

    if (typeof text === 'string' && text.length > 0) {
        cookieParts = text.split(/;\s/g);

        for (index = 0, len = cookieParts.length; index < len; index++) {
            cookieKeyVal = cookieParts[index].match(/([^=]+)=/i);

            if (cookieKeyVal instanceof Array) {
                try {
                    cookieKey = decode(cookieKeyVal[1]);
                    cookieVal = decodeVal(cookieParts[index].substring(cookieKeyVal[1].length + 1));
                } catch (e) {}
            } else {
                cookieVal = '';
                cookieKey = decode(cookieParts[index]);
            }

            if (cookieKey) {
                cookies[cookieKey] = cookieVal;
            }
        }
    }

    return cookies;
}

function same(str) {
    return str;
}

function isNonEmptyString(str) {
    return typeof str === 'string' && str !== '';
}

function validateCookieName(key) {
    if (!isNonEmptyString(key)) {
        throw new TypeError('Cookie name must be a non-empty string');
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;