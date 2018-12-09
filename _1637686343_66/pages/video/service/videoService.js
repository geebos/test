function e(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "video", i = e[0], u = {
        videoName: i.videoName || "",
        qipuId: i.qipuId || "",
        videoId: i.latestVideoId || i.firstVideoId || "",
        isEffect: i.isEffect && 1 == i.pageStatus || !1,
        albumId: i.albumId || "",
        channelName: i.channelName || "",
        channelId: i.channelId || "",
        albumName: i.albumName || "",
        imageUrl: i.imageUrl || "",
        isFeatureFilm: i.isFeatureFilm || !1,
        isHidden: !i.albumId && !i.qipuId || !i.videoName && !i.albumName || "album" == t && !i.latestVideoId && !i.firstVideoId
    }, a = [ 1, 2, 4, 6, 15 ], n = !1;
    return i && i.channelId && a.indexOf(i.channelId) > -1 && ("album" == t || i.isFeatureFilm) && (n = !0), 
    u.isLimited = n, u;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getVideoInfo = function(e) {
    var u = e.qipuId, a = e.vid, n = e.rate;
    return u ? t.getVideoSource({
        qipuId: u,
        vid: a,
        rate: n
    }) : i.default.resolve();
}, exports.getVideoPage = function(e) {
    return new i.default(function(t, i) {
        wx.request({
            url: "https://pub.m.iqiyi.com/h5/mina/" + e + "/",
            method: "GET",
            success: function(e) {
                "200" == e.statusCode && e.data.data ? t(e.data) : i(e);
            },
            fail: i
        });
    });
}, exports.getVideoList = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
    return new i.default(function(i, u) {
        wx.request({
            url: "https://pub.m.iqiyi.com/h5/mina/avlist/" + t + "/" + e + "/",
            method: "GET",
            success: function(e) {
                i(e.data);
            },
            fail: u
        });
    });
}, exports.getSourceVideoList = function(e, t, u) {
    return new i.default(function(i, a) {
        wx.request({
            url: "https://pub.m.iqiyi.com/h5/mina/sdvlist/" + e + "/" + t + "/" + u + "/",
            method: "GET",
            success: function(e) {
                i((e.data || {}).data);
            },
            fail: a
        });
    });
}, exports.getPrevueId = function(e, t, u, a) {
    var n = "";
    return n = 2 == e ? "https://pub.m.iqiyi.com/h5/mina/prevue/" + u + "/" + e + "/?order=" + a : "https://pub.m.iqiyi.com/h5/mina/prevue/" + t + "/" + e + "/", 
    new i.default(function(e, t) {
        wx.request({
            url: n,
            method: "GET",
            success: function(i) {
                "200" == i.statusCode && i.data.data ? e(i.data) : t(i);
            },
            fail: t
        });
    });
}, exports.getVideoFeatureInfo = function(t) {
    return new i.default(function(i, u) {
        wx.request({
            url: "https://pub.m.iqiyi.com/h5/basic/videos/" + t + "/",
            method: "GET",
            success: function(t) {
                if ("200" == t.statusCode) {
                    var a = t.data;
                    if (a && a.length > 0) {
                        var n = e(a);
                        i(n);
                    } else u(a);
                } else u(t);
            },
            fail: u
        });
    });
}, exports.getAlbumFeatureInfo = function(t) {
    return new i.default(function(i, u) {
        wx.request({
            url: "https://pub.m.iqiyi.com/h5/basic/albums/" + t + "/",
            method: "GET",
            success: function(t) {
                if ("200" == t.statusCode) {
                    var a = t.data;
                    if (a && a.length > 0) {
                        var n = e(a, "album");
                        i(n);
                    } else u(a);
                } else u(t);
            },
            fail: u
        });
    });
};

var t = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../../../common/source/qiyiVideoSource")), i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/polyfill/promise"));