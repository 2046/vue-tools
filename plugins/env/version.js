function Version() {}

Version.compare = function(v1, v2) {
    v1 = v1.toString().split('.')
    v2 = v2.toString().split('.')

    for (var i = 0; i < v1.length || i < v2.length; i++) {
        let n1 = parseInt(v1[i], 10)
        let n2 = parseInt(v2[i], 10)

        if (isNaN(n1)) {
            n1 = 0
        }

        if (isNaN(n2)) {
            n2 = 0
        }

        if (n1 < n2) {
            return -1
        } else if (n1 > n2) {
            return 1
        }
    }

    return 0
}

Version.prototype = {
    constructor(v) {
        if (v) {
            this.val = v.toString()
        } else {
            this.val = ''
        }
    },
    gt(v) {
        return Version.compare(this, v) > 0
    },
    gte(v) {
        return Version.compare(this, v) >= 0
    },
    lt(v) {
        return Version.compare(this, v) < 0
    },
    lte(v) {
        return Version.compare(this, v) <= 0
    },
    eq(v) {
        return Version.compare(this, v) === 0
    },
    toString() {
        return this.val.toString()
    }
}

module.exports = Version
