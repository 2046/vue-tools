'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _cell = require('./component/cell');

var _cell2 = _interopRequireDefault(_cell);

var _icon = require('./component/icon');

var _icon2 = _interopRequireDefault(_icon);

var _swipe = require('./component/swipe');

var _swipe2 = _interopRequireDefault(_swipe);

var _alert = require('./component/alert');

var _alert2 = _interopRequireDefault(_alert);

var _modal = require('./component/modal');

var _modal2 = _interopRequireDefault(_modal);

var _popup = require('./component/popup');

var _popup2 = _interopRequireDefault(_popup);

var _toast = require('./component/toast');

var _toast2 = _interopRequireDefault(_toast);

var _video = require('./component/video');

var _video2 = _interopRequireDefault(_video);

var _layout = require('./component/layout');

var _layout2 = _interopRequireDefault(_layout);

var _header = require('./component/header');

var _header2 = _interopRequireDefault(_header);

var _switch = require('./component/switch');

var _switch2 = _interopRequireDefault(_switch);

var _loading = require('./component/loading');

var _loading2 = _interopRequireDefault(_loading);

var _confirm = require('./component/confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _infinite = require('./component/infinite');

var _infinite2 = _interopRequireDefault(_infinite);

var _validator = require('./component/validator');

var _validator2 = _interopRequireDefault(_validator);

var _upload = require('./component/upload');

var _upload2 = _interopRequireDefault(_upload);

var _progress = require('./component/progress');

var _progress2 = _interopRequireDefault(_progress);

var _env = require('./plugin/env');

var _env2 = _interopRequireDefault(_env);

var _ajax = require('./plugin/ajax');

var _ajax2 = _interopRequireDefault(_ajax);

var _alert3 = require('./plugin/alert');

var _alert4 = _interopRequireDefault(_alert3);

var _toast3 = require('./plugin/toast');

var _toast4 = _interopRequireDefault(_toast3);

var _confirm3 = require('./plugin/confirm');

var _confirm4 = _interopRequireDefault(_confirm3);

var _loading3 = require('./plugin/loading');

var _loading4 = _interopRequireDefault(_loading3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function plugin(Vue, opts) {
    if (plugin.installed) {
        return;
    }

    opts = (0, _assign2.default)({}, {
        config: {},
        exclude: []
    }, opts);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(plugin.plugins)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (opts.exclude.indexOf(key) === -1) {
                if (opts.config[key]) {
                    Vue.use(plugin.plugins[key], opts.config[key]);
                } else {
                    Vue.use(plugin.plugins[key]);
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = (0, _getIterator3.default)((0, _keys2.default)(plugin.components)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _key = _step2.value;

            Vue.component(_key, plugin.components[_key]);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
}

plugin.plugins = {
    env: _env2.default,
    ajax: _ajax2.default,
    alert: _alert4.default,
    toast: _toast4.default,
    confirm: _confirm4.default,
    loading: _loading4.default
};
plugin.components = {
    Cell: _cell2.default,
    Icon: _icon2.default,
    Alert: _alert2.default,
    Modal: _modal2.default,
    Popup: _popup2.default,
    Swipe: _swipe2.default,
    Toast: _toast2.default,
    Videos: _video2.default,
    Layout: _layout2.default,
    Switchs: _switch2.default,
    Headers: _header2.default,
    Loading: _loading2.default,
    Confirm: _confirm2.default,
    Infinite: _infinite2.default,
    Validator: _validator2.default,
    Upload: _upload2.default,
    Progress: _progress2.default
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;