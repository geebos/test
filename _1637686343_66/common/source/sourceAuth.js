function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, i) {
    var a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], f = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1, d = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : null;
    console.log('tmts a', a, d);
    return new m.default(function(l, c) {
        var m = "https://cache.m.iqiyi.com" + u(t, e, i, a, d).urlParam;

        console.log('cache url', m);

        r(m, i)().then(function(r) {
            console.log('tmts接口', r);
            var u = r.data;
            u && "A00000" === u.code ? (n(t, u), l(u)) : u && "A00020" === u.code && --f >= 0 ? o(t, e, i, f).then(function(t) {
                l(t);
            }).catch(function(t) {
                c(u);
            }) : c(u), s.default.compatibility.logManager("info", m, JSON.stringify(i), JSON.stringify(u));
        }, function(t) {
            console.log("tmts接口调用失败， retry"), s.default.compatibility.logManager("warn", m, JSON.stringify(i), JSON.stringify(t)), 
            c(t);
        });
    });
}

function r(t, e) {
    var r = 3;
    return function() {
        return new m.default(function(n, u) {
            function a() {
                i(t, e).then(function(t) {
                    n(t);
                }, function(t) {
                    r ? a(e) : u(t), r--;
                });
            }
            a();
        });
    };
}

function n(t, e) {
    var r = {
        A00012: "需要前端请求广告mixer接口",
        A00015: "会员鉴权成功",
        A00000: "不请求广告直接播放"
    };
    e.data && r[e.data.ds] && (e.src = s.default.qs.addQueryParam(e.data.m3u, "qypid", t + "_31"), 
    e.status = e.data.ds);
}

function i(t, e) {
    return new m.default(function(r, n) {
        wx.request({
            url: t,
            data: e,
            method: "GET",
            success: r,
            fail: function(e) {
                console.log("tmts接口调用失败， url: , " + JSON.stringify(t) + " error: " + e), n(e);
            }
        });
    });
}

function u(t, e) {
    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, n = arguments[3], i = arguments[4], u = l.default.cmd5xtmts();
    n && (u.tm = i), r = Object.assign(r, u, {
        src: "02028001010000000000"
    });
    
    console.log('u,r', r);

    r.agenttype = 236;
    r.type = 'mp4';

    var a = "/tmts/" + t + "/" + e + "/?" + s.default.qs.stringify(r), o = l.default.cmd5x(a);
    return a += "&vf=" + o, f({}, r, {
        vf: o,
        urlParam: a
    });
}

function a() {
    return v.commonGetRequest({
        url: "" + s.default.OUTERHOST.PUB + p.TIME
    }).then(function(t) {
        return t;
    }).catch(function(t) {
        if (s.default.isObject(t) && t.time) {
            var e = Math.round(t.time / 1e3);
            return m.default.resolve(e);
        }
        return m.default.reject(t);
    });
}

function o(t, r, n, i) {
    return a().then(function(u) {
        return e(t, r, n, !0, i, u);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var f = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
};

exports.auth = function(t, r) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1, i = arguments[3];
    return t && r ? e(t, r, {
        uid: c.default.getUid(),
        platForm: "h5",
        qyid: c.default.getAnonymousUid(),
        agenttype: s.default.os.isAndroid ? 236 : 237,
        ptid: g.default.ptidAndroid,
        type: d.default.videoFormat(),
        nolimit: i,
        k_ft1: 8,
        rate: n,
        p: c.default.getAuthcookie(),
        deviceid: c.default.getAnonymousUid(),
        codeflag: 1
    }) : m.default.reject({
        code: "A00001",
        data: {}
    });
}, exports.getTimestamp = a;

var d = t(require("videoUtil")), l = t(require("../tmts/tmts")), c = t(require("../user/user")), s = t(require("../utils/util")), m = t(require("../polyfill/promise")), v = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    return e.default = t, e;
}(require("../serviceApi/serviceApi")), g = t(require("../login/constant")), p = {
    TIME: "/h5/time/"
};