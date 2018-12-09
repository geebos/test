function t() {
    o({
        t: "15"
    });
}

function n() {
    o({
        t: "1"
    });
}

function e(t, n) {
    l && clearTimeout(l);
    var e = t.detail.duration, u = parseInt(e / 2);
    l = setTimeout(function t() {
        l = setTimeout(t, c), "END" != s && "PAUSE" != s && (++m == u && r(n), 15 === m || 75 === m ? o({
            t: "2",
            tm: Math.min(m, 60)
        }) : (m - 75) % 120 == 0 && (o({
            t: "2",
            tm: 120
        }), m = 75));
    }, c);
}

function u() {
    o({
        t: "13"
    });
}

function i() {
    var t = 0;
    m >= 75 ? t = m - 75 : m >= 15 ? t = m - 15 : m > 0 && (t = m), t && (o({
        t: "2",
        tm: t
    }), m = 75);
}

function o(t) {
    a.default.send(Object.assign({}, p, t));
}

function r(t) {
    if (!t) return !1;
    t.setData({
        "subscribePlayInfo.showShare": !0,
        "playInfo.showShare": !0
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../common/pingback/vv")), c = 1e3, f = !0, s = "PLAY", l = null, d = null, m = 0, p = {};

exports.default = {
    bind: function(o, r) {
        o && (o.on("ready", function() {
            f = !0, s = "PLAY", clearTimeout(l), m = 0, t();
        }), o.on("play", function() {
            s = "PLAY";
        }), o.on("pause", function() {
            clearTimeout(d), d = setTimeout(function() {
                "PAUSE" === s && i();
            }, 1e3), s = "PAUSE";
        }), o.on("timeupdate", function(t) {
            f && t.detail.currentTime > 0 && (n(), e(t, r), f = !1);
        }), o.on("ended", function() {
            s = "END", i(), u();
        }));
    },
    init: function(t) {
        p = Object.assign({
            purl: "wx_player",
            c1: "",
            ht: "",
            r: "",
            ra: 1,
            rfr: ""
        }, t || {});
    }
};