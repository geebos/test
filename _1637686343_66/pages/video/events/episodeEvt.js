function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t() {
    var e = t.animation;
    return e || (e = t.animation = wx.createAnimation({
        duration: 200,
        timingFunction: "ease"
    })), e;
}

function i(e) {
    var t = e.pd, i = e.share, o = e.videoList, s = e.animation, r = a(t), c = n(o), p = c.tabs, v = c.videos;
    return {
        height: d(p.length > 1 ? 100 : 0, i),
        scrollTop: l(t, v[r], u()),
        tabs: p,
        tabSize: p.length,
        videos: v,
        selectedTabIndex: r,
        animation: s,
        isshow: !0
    };
}

function a(e) {
    return Math.floor((e - 1) / 50);
}

function n(e) {
    var t = [], i = [];
    return o(e)(function(a, n) {
        t.push(s(a, n, e.total)), i.push(r(e, a));
    }), {
        tabs: t,
        videos: i
    };
}

function o(e) {
    var t = Math.ceil(e.total / 50);
    return function(e) {
        for (var i = 0; i < t; i++) e(i, t);
    };
}

function s(e, t, i) {
    return 50 * e + 1 + "-" + (e == t - 1 ? i : 50 * (e + 1));
}

function r(e, t) {
    var i = 50 * t, a = 50 * (t + 1);
    return e.videos.filter(function(e) {
        return e.pd > i && e.pd <= a;
    });
}

function d(e, t) {
    return wx.getSystemInfoSync().windowHeight - g.default.getPxByRpx(422, 120, e, t ? 96 : 0);
}

function l(e, t, i) {
    var a = t.reduce(function(t, i) {
        return i.pd <= e ? ++t : t;
    }, 0);
    return (Math.ceil(a / 5) - 1) * i;
}

function u() {
    return g.default.getPxByRpx(110, 30);
}

function c(e, t) {
    var i = g.default.getPxByRpx(110) + g.default.getPxByRpx(20), a = i * (t - 1) - (wx.getSystemInfoSync().windowWidth - i) / 2;
    return Object.assign({}, e, {
        scrollLeft: a
    });
}

function p(e) {
    var t = e.data, i = t.playInfo, a = t.videoList.total, n = a - (t.videoList.videos && t.videoList.videos.length || a);
    return i.pd - n || 1;
}

function v(e, t, i) {
    var a = n(i), o = a.tabs, s = a.videos;
    return {
        height: e.height,
        tabs: o,
        tabSize: o.length,
        videos: s,
        selectedTabIndex: t
    };
}

function h() {
    var e = h.animation;
    return e || (e = h.animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
    })), e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var g = e(require("../../../common/utils/util")), f = e(require("./playVideoEvt")), b = e(require("../service/videoListService")), y = (e(require("../../../common/commonFunc/clientGuide")), 
e(require("./limitPlayEvt")));

exports.default = {
    playVideoEpisode: function(e) {
        this.player.pause();
        var t = this.data, i = e.currentTarget.dataset.qipuId, a = t.playInfo, n = t.launchApp, o = t.isLimitEpisode || !1, s = t.launchEpisodeCard || !1, r = t.vrsMapQipuId || 0, d = a.albumId || "", l = a.channelId || "";
        if (n && o && s && i != r && this.clickPingback({
            block: "wx_block_player_album",
            rseat: "wx_launchApp",
            aid: d,
            c1: l
        }), this.clickPingback({
            block: "wx_block_player_album",
            rseat: "wx_player_album",
            aid: d,
            c1: l
        }), this.globalPage.episodeCardFlag || (this.globalPage.episodeCardFlag = !0), i == a.qipuId) return !1;
        this.globalPage.videoCardType = "videoList";
        var u = t.originPlayInfo.subType, c = t.videoList.videos;
        "album" == u && (c = g.default.storage.handleStorageMuti("get", "CUR_VIDEOLIST_VIDEOS") || t.videoList.videos);
        var p = c.filter(function(e) {
            return e.qipuId === i;
        })[0];
        p.playCountCN = g.default.numToChinaNum(p.playCount);
        var v = Object.assign({}, t.originPlayInfo, p, {
            channelId: t.originPlayInfo.channelId
        }), h = getApp().globalData, b = h.showScene, m = h.shareCurrentQipuId, w = h.vrsMapFlag;
        y.default.unlimtedScene(b) && !w && (getApp().globalData.vrsMapObj[m] = t.vrsMapQipuId, 
        getApp().globalData.vrsMapFlag = !0), f.default.switchPlayVideo(this, v);
    },
    openEpisode: function() {
        var e = this.data, a = t();
        a.translate3d(0, 0, 0).step();
        var n = i({
            pd: e.playInfo.pd || 1,
            share: e.share,
            videoList: e.videoList,
            animation: a.export()
        });
        this.setData({
            episode: n
        });
    },
    closeEpisode: function() {
        var e = this.data, i = (e.playInfo, e.episode), a = e.videoList, n = t();
        n.translate3d(0, "100%", 0).step(), i = Object.assign({}, i, {
            animation: n.export(),
            isshow: !1
        }), a = c(a, p(this)), this.setData({
            episode: i,
            videoList: a
        });
    },
    videoListRight: function() {
        var e = this;
        if (this.videoListRight.loading) return Promise.resolve();
        var t = this.data, i = t.videoList, a = i.videos, n = i.total, o = a.length;
        if (n <= o) return Promise.resolve();
        this.videoListRight.loading = !0;
        var s = Math.ceil(o / 50) + 1;
        return b.default.addVideo(t.playInfo.albumId, s).then(function(i) {
            if (i.length > 0) {
                var n = Object.assign({}, t.videoList, {
                    videos: a.concat(i),
                    page: s
                });
                e.setData({
                    videoList: n
                });
            }
            e.videoListRight.loading = !1;
        }, function() {
            return e.videoListRight.loading = !1, Promise.reject();
        });
    },
    playVideoAlbum: function(e) {
        this.globalPage.videoCardType = "bestView", this.clickPingback({
            block: "wx_block_player_kandian",
            rseat: "wx_player_kandian"
        });
        var t = this.data.bestView || {}, i = e.currentTarget.dataset.qipuId, a = t && g.default.isArray(t.videos) && t.videos.reduce(function(e, t) {
            return e || (t.qipuId === i ? t : e);
        }, null);
        f.default.switchPlayVideo(this, a);
    },
    switchEpisode: function(e) {
        var t = this;
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return this.getMoreVideoList(e).then(function() {
            var i = t.data, a = a || i.episode;
            a = v(a, e, i.videoList), t.setData({
                episode: a
            });
        });
    },
    getMoreVideoList: function(e) {
        var t = this, i = this.data.videoList, a = i.videos, n = i.page;
        return (void 0 === n ? 1 : n) < e + 1 ? this.videoListRight().then(function() {
            return t.getMoreVideoList(e);
        }) : Promise.resolve(a);
    },
    switchEpisodeTab: function(e) {
        var t = this.data, i = e.detail.current;
        i = void 0 === i ? e.currentTarget.dataset.tab : i;
        var a = t.episode;
        a.selectedTabIndex !== i && (a = Object.assign({}, a, {
            selectedTabIndex: i,
            isshow: !0
        }), this.switchEpisode(i, a));
    },
    playFragment: function(e) {
        var t = e.currentTarget.dataset.qipuId;
        this.clickPingback({
            block: "wx_block_player_cut",
            rseat: "wx_player_cut"
        }), wx.navigateTo({
            url: "/subPackage/pages/fragment/fragment?qipuId=" + t
        });
    },
    playRecommendVideo: function(e) {
        var t = e.currentTarget.dataset.qipuId, i = this.data, a = (i.playInfo, i.recommendVideos), n = i.originPlayInfo;
        if (this.clickPingback({
            block: "wx_block_player_sidevideo",
            rseat: "wx_player_sidevideo"
        }), "single" == n.subType) {
            this.globalPage.videoCardType = "recommend";
            var o = a && g.default.isArray(a.videos) && a.videos.reduce(function(e, i) {
                return e || (i.qipuId === t ? i : e);
            }, null);
            f.default.switchPlayVideo(this, o);
        } else wx.navigateTo({
            url: "/pages/video/video?qipuId=" + t
        });
    },
    switchDesc: function() {
        var e = this.data.desc, t = h(), i = e.showDesc;
        t.rotate(i ? 0 : 180).step(), e = Object.assign({}, e, {
            showDesc: !i,
            filmAnimation: t.export()
        }), this.setData({
            desc: e
        });
    },
    pbScrollLeft: c,
    videoListScrollLeft: function(e, t) {
        var i = (g.default.getPxByRpx(260) + g.default.getPxByRpx(30)) * (t + 1) - wx.getSystemInfoSync().windowWidth;
        return Object.assign({}, e, {
            scrollLeft: i
        });
    }
};