function t() {
    u({
        t: "15"
    });
}

function n() {
    u({
        t: "1"
    });
}

function e(t, n) {
    s && clearTimeout(s), s = setTimeout(function t() {
        s = setTimeout(t, r), "END" != d && "PAUSE" != d && (10 === ++m && c(n), 15 === m || 75 === m ? u({
            t: "2",
            tm: Math.min(m, 60)
        }) : (m - 75) % 120 == 0 && (u({
            t: "2",
            tm: 120
        }), m = 75));
    }, r);
}

function i() {
    u({
        t: "13"
    });
}

function o() {
    var t = 0;
    m >= 75 ? t = m - 75 : m >= 15 ? t = m - 15 : m > 0 && (t = m), t && (u({
        t: "2",
        tm: t
    }), m = 75);
}

function u(t) {
    a.default.send(Object.assign({}, v, t));
}

function c(t) {
    var n = t.data.currentId, e = t.data.videos, i = void 0 === e ? {} : e;
    i && i.videolist && i.videolist.length > 0 && i.videolist.forEach(function(t) {
        t.tvId == n && (t.showShare = !0);
    }), t.setData({
        videos: i
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../common/pingback/vv")), r = 1e3, f = !0, d = "PLAY", s = null, l = null, m = 0, v = {};

exports.default = {
    bind: function(u, c) {
        u && (u.on("ready", function() {
            f = !0, d = "PLAY", clearTimeout(s), m = 0, t();
        }), u.on("play", function() {
            d = "PLAY";
        }), u.on("pause", function() {
            clearTimeout(l), l = setTimeout(function() {
                "PAUSE" === d && o();
            }, 1e3), d = "PAUSE";
        }), u.on("timeupdate", function(t) {
            f && t.detail.currentTime > 0 && (n(), e(0, c), f = !1);
        }), u.on("ended", function() {
            d = "END", o(), i();
        }));
    },
    init: function(t) {
        v = Object.assign({
            purl: "wx_player",
            c1: "",
            ht: "",
            r: "",
            ra: 1,
            rfr: ""
        }, t || {});
    }
};