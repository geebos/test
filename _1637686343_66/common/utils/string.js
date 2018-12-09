Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.slice = function(t, e, i, n) {
    return t ? n ? t.split(n).slice(e, i).join(n) : t.slice(e, i) : t;
}, exports.schemaStr = function(e, i, n) {
    var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "27", s = "";
    if (t.default.isAndroid) {
        var u = 0 == r ? encodeURIComponent(JSON.stringify(e)) : encodeURIComponent(encodeURIComponent(JSON.stringify(e)));
        s = 0 == r ? "iqiyi://mobile/" + i + "?ftype=" + o + "&subtype=" + n + "&" + e : "iqiyi://mobile/register_business/" + i + "?ftype=" + o + "&subtype=" + n + "&pluginParams=" + u;
    } else s = JSON.stringify(Object.assign({}, e, {
        init_type: o,
        init_sub_type: n
    }));
    return s;
};

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("os"));

String.prototype.format = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [ {
        min: 1e8,
        unit: "亿"
    }, {
        min: 1e4,
        unit: "万"
    } ];
    return /^\d+$/.test(this) ? parseInt(this).format(t, e, i, n) : this;
}, Number.prototype.format = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [ {
        min: 1e8,
        unit: "亿"
    }, {
        min: 1e4,
        unit: "万"
    } ];
    n = n.sort(function(t, e) {
        return e.min - t.min;
    });
    var r = !0, o = !1, s = void 0;
    try {
        for (var u, l = n[Symbol.iterator](); !(r = (u = l.next()).done); r = !0) {
            var a = u.value;
            if (this >= a.min) {
                var d = (this / a.min).toFixed(t);
                return e && (d = d.replace(/\.?0+$/, "")), d + i + a.unit;
            }
        }
    } catch (t) {
        o = !0, s = t;
    } finally {
        try {
            !r && l.return && l.return();
        } finally {
            if (o) throw s;
        }
    }
    return this;
};