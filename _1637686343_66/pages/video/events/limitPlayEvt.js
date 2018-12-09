function e(e) {
    var r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = e.data, u = o.default.isObject(n.bestView) && o.default.isArray(n.bestView.videos) ? n.bestView.videos : [], d = i(u, n.playInfo.qipuId);
    return t(u, n.playInfo.qipuId) ? null : d || (r ? u[0] : null);
}

function i() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], i = arguments[1], t = o.default.isArray(e) && e.reduce(function(e, t) {
        return t.qipuId === i ? "current" : "current" === e ? t : e;
    }, null);
    return "current" === t ? null : t;
}

function t(e, i) {
    var t = e && e.length;
    return !(!e || !e[t - 1] || e[t - 1].qipuId != i);
}

function r(e) {
    return [ 1036, 1058, 1035 ].indexOf(e) > -1;
}

function n(e) {
    var i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", r = [ 1, 2, 4, 6, 15 ], n = !1;
    return e && r.indexOf(e) > -1 && (i && !t ? n = !0 : t && 1 == t && (n = !0)), n;
}

function u(i, t) {
    return t || ((e(i) || {}).qipuId || "");
}

function d(e, i) {
    var t = getApp().globalData, r = (t.showScene, t.shareCurrentQipuId), n = t.vrsMapObj, u = !1, d = o.default.isObject(i) ? i : e.data.playInfo || {};
    d.qipuId, d.vrsId;
    return n[r] == d.qipuId && (u = !0), u;
}

function a(e, i) {
    var t = !1, n = getApp().globalData.showScene, u = d(e, i);
    return r(n) && u && (t = !0), t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/utils/util")), l = function(e) {
    if (e && e.__esModule) return e;
    var i = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (i[t] = e[t]);
    return i.default = e, i;
}(require("../service/videoService"));

exports.default = {
    checkIsLimited: n,
    isRelatedVideoPlay: function(e, i) {
        var t = i.channelId, r = void 0 === t ? "" : t, u = i.isFeatureFilm, a = void 0 !== u && u, o = i.cType, l = void 0 === o ? "" : o, s = (i.qipuId, 
        i.subType, e.data), v = !1;
        return n(r, a, l) && !d(e, i) && "single" == s.originPlayInfo.subType && (v = !0), 
        v;
    },
    getPrevueInfo: function(e, i) {
        var t = i.channelId, r = i.qipuId, u = i.albumId, d = i.pd, a = i.isFeatureFilm, s = i.cType, v = e.data, p = (v.playInfo, 
        v.videoList), f = void 0 === p ? {} : p, c = (e.globalPage.firstTime, !1), I = n(t, a, s);
        return f && o.default.isArray(f.videos) && f.videos.length > 0 && f.videos.forEach(function(e) {
            r == e.qipuId && (c = !0);
        }), (2 == t || 6 == t) && c && I ? l.getPrevueId(t, r, u, d).then(function(e) {
            return "A00000" == e.code && e.data && (i.prevueId = e.data.prevueId || 0), Promise.resolve(i);
        }).catch(function(e) {
            return Promise.resolve(i);
        }) : Promise.resolve(i);
    },
    getTmtsParam: function(i, t) {
        var r = t.qipuId, d = void 0 === r ? "" : r, l = t.albumId, s = void 0 === l ? "" : l, v = t.vid, p = t.prevueId, f = t.channelId, c = t.subType, I = (t.videoId, 
        t.isFeatureFilm), g = t.cType, m = (t.bestViewId, t.featureVideoId), b = void 0 === m ? "" : m, y = i.data, h = (y.videoList, 
        y.noPrevue, y.bestView), q = void 0 === h ? {} : h, P = (y.fragments, y.bestViewFlag, 
        y.isLimitEpisode), V = (i.globalPage.firstTime, {
            qipuId: d,
            albumId: s,
            featureVideoId: b,
            subType: c,
            vid: v,
            rate: 2
        }), L = "", T = "", w = n(f, I, g);
        return "videoList" == i.globalPage.videoCardType && (P = w), !w || w && a(i) ? (i.setData({
            isLimited: w,
            isLimitEpisode: P
        }), V) : (p ? (L = p, T = "预告片") : p || 15 != f ? p || 6 != f ? p || 4 != f ? (L = (e(i) || {}).qipuId || "", 
        T = "精彩看点") : L = p : (L = u(i), T = "精彩看点") : q && o.default.isArray(q.videos) && q.videos.length > 0 && (L = e(i).qipuId, 
        T = "精彩看点"), V.qipuId = L, i.setData({
            watermark: T,
            isPrevue: !0,
            isLimited: w,
            isLimitEpisode: P
        }), V);
    },
    getLimitedChannelInfo: function(e) {
        return {
            buttonText: "打开爱奇艺APP"
        };
    },
    isPageCurrentVideo: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = !1, t = e.qipuId, r = e.vrsId, n = getApp().globalData.qipuMap || {}, u = n.qipuId || "", d = n.vrsId || "";
        return u == t && d == r && (i = !0), i;
    },
    isCurrentLimitVideo: a,
    isUnlimitedVideo: d,
    getNextLayerVideo: function(e) {
        var r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = e.data, u = n.playInfo, d = u.channelId, a = u.qipuId, l = 4 == d ? n.fragments : n.bestView, s = i(l = o.default.isArray(l) ? l : [], a);
        return t(l, a) ? null : s || (r ? l[0] : null);
    },
    unlimtedScene: r
};