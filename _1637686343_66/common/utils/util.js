function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}

function t(e) {
    if (!e) return e;
    if (!("object" !== (void 0 === e ? "undefined" : i(e)) || e instanceof String)) {
        for (var r in e) e[r] = t(e[r]);
        return e;
    }
    if ("string" == typeof e || "object" === (void 0 === e ? "undefined" : i(e)) && e instanceof String) {
        var o = e.toString();
        if (o.indexOf("qiyipic.com") >= 0) return o.replace(/\bqiyipic\.com\b/g, "iqiyipic.com");
    }
    return e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = r(require("qs")), n = e(require("os")), u = r(require("object")), f = e(require("md5")), c = e(require("base64")), a = r(require("time")), s = r(require("style")), l = r(require("string")), y = r(require("storage")), p = e(require("hostMap")), d = r(require("compatibility"));

exports.default = Object.assign({
    replaceQiyipic: t
}, {
    qs: o
}, {
    os: n.default
}, {
    md5: f.default
}, {
    base64: c.default
}, {
    time: a
}, {
    string: l
}, s, u, {
    storage: y
}, p.default, {
    compatibility: d
});