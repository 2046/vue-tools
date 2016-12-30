'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var refs = void 0,
    definition = void 0,
    Vue = void 0;

Vue = require('vue');

refs = {};
definition = {
    bind: function bind(el, binding, vnode) {
        el.dataset.novalidate = el.getAttribute('novalidate');
        el.setAttribute('novalidate', 'novalidate');

        el.callback = function (e) {
            var count = void 0,
                components = void 0,
                result = void 0;

            count = 0;
            components = [].concat((0, _toConsumableArray3.default)(el.querySelectorAll('[data-key="validator"]')));

            if (binding.modifiers.prevent) {
                e.preventDefault();
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(components), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var component = _step.value;

                    if ((result = refs[component.dataset.uuid].execute()) !== true) {
                        break;
                    }

                    count += 1;
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

            binding.value(count === components.length ? null : result, e);
        };

        el.addEventListener('submit', el.callback, false);
    },
    unbind: function unbind(el, binding, vnode) {
        if (el.dataset.novalidate === null) {
            el.removeAttribute('novalidate');
        } else {
            el.setAttribute('novalidate', el.dataset.novalidate);
        }

        el.removeEventListener('submit', el.callback, false);
        delete el.dataset.novalidate;
    }
};

module.exports = {
    refs: refs,
    definition: definition
};