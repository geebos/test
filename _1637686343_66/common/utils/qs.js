Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.parse = function(e) {
    for (var t, n, i, o, u = e.substr(e.lastIndexOf("?") + 1).split("&"), s = u.length, a = {}, f = 0; f < s; f++) u[f] && (t = (o = u[f].split("=")).shift(), 
    n = o.join("="), void 0 === (i = a[t]) ? a[t] = n : r.isArray(i) ? i.push(n) : a[t] = [ i, n ]);
    return a;
}, exports.stringify = function() {
    var e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = [], i = arguments[1] || function(e) {
        return r.escapeSymbol(e);
    };
    for (var o in t) {
        var u = t[o];
        if (r.isArray(u)) for (e = u.length; e--; ) n.push(o + "=" + i(u[e], o)); else n.push(o + "=" + i(u, o));
    }
    return n.join("&");
}, exports.addQueryParam = function(e, r, t) {
    if (r) return e + (-1 !== e.indexOf("?") ? "&" : "?") + r + "=" + t;
}, exports.getSign = function(r) {
    var t = Object.keys(r).sort().map(function(e) {
        return e + "=" + r[e];
    }).join("|") + "|uF86eIvX2muRWNJdqovb";
    return (0, e.default)(t);
}, exports.getSignWithSaltKey = function(r, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "&", i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "", o = "" + Object.keys(r).sort().map(function(e) {
        return e + "=" + r[e];
    }).join("" + n) + i + t;
    return (0, e.default)(o);
};

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("md5")), r = require("object");