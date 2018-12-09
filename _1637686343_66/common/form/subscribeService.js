function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return new c.default(function(t, r) {
        var i = e.aid || "", u = e.rfr || "", n = {
            appid: a.default.appid,
            formid: e.formid,
            "3rd_session": e.key,
            qipuId: e.qipuId,
            type: e.sendType,
            playUrl: "pages/liveVideo/liveVideo?qipuId=" + e.qipuId + "&aid=" + i + "&rfr=" + u,
            subscribeType: e.subscribeType
        }, s = p.default.getAuthcookie();
        s && Object.assign(n, {
            authcookie: s
        }), wx.request({
            url: l + "/apis/wechat/miniapp/subscribe",
            data: n,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var i = e.data;
                i && "A00000" == i.code ? t(i) : r(i);
            },
            fail: function(e) {
                r(e);
            }
        });
    });
}

function r(e) {
    var t, r = e.toString().substr(-2);
    return "00" == r ? t = 1 : "11" == r ? t = 3 : "23" == r && (t = 2), t;
}

function i(e, t) {
    return new c.default(function(r, i) {
        var u = {
            appid: a.default.appid,
            qipuIds: e.toString(),
            "3rd_session": t
        };
        wx.request({
            url: l + "/apis/wechat/miniapp/is_subscribe_multi",
            data: u,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var t = e.data;
                t && "A00000" == t.code ? r(t) : i(t);
            },
            fail: function(e) {
                i(e);
            }
        });
    });
}

function u(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2, r = n(e);
    return f.getOrSetThirdSession().then(function(n) {
        return i(r, n).then(function(e) {
            return e;
        }).catch(function(r) {
            return o.default.isObject(r) && "A00000" != r.code && t > 0 ? (f.clearThirdSession(), 
            u(e, t - 1)) : c.default.reject(r);
        });
    });
}

function n(e) {
    var t = [];
    return e.forEach(function(e, r) {
        t.push(e.qipuId);
    }), t;
}

function s(e) {
    var i = e.qipuId, u = 0 == e.isSubscribe ? 1 : 0, n = r(i);
    return f.getOrSetThirdSession().then(function(r) {
        var i = Object.assign({}, e, {
            key: r,
            subscribeType: u,
            sendType: n
        });
        return delete i.isSubscribe, t(i);
    }).catch(function(t) {
        return o.default.isObject(t) && "A00000" != t.code ? (f.clearThirdSession(), s(e)) : c.default.reject(t);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getSubscribeData = function(e) {
    return new c.default(function(t, r) {
        var i = {
            appid: a.default.appid,
            qipuId: e
        };
        wx.request({
            url: l + "/apis/wechat/miniapp/subscribe_count",
            data: i,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var i = e.data;
                i && "A00000" == i.code ? t(i) : r(i);
            },
            fail: function(e) {
                r(e);
            }
        });
    });
}, exports.liveSubscribe = t, exports.subscribeTypeFunc = r, exports.checkIfSubscribe = i, 
exports.refreshCount = function(e) {
    return new c.default(function(t, r) {
        wx.request({
            url: b + "/jp/pc/" + e + "/?src=d846d0c32d664d32b6b54ea48997a589",
            method: "GET",
            success: function(e) {
                if ("200" == e.statusCode) {
                    var i = e.data;
                    i ? t(i) : r(e);
                } else r(e);
            },
            fail: r
        });
    });
}, exports.liveSubscribeStatus = u, exports.subOrUnsubscribeLiveFlow = s;

var c = e(require("../polyfill/promise")), o = e(require("../utils/util")), a = (e(require("../login/index")), 
e(require("../login/constant"))), d = e(require("../login/config")), p = e(require("../user/user")), f = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("./subscribeSession")), l = d.default.subscribeHost, b = "https://cache.video.iqiyi.com";