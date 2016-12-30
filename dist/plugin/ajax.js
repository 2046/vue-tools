'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resource = void 0,
    CACHE = void 0;

resource = require('vue-resource');

CACHE = [];

function plugin(Vue, opts) {
    if (plugin.installed) {
        return;
    }

    opts = (0, _assign2.default)({}, {
        headers: {},
        timeout: 10000,
        duration: 1000,
        errorCallback: function errorCallback(message) {
            alert(message);
        }
    }, opts);

    Vue.use(resource);
    Vue.http.options.root = opts.root;
    Vue.http.options.credentials = true;
    Vue.http.headers.common = opts.headers;
    Vue.http.options.timeout = opts.timeout;
    Vue.http.options.duration = opts.duration;

    Vue.http.interceptors.push(function (request, next) {
        var before = void 0,
            time = void 0,
            timeout = void 0;

        time = request.timeout;
        before = request.before;

        delete request.timeout;

        request.before = function (request) {
            if (before) {
                before.call(this, request);
            }

            timeout = setTimeout(function () {
                request.abort();

                next(request.respondWith(request.body, {
                    status: 0,
                    statusText: ''
                }));
            }, time);
        };

        next(function (response) {
            clearTimeout(timeout);
        });
    });

    Vue.http.interceptors.push(function (request, next) {
        if (request.duration === 0) {
            next();
        } else {
            (function () {
                var timeout = setTimeout(function () {
                    Vue.loading && Vue.loading(true);
                }, request.duration);

                next(function (response) {
                    clearTimeout(timeout);
                    Vue.loading && Vue.loading(false);
                });
            })();
        }
    });

    Vue.http.interceptors.push(function (request, next) {
        if (request.method.toLowerCase() === 'get') {
            request.url = '' + request.url + (request.url.indexOf('?') < 0 ? '?' : '&') + 't=' + Date.now();
        }

        if (request.method.toLowerCase() === 'post') {
            request.emulateJSON = true;
        }

        next();
    });

    Vue.http.interceptors.push(function (request, next) {
        var uid = '';

        if (request.method.toLowerCase() === 'get') {
            uid = '' + request.method.toLowerCase() + request.url + (request.params ? (0, _stringify2.default)(request.params) : '');
        }

        if (request.method.toLowerCase() === 'post') {
            uid = '' + request.method.toLowerCase() + request.url + (request.data ? (0, _stringify2.default)(request.data) : '');
        }

        if (CACHE.indexOf(uid) === -1) {
            CACHE.push(uid);

            next(function (response) {
                CACHE.splice(CACHE.indexOf(uid), 1);
            });
        } else {
            next(request.respondWith(request.body, {
                status: 0,
                statusText: 'repeat request'
            }));
        }
    });

    Vue.http.interceptors.push(function (request, next) {
        next(function (response) {
            if (response.data) {
                response.message = response.data.message;
                response.code = response.data.status;
                response.data = response.data.data;
            }
        });
    });

    Vue.http.interceptors.push(function (request, next) {
        next(function (response) {
            if (response.status === 0 && response.statusText === '') {
                return new Vue.Promise(opts.errorCallback.bind(null, '网络超时'));
            }

            if (response.status === 0 && response.statusText === 'repeat request') {
                return new Vue.Promise(function () {
                    return console.error('The last request was in the pending state, not to send multiple requests');
                });
            }

            if (response.status === 404) {
                return new Vue.Promise(opts.errorCallback.bind(null, '找不到数据'));
            }
        });
    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;