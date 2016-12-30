'use strict';

var os = void 0,
    app = void 0,
    Version = void 0,
    browser = void 0;

os = require('./os');
app = require('./app');
Version = require('./version');
browser = require('./browser');

var env = {
    os: os,
    app: app,
    browser: browser,
    Version: Version
};

function plugin(Vue) {
    if (plugin.installed) {
        return;
    }

    Vue.env = env;
    Vue.prototype.$env = env;
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;