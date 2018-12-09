function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t() {
    return o.default.Session.get(d);
}

function n() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
    return r().then(function(e) {
        var t = e.data;
        return o.default.Session.set(d, t), t;
    }).catch(function(t) {
        return e > 0 ? n(e - 1) : Promise.reject(t);
    });
}

function i() {
    return new Promise(function(e, t) {
        wx.checkSession({
            success: function() {
                e(!0);
            },
            fail: function(e) {
                t(e);
            }
        });
    });
}

function r() {
    return new Promise(function(e, t) {
        u.default.wxLogin().then(function(n) {
            var i = {
                appid: s.default.appid,
                code: n.code
            };
            wx.request({
                url: c.default.subscribeHost + "/apis/wechat/miniapp/login",
                data: i,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(n) {
                    var i = n.data;
                    a.default.isObject(i) && "A00000" == i.code ? e(i) : t(i);
                },
                fail: function(e) {
                    t(e);
                }
            });
        }, function(e) {
            t(e);
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getThirdSession = t, exports.clearThirdSession = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "USER_THIRD_SESSION_KEY";
    a.default.storage.handleStorageMuti("remove", e);
}, exports.setThirdSession = n, exports.checkThirdSession = i, exports.getOrSetThirdSession = function() {
    var e = t();
    return e ? i().then(function(t) {
        return e;
    }).catch(function() {
        return n();
    }) : n();
}, exports.getWechatCode = r;

var o = e(require("../login/session")), u = e(require("../login/index")), s = e(require("../login/constant")), c = e(require("../login/config")), a = e(require("../utils/util")), d = "USER_THIRD_SESSION_KEY";