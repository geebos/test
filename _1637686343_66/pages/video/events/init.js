function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e, t) {
    var a = t.kvs;
    return "true" === a.wxplayer_showOn && (!!e.data.launchApp && (!!a.wxplayer_img && (!!("1" != a.wxplayer_type && "2" != a.wxplayer_type || a.wxplayer_url) && !("3" == a.wxplayer_type && !a.wxplayer_schema))));
}

function r(e, t) {
    var a = e.playInfo, r = e.bestView, o = e.recommendVideos, n = e.videoList, l = !1, s = null;
    return l = i(o, t), s = 1 == l ? "recommend" : null, l || "single" == a.subType || (s = 1 == (l = i(r, t)) ? "bestView" : null), 
    l || "album" != a.subType && "source" != a.subType || (s = 1 == (l = i(n.videos, t)) ? "videoList" : null), 
    s;
}

function i(e, t) {
    var a = -1;
    return v.default.isArray(e) && e.length > 0 && (a = e.findIndex(function(e) {
        return e.qipuId == t;
    })), a > -1;
}

function o(e, t) {
    var a = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
    return d(t).then(function(i) {
        var o = n(e, i, a), s = o.playInfo, u = o.videoList, d = e.data, c = d.launchApp, p = d.pluginParams, f = d.vrsMapQipuId, g = d.currentPages, y = getApp().globalData, h = y.showScene, w = y.shareCurrentQipuId, I = y.vrsMapFlag;
        A.default.unlimtedScene(h) && !I && a && 1 == g ? (getApp().globalData.vrsMapObj[w] = s.qipuId, 
        getApp().globalData.vrsMapFlag = !0, getApp().globalData.vrsMapQipuId = s.qipuId, 
        f = s.qipuId) : A.default.unlimtedScene(h) && 1 != g && (f = getApp().globalData.vrsMapQipuId), 
        "single" == s.subType ? (e.checkIfAgreeSingle(t), P.default.handleSingleSource(s, e)) : e.checkIsSubscribe(s), 
        D.default.getPageUrl(s), a && (e.globalPage.videoCardType = r(o, t), l(o), o.videoList = m(e, s, u)), 
        c && (p = v.default.string.schemaStr(b.default.getPlayerParam(s.albumId, s.qipuId), "player", "472"));
        var _ = V.default.setVideoTitle(s);
        return o.playInfo && (o.playInfo.shareCountCN = v.default.formatSharedNum(o.playInfo.shareCount)), 
        e.setData(Object.assign(o, {
            vrsMapQipuId: f,
            pluginParams: p,
            subscribePlayInfo: o.playInfo,
            videoTitleObj: _.titleObj || {}
        })), void 0 !== s.prevueId ? Promise.resolve(s) : A.default.getPrevueInfo(e, s);
    }).then(function(t) {
        j.default.getContentDisplay(t.qipuId).then(function(a) {
            a.data && a.data.contentDisplayEnable ? (L.default.loadNewComments({
                qipuId: t.qipuId
            }, {}, e).then(function(e) {
                v.default.isArray(e) && e.length > 0 && C.default.send({
                    rpage: "wx_player",
                    block: "wx_block_player_newcomment"
                });
            }), L.default.loadHotComments({
                qipuId: t.qipuId,
                hotSize: 10
            }, e).then(function(e) {
                v.default.isArray(e) && e.length > 0 && C.default.send({
                    rpage: "wx_player",
                    block: "wx_block_player_goodcomment"
                });
            })) : e.setData({
                newComments: {
                    title: "最新评论",
                    type: "time",
                    comments: [],
                    isShowComment: !0
                },
                subLoad: "noMore"
            });
        });
        var r = A.default.getTmtsParam(e, t);
        V.default.playVideo(e, r, a);
    }).catch(function(t) {
        e.setData({
            load: "error"
        });
    });
}

function n(e, t, a) {
    var r = t;
    r.fragments = v.default.isArray(r.fragments) ? r.fragments : [], r.bestViews = v.default.isArray(r.bestViews) ? r.bestViews : [], 
    r.recommendVideos = v.default.isArray(r.recommendVideos) ? r.recommendVideos : [];
    var i = k.default.getPlayInfo(r.playInfo, r.videoList), o = x.default.initBestView(r.bestViews, i), n = o = v.default.isObject(o) && v.default.isArray(o.videos) && o.videos.length > 0 ? o : {
        title: "",
        videos: []
    }, l = k.default.getFragments(r.fragments), s = x.default.getRecommendVideos(r.recommendVideos, i);
    s = v.default.isObject(s) && v.default.isArray(s.videos) && s.videos.length > 0 ? s : {
        title: "",
        videos: []
    };
    var u = a ? q.default.getVideoList(r.videoList, i) : e.globalPage.sourceVideoList || e.data.videoList;
    return delete r.bestViews, i && (i.shareCountCN = v.default.formatSharedNum(i.shareCount)), 
    Object.assign(r, {
        bestView: o,
        sourceBestView: n,
        fragments: l,
        load: "complete",
        playInfo: i,
        originPlayInfo: i,
        videoList: u,
        recommendVideos: s
    });
}

function l(e) {
    v.default.isArray(e.wallBaseInfo) && e.wallBaseInfo.length > 2 && C.default.send({
        rpage: "wx_player",
        block: "wx_partstars"
    }), v.default.isObject(e.videoList) && v.default.isArray(e.videoList.videos) && e.videoList.videos.length > 0 && C.default.send({
        rpage: "wx_player",
        block: "wx_block_player_album"
    }), v.default.isObject(e.bestView) && v.default.isArray(e.bestView.videos) && e.bestView.videos.length > 0 && C.default.send({
        rpage: "wx_player",
        block: "wx_block_player_kandian"
    }), v.default.isObject(e.fragments) && v.default.isArray(e.fragments.videos) && e.fragments.videos.length > 0 && C.default.send({
        rpage: "wx_player",
        block: "wx_block_player_cut"
    }), v.default.isObject(e.recommendVideos) && v.default.isArray(e.recommendVideos.videos) && e.recommendVideos.videos.length > 0 && C.default.send({
        rpage: "wx_player",
        block: "wx_block_player_sidevideo"
    });
}

function s(e) {
    var t = {};
    return wx.canIUse && (t = {
        shareBtn: wx.canIUse("button.open-type.share"),
        toMiniProgram: v.default.compatibility.versionSpecifyCompare("2.0.7")
    }), t;
}

function u() {
    var e = wx.getSystemInfoSync().windowHeight, t = S.default.videoHeightRpx, a = v.default.getPxByRpx(t);
    return a > 0 ? e - a : 392;
}

function d(e) {
    return h.getVideoPage(e).then(function(e) {
        var t = e.data;
        return q.default.loadVideoList(t);
    }).then(function(e) {
        return c(e).then(function(e) {
            return e;
        });
    }).then(function(e) {
        if (getApp().globalData.mapFlag || !1) {
            var t = e.playInfo, a = t.qipuId, r = void 0 === a ? "" : a, i = t.vrsId, o = void 0 === i ? "" : i;
            getApp().globalData.qipuMap = {
                qipuId: r,
                vrsId: o
            }, getApp().globalData.mapFlag = !1;
        }
        return e;
    });
}

function c(e) {
    var t = v.default.isObject(e.playInfo) && v.default.isArray(e.playInfo.maCircleIds) ? e.playInfo.maCircleIds : [];
    return t.length <= 2 ? Promise.resolve(e) : w.getPaopaoList().then(function(a) {
        var r = t.toString(), i = a.atoken;
        return w.getPaopaoBaseInfo(i, r).then(function(t) {
            return e.wallBaseInfo = (0, _.filterPaopaoStar)(t), e;
        }, function() {
            return e;
        });
    }).catch(function(t) {
        return e;
    });
}

function p(e) {
    return I.commonGetRequest({
        url: v.default.OUTERHOST.PUB + "/h5/mina/resource/" + e + "/"
    }).then(function(e) {
        return e;
    }).catch(function(e) {
        return v.default.isObject(e) && v.default.isArray(e.items) && v.default.isObject(e.items[0]) && v.default.isObject(e.items[0].kvs) ? e.items[0] : err;
    });
}

function f(e) {
    e.globalPage = {
        firstTime: !0,
        duration: 0,
        switchPlayVideo: !1,
        firstRun: !1,
        currentTime: 0,
        firstSeek: !1,
        switchSourceEpisodeFlag: !1,
        videoCardType: null,
        sourceVideoList: null,
        useRecord: !1,
        isLogin: y.default.isLogin(),
        vrsMapQipuId: 0,
        vrsMapObj: {},
        vrsMapFlag: !1,
        vfrmRun: !1,
        openSourceEpisodeFlag: !1,
        episodeCardFlag: !1
    }, e.vvStorage = {
        aUid: y.default.getAnonymousUid(),
        uid: y.default.getUid(),
        asArg: y.default.getAS(),
        ve: y.default.getWeid()
    };
}

function m(e, t, a) {
    var r = a;
    if ("source" === t.subType) r = e.sourceScrollLeft(a, t.qipuId); else if ("album" === t.subType) {
        var i = g(t, a);
        r = e.pbScrollLeft(a, i);
    }
    return r;
}

function g(e, t) {
    var a = t.total, r = a - (t.videos && t.videos.length || a);
    return e.pd - r || 1;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var v = t(require("../../../common/utils/util")), y = t(require("../../../common/user/user")), b = t(require("../../../common/schema/schemaStr")), h = e(require("../service/videoService")), w = e(require("../../../components/paopao/paopaoService")), I = e(require("../../../common/serviceApi/serviceApi")), _ = require("../../../components/paopao/paopao"), q = t(require("../service/videoListService")), x = t(require("../service/bestViewService")), A = t(require("./limitPlayEvt")), V = t(require("./playVideoEvt")), P = t(require("./socialEvt")), S = t(require("../common/config")), k = t(require("../service/playInfoService")), O = e(require("../../../common/commonFunc/launchApp")), L = t(require("../../../components/comment/comment")), j = t(require("../../../components/comment/commentService")), C = t(require("../../../common/pingback/block")), D = t(require("../../../common/commonFunc/clientGuide"));

exports.default = {
    initPage: function(e, t) {
        y.default.init(), f(e), e.initVideoLayout().then(function(a) {
            var r = s();
            e.globalPage.useRecord = t.useRecord;
            var i = u();
            e.setData({
                videoLayout: a,
                ifCanIUse: r,
                scrollBodyHeight: i,
                originOptions: t,
                currentPages: getCurrentPages().length,
                launchApp: O.isSupportLaunchApp()
            }), 1 == e.data.currentPages && (e.app.globalData.vrsMapFlag = !1, e.app.globalData.vrsMapQipuId = 0, 
            e.app.globalData.vrsMapObj = {});
        });
        var r = e.getLocalRecord(t);
        e.setData({
            options: r
        }), V.default.init(e);
        var i = r.qipuId;
        p("8106329312").then(function(t) {
            v.default.isObject(t) && v.default.isObject(t.kvs) && (t.kvs.wxplayer_schema = v.default.os.isIOS ? t.kvs.wxplayer_Ios : t.kvs.wxplayer_Android, 
            t.kvs.showBanner = a(e, t), e.setData({
                resourceInfo: t.kvs
            }), t.kvs.showBanner && C.default.send({
                rpage: "wx_player",
                block: "wx_block_player_hdbanner"
            }));
        }), o(e, i);
    },
    loadVideoPage: d,
    initThenPlay: o
};