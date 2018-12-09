function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
    return new c.default(function(o, c) {
        var l;
        l = s.default.getAuthcookie() && s.default.isVip() ? 1 : 0;
        var f = d.default.cmd5xlive();
        n && (f.tm = u);
        var v = {
            lc: e.lc,
            lp: e.lp,
            src: a.default.ptidAndroid,
            uid: s.default.getUid(),
            k_uid: s.default.getAnonymousUid(),
            v: l,
            rateVers: "H5_QIYI"
        };
        Object.assign(v, f);
        var p = "/live?" + i(v), q = d.default.cmd5x(p);
        Object.assign(v, {
            vf: q
        }), wx.request({
            url: m + "/live",
            data: v,
            method: "GET",
            success: function(i) {
                var n = i.data;
                n && "A00000" == n.code ? o(n) : n && "A00020" == n.code && --t >= 0 ? r(e, t).then(function(e) {
                    o(e);
                }).catch(function(e) {
                    c(n);
                }) : c(n);
            },
            fail: function(e) {
                c(e);
            }
        });
    });
}

function i(e) {
    var t = Object.keys(e), i = "";
    for (var n in t) {
        var u = t[n];
        "string" == typeof u && (i += "&" + u + "=" + e[u]);
    }
    return i = i.substring(1);
}

function n(e, t) {
    return new c.default(function(i, n) {
        var r = e.url, c = new Date().getTime(), d = "afbe8fd3d73448c9", l = o.default.md5(t + "_" + d + "_" + c + "_2391461978"), f = "mobile-wx_" + s.default.getDynamicUuid(), m = {
            qpid: t,
            cid: d,
            ut: c,
            uuid: s.default.getAnonymousUid(),
            uid: s.default.getUid() || 0,
            platform: a.default.bossPlatform,
            P00001: s.default.getAuthcookie(),
            v: l,
            version: "4.0",
            filename: e.streamName,
            qd_uid: u(r, "qd_uid"),
            qd_vip: u(r, "qd_vip"),
            qd_vipres: u(r, "qd_vipres"),
            qd_src: u(r, "qd_src"),
            qd_tm: u(r, "qd_tm"),
            qd_ip: u(r, "qd_ip"),
            qd_sc: u(r, "qd_sc"),
            qd_tvid: u(r, "qd_tvid"),
            qd_scc: u(r, "qd_scc"),
            appName: "mobile-wx",
            messageId: f
        };
        wx.request({
            url: v + "/services/ckLiveN.action",
            data: m,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var t = e.data;
                t && "A00000" == t.code ? i(e) : n(t);
            },
            fail: function(e) {
                n(e);
            }
        });
    });
}

function u(e, t) {
    var i, n = new RegExp("(^|&)" + t + "=([^&]*)(&|$)");
    return (i = e.match(n)) ? i[2] : "";
}

function r(e, i) {
    return (0, f.getTimestamp)().then(function(n) {
        return t(e, i, !0, n);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getLiveSource = function(e) {
    return t(e).then(function(e) {
        return (0, l.liveSuccessHandler)(e);
    }).catch(function(e) {
        return (0, l.liveFailureHandler)(e);
    });
}, exports.getLiveAuthSource = function(e, t) {
    return n(e, t).then(function(e) {
        return (0, l.liveSuccessHandler)(e);
    }).catch(function(e) {
        return (0, l.liveFailureHandler)(e);
    });
}, exports.getPayToken = n;

var o = e(require("../../../common/utils/util")), c = e(require("../../../common/polyfill/promise")), d = e(require("../../../common/tmts/tmts")), a = e(require("../../../common/login/constant")), s = e(require("../../../common/user/user")), l = require("../../../common/source/qiyiVideoSource"), f = require("../../../common/source/sourceAuth"), m = "https://live.video.iqiyi.com", v = "https://api.vip.iqiyi.com";