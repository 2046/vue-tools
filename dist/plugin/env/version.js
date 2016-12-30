'use strict';

function Version() {}

Version.compare = function (v1, v2) {
    v1 = v1.toString().split('.');
    v2 = v2.toString().split('.');

    for (var i = 0; i < v1.length || i < v2.length; i++) {
        var n1 = parseInt(v1[i], 10);
        var n2 = parseInt(v2[i], 10);

        if (isNaN(n1)) {
            n1 = 0;
        }

        if (isNaN(n2)) {
            n2 = 0;
        }

        if (n1 < n2) {
            return -1;
        } else if (n1 > n2) {
            return 1;
        }
    }

    return 0;
};

Version.prototype = {
    constructor: function constructor(v) {
        if (v) {
            this.val = v.toString();
        } else {
            this.val = '';
        }
    },
    gt: function gt(v) {
        return Version.compare(this, v) > 0;
    },
    gte: function gte(v) {
        return Version.compare(this, v) >= 0;
    },
    lt: function lt(v) {
        return Version.compare(this, v) < 0;
    },
    lte: function lte(v) {
        return Version.compare(this, v) <= 0;
    },
    eq: function eq(v) {
        return Version.compare(this, v) === 0;
    },
    toString: function toString() {
        return this.val.toString();
    }
};

module.exports = Version;