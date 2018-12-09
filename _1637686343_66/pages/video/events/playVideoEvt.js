function e(e) {
    if (e && e.__esModule) return e;
    var i = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (i[a] = e[a]);
    return i.default = e, i;
}

function i(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e, i) {
    e.data.fullScreen && e.player.context.exitFullScreen();
    var a = e.data, t = {
        playInfo: a.playInfo,
        contentObj: i,
        isLimited: a.isLimited
    }, r = a.hideLayerButton, o = (0, E.validateFuncMuti)(t, G), n = f(o = "defaultTmtsErr" == o && i.content ? i.content : o, i), l = a.videoLayout;
    l = T(l, o ? n.opts ? P(e, {
        content: o
    }, n.opts) : P(e, {
        content: o
    }) : i, n.specialFlag);
    var d = a.playInfo.channelId;
    "videoLimited" === o && (U.default.send({
        rpage: "wx_player",
        block: "wx_block_player_launchApp"
    }), r = c(a.fragments, a.bestView, d)), e.setData({
        videoLayout: l,
        hideLayerButton: r
    });
}

function t(e) {
    var i = e.data, a = i.isLimited, t = void 0 !== a && a, r = i.options, o = (i.videoList, 
    i.fragments), n = void 0 === o ? [] : o, d = i.bestView, s = i.playInfo, u = s.channelId, v = void 0 === u ? "" : u, m = (s.qipuId, 
    r && r.qipuId, i.hideLayerButton), g = i.videoLayout;
    if (t && !x.default.isCurrentLimitVideo(e)) return m = c(n, d, v), g = T(g, P(e, {
        content: "videoLimited"
    }, x.default.getLimitedChannelInfo(v))), e.setData({
        videoLayout: g,
        hideLayerButton: m
    }), U.default.send({
        rpage: "wx_player",
        block: "wx_block_player_launchApp"
    }), !1;
    var p = {
        playInfo: i.playInfo,
        contentObj: {
            info: i.tmtsInfo
        },
        isLimited: i.isLimited
    }, y = (0, E.validateFuncMuti)(p, H);
    if (y) {
        var b = f(y);
        return g = T(g, b.opts ? P(e, {
            content: y
        }, b.opts) : P(e, {
            content: y
        }), b.specialFlag), e.setData({
            videoLayout: g
        }), !1;
    }
    l(e, !0);
}

function r() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], i = arguments[1], a = _.default.isArray(e) && e.reduce(function(e, a) {
        return a.qipuId === i ? "current" : "current" === e ? a : e;
    }, null);
    return "current" === a ? null : a;
}

function o(e) {
    var i = e.data, a = i.originPlayInfo.subType, t = i.videoList.videos;
    "album" == a && (t = _.default.storage.handleStorageMuti("get", "CUR_VIDEOLIST_VIDEOS") || i.videoList.videos);
    var o = r(t, i.playInfo.qipuId);
    if (o && "source" === i.originPlayInfo.subType) {
        var n = e.data.sourceEpisode || {}, l = n.videos, d = n.selectedTabIndex, s = e.getSourceEpisodeIndex(l, o.qipuId);
        d != s && e.switchSource(s);
    }
    return o ? Object.assign({}, i.originPlayInfo, o, {
        channelId: i.originPlayInfo.channelId
    }) : o;
}

function n(e, i) {
    var a = null;
    return _.default.isArray(e.bestView.videos) && e.bestView.videos.length > 0 ? a = r(e.bestView.videos, i) ? r(e.bestView.videos, i) : e.bestView.videos[0] : e.recommendVideos.videos.length > 0 && (a = r(e.recommendVideos.videos, i) ? r(e.recommendVideos.videos, i) : e.recommendVideos.videos[0]), 
    a;
}

function l(e, i) {
    var a = e.data, t = e.globalPage.videoCardType, l = a.isLimited, c = Promise.resolve(null);
    if (!s(e)) return !1;
    var v = a.playInfo.qipuId;
    if ("videoList" == t) c = d(e) ? u(e) : Promise.resolve(o(e)); else if ("bestView" == t) c = Promise.resolve(r(a.bestView.videos, v)); else if ("recommend" == t) c = Promise.resolve(r(a.recommendVideos.videos, v)); else if (!t && "single" == a.originPlayInfo.subType) {
        var f = n(a, v);
        c = f ? Promise.resolve(f) : c;
    }
    c.then(function(a) {
        if (!a) return e.globalPage.videoCardType = null, l && x.default.isCurrentLimitVideo(e) && e.player.seek(0), 
        !1;
        "videoList" == e.globalPage.videoCardType && "source" == e.data.originPlayInfo.subType ? e.loadPlayFlow(a.qipuId, !1) : L(e, a, i);
    });
}

function d(e) {
    var i = e.data, a = i.playInfo.qipuId, t = i.videoList.videos || [];
    return t.length < i.videoList.total && t.slice(-1)[0].qipuId === a;
}

function s(e) {
    var i = !0;
    return "single" != e.data.originPlayInfo.subType && "recommend" == e.globalPage.videoCardType && (i = !1), 
    i;
}

function u(e) {
    var i = e.data.episode.selectedTabIndex;
    return e.switchEpisode(i + 1).then(function() {
        return o(e);
    });
}

function c() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], i = arguments[1], a = arguments[2], t = !1;
    return 4 == a && 0 == e.length ? t = !0 : 4 == a || v(i) || (t = !0), t;
}

function v() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = !0;
    return _.default.isObject(e) ? _.default.isObject(e) && !_.default.isArray(e.videos) ? i = !1 : _.default.isArray(e.videos) && 0 == e.videos.length && (i = !1) : i = !1, 
    i;
}

function f(e, i) {
    var a = !1, t = null;
    switch (e) {
      case "vipckfail":
      case "vipckTicketFail":
      case "vipckPurchaseFail":
        a = !0;
        break;

      case "miniLimit":
        t = {
            contentB: "小程序无法观看当前视频"
        };
        break;

      case "videoLimited":
        t = {
            buttonText: "打开爱奇艺APP"
        };
        break;

      case "defaultTmtsErr":
        t = _.default.isObject(i.msg) && i.msg.code ? {
            code: i.msg.code
        } : {};
    }
    return {
        specialFlag: a,
        opts: t
    };
}

function m(e, i, t) {
    return h(e, e.data.playInfo, t), C.getVideoInfo(i).then(function(a) {
        if (e.data.brandMarkFlag && e.setData({
            brandMarkFlag: !1
        }), !a && !i.qipuId) return Promise.reject({});
        e.globalPage.duration = a.info.duration;
        var t = e.data.videoLayout;
        return e.setData({
            videoLayout: S.default.setVideoModel(t, !0)
        }), a;
    }).then(function(i) {
        var a = e.data.videoLayout, t = a, r = t.networkType, o = t.videoFlowPlay, n = t.videoOffline;
        D.is6minVideo(i) && (a = S.default.showLimit(a)), ("wifi" == r || 0 == o && !n) && (D.is6minVideo(i) || (a = Object.assign({}, a, S.default.showVideo(!0)), 
        e.globalPage.switchPlayVideo = !1, e.saveRecordTimer && (clearTimeout(e.saveRecordTimer), 
        e.notCanPlayRecord = !1), e.saveRecordTimer_online && (clearTimeout(e.saveRecordTimer_online), 
        e.notCanPlayRecord_online = !1))), e.globalPage.duration = i.info.duration, e.setData({
            videoLayout: a,
            tmtsInfo: i
        }), D.is6minVideo(i) || setTimeout(function() {
            e.setData({
                "video.url": i.src
            });
        }, 0);
    }).then(function() {
        e.player.emit("ready");
    }).catch(function(i) {
        e.data.brandMarkFlag && e.setData({
            brandMarkFlag: !1
        }), e.player.pause(), a(e, i);
    });
}

function g(e) {
    var i = e.data, a = (i.fragments, i.bestView), t = void 0 === a ? {} : a, r = i.recommendVideos, o = void 0 === r ? {} : r, n = i.playInfo, l = void 0 === n ? {} : n, d = l.qipuId, s = void 0 === d ? "" : d, u = l.subType;
    if ("single" == (void 0 === u ? "" : u)) {
        if (y(s, t) > -1) {
            var c = p(e, s, t);
            e.setData({
                bestView: c
            });
        } else if (y(s, o) > -1) {
            var v = p(e, s, o);
            e.setData({
                recommendVideos: v
            });
        }
    } else if (y(s, t) > -1) {
        var f = p(e, s, t);
        e.setData({
            bestView: f
        });
    }
}

function p(e, i, a) {
    var t = y(i, a);
    return e.videoListScrollLeft(a, t);
}

function y(e, i) {
    var a = -1;
    return i && i.videos && i.videos.length > 0 && i.videos.forEach(function(i, t) {
        i.qipuId == e && (a = t);
    }), a;
}

function b(e) {
    var i = x.default.isCurrentLimitVideo(e);
    e.player.on("ended", function() {
        var a = e.data, r = a.isLimited, o = a.playInfo, n = a.tmtsInfo;
        D.is6minVideo(e.data.tmtsInfo) && 1 == e.data.fullScreen && e.player.exitFullScreen(), 
        e.data.brandMarkFlag && e.setData({
            brandMarkFlag: !1
        }), t(e), (!r || r && i) && e.saveRecord(o, {}, n, !0);
    }), e.player.on("timeupdate", function(i) {
        var a = i.detail.currentTime, t = e.data, r = t.isLimited, o = t.playInfo;
        if (e.data.brandMarkFlag || e.globalPage.switchPlayVideo || e.setData({
            brandMarkFlag: !0
        }), !e.player.firstRun) if (e.player.firstRun = !0, e.globalPage.isLogin || r) {
            if (e.globalPage.isLogin && !r) if ("single" == (0, j.getSubType)(o)) e.uploadRecord(-1, null); else if (e.globalPage.useRecord && !r) {
                var n = e.getRecord(e.seek);
                n && n.then(function(i) {
                    e.uploadRecord(i, null);
                }, function(i) {
                    e.uploadRecord(-1, null);
                }).catch(function(e) {});
            }
        } else e.seek();
        a > 0 && !r && (e.globalPage.currentTime = a, e.savePlayRecord(a));
    }), e.player.on("pause", function() {
        var a = e.data.isLimited;
        e.globalPage.currentTime && !e.globalPage.switchPlayVideo && e.player.firstRun && (!a || a && i) && e.uploadRecord(e.globalPage.currentTime, null), 
        e.saveRecordTimer_online && (clearTimeout(e.saveRecordTimer_online), e.notCanPlayRecord_online = !1);
    });
}

function h(e, i) {
    var a = i.channelId, t = i.bossMixer, r = i.qipuId, o = i.aid, n = i.albumQipuId, l = i.albumId, d = i.isFeatureFilm, s = i.cType, u = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], c = x.default.checkIsLimited(a, d, s), v = e.app.globalData.showScene, f = e.data, m = f.options, g = f.isPrevue, p = !1;
    1058 != v && 1035 != v && 1036 != v || r == m.qipuId && (p = !0);
    var y = I(e, u);
    e.limitedVfrm && (y = e.limitedVfrm);
    var b = e.vvStorage || {}, h = void 0 !== e.data.originOptions.vfm ? {
        vfm: e.data.originOptions.vfm
    } : {};
    A.default.init(Object.assign({
        c1: a || "",
        ht: t ? 1 : 0,
        r: r || "",
        aid: n || l || o || "",
        rfr: e.data.rfr || "",
        vfrm: y,
        u: b.aUid,
        pu: b.uid,
        as: b.asArg,
        ve: b.ve,
        ispre: c && !p && g ? 1 : ""
    }, h));
}

function I(e, i) {
    var a = e.data.playInfo.subType, t = e.data.rfr || "", r = "0", o = "0";
    return i ? e.globalPage.vfrmRun ? (r = "single" != a ? "2" : "4", o = "2") : (e.globalPage.vfrmRun = !0, 
    r = "3", o = t && N.default.rpageMap["" + t] ? N.default.rpageMap["" + t] : "2") : (r = "1", 
    o = "2"), "0-" + o + "-0-" + r;
}

function P(e, i) {
    var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, t = D.getError(i, a);
    return t.buttonclick = t.buttonclick || l.bind(null, e, !1), t;
}

function T(e, i) {
    var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    return Object.assign({}, e, {
        videoErrorContent: !0,
        error: i,
        videoLoading: !1,
        canPlay: !1,
        videoLimitPic: !1,
        videoLimitIcon: !1,
        specialShow: a
    });
}

function L(e, i) {
    var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    e.globalPage.switchPlayVideo = !0, e.player.firstRun = !1;
    var t = i && i.isFeatureFilm, r = i && i.cType, o = i && i.qipuId, n = e.data, l = n.options, d = n.videoList, s = n.originPlayInfo, u = void 0 === s ? {} : s, c = n.episode, v = (l && l.qipuId, 
    i && i.channelId), f = x.default.checkIsLimited(v, t, r), g = x.default.isCurrentLimitVideo(e, i);
    if ((!f || f && g) && (a ? e.uploadRecord(0, null) : e.uploadRecord(e.globalPage.currentTime, null)), 
    e.globalPage.firstRun = !1, e.globalPage.firstSeek = !1, !i) return e.globalPage.currentTime = 0, 
    void e.player.seek(0);
    e.saveRecordTimer && (clearTimeout(e.saveRecordTimer), e.notCanPlayRecord = !1), 
    e.saveRecordTimer_online && (clearTimeout(e.saveRecordTimer_online), e.notCanPlayRecord_online = !1), 
    i.issueTime && i.issueTime.length > 10 && (i.issueTime = i.issueTime.substring(0, 10));
    var p = R.default.setPlayInfo(i, u), y = e.data.pluginParams, b = e.data.videoTitleObj, h = e.data.subscribePlayInfo, I = {};
    if (w(e)) {
        var L = V(e, p);
        y = L || y, I = q(p), h = p, B.default.loadHotComments({
            qipuId: p.qipuId
        }, e).then(function(e) {
            _.default.isArray(e) && e.length > 0 && U.default.send({
                rpage: "wx_player",
                block: "wx_block_player_goodcomment"
            });
        }), B.default.loadNewComments({
            qipuId: p.qipuId
        }, {}, e).then(function(e) {
            _.default.isArray(e) && e.length > 0 && U.default.send({
                rpage: "wx_player",
                block: "wx_block_player_newcomment"
            });
        }), Q.default.getPageUrl(p);
    }
    h && (h.shareCountCN = _.default.formatSharedNum(h.shareCount)), "single" == u.subType && (e.setData({
        agreeSingleVideo: {}
    }), e.checkIfAgreeSingle(p.qipuId)), e.globalPage.currentTime = 0;
    var C = !1;
    d && _.default.isArray(d.videos) && d.videos.length > 0 && d.videos.forEach(function(e, i) {
        o == e.qipuId && i > 0 && (C = !0);
    });
    var M = x.default.getLimitedChannelInfo(v), F = x.default.isUnlimitedVideo(e, p);
    if ("single" == i.subType && O.default.handleSingleSource(i, e), (4 == v || 15 == v) && C && !F || x.default.isRelatedVideoPlay(e, p)) {
        var S = e.data.videoLayout;
        return S = T(S, P(e, {
            content: "videoLimited"
        }, M)), e.setData({
            playInfo: p,
            hideLayerButton: !0,
            videoLayout: S,
            isPrevue: !1,
            pluginParams: y,
            subscribePlayInfo: h,
            videoTitleObj: I.titleObj || b
        }), U.default.send({
            rpage: "wx_player",
            block: "wx_block_player_launchApp"
        }), !1;
    }
    e.setData({
        playInfo: p,
        isPrevue: !1,
        pluginParams: y,
        subscribePlayInfo: h,
        videoTitleObj: I.titleObj || b
    }), wx.canIUse("createSelectorQuery") && k(e, p.qipuId), x.default.getPrevueInfo(e, p).then(function(i) {
        var t = x.default.getTmtsParam(e, i);
        m(e, t, a);
    }), "album" == i.subType && c && c.isshow && e.openEpisode();
}

function k(e, i) {
    if (!i || !e) return !1;
    var a = wx.createSelectorQuery(), t = wx.getSystemInfoSync().windowWidth;
    a.select("#node_" + i).boundingClientRect(function(i) {
        var a = i && i.left;
        ((i && i.right) <= 0 || a > t) && g(e);
    }).exec();
}

function V(e, i) {
    e.data.launchApp;
    var a = i.subType;
    a.subType, a.qipuId, a.albumId, e.globalPage.videoCardType;
    return _.default.string.schemaStr(M.default.getPlayerParam(i.albumId, i.qipuId), "player", "472");
}

function w(e) {
    var i = !1, a = e.data.originPlayInfo.subType;
    return ("single" == a || "single" != a && "videoList" == e.globalPage.videoCardType) && (i = !0), 
    i;
}

function q(e) {
    var i = {}, a = "", t = e.subType, r = e.albumName, o = e.pd, n = e.shortTitle;
    switch (t) {
      case "album":
        i = {
            albumName: r,
            shortTitle: r && o ? o : n || ""
        }, a = r && o ? r + " 第" + o + "集" : n;
        break;

      case "source":
        i = {
            albumName: r,
            shortTitle: n
        }, a = r + ": " + n;
        break;

      case "movie":
        i = {
            albumName: r,
            shortTitle: n || (r || "")
        }, a = n ? "" + n : r ? "" + r : "";
        break;

      case "single":
        i = {
            albumName: r,
            shortTitle: n || (videoName || "")
        }, a = n ? "" + n : videoName ? "" + videoName : "";
    }
    return {
        titleObj: i,
        videoTitle: a
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _ = i(require("../../../common/utils/util")), C = (i(require("../../../common/user/user")), 
e(require("../service/videoService"))), R = i(require("../service/playInfoService")), M = i(require("../../../common/schema/schemaStr")), F = require("../../../components/player/VideoPlayer"), S = i(require("./videoLayoutEvt")), x = i(require("./limitPlayEvt")), O = i(require("./socialEvt")), D = e(require("../../../common/source/videoUtil")), E = require("../../../components/videoLayout/validate/validateLayer"), j = require("../common/commonService"), A = i(require("../service/bindVV")), N = i(require("../common/config")), B = i(require("../../../components/comment/comment")), U = i(require("../../../common/pingback/block")), Q = (i(require("../../../common/pingback/click")), 
i(require("../../../common/commonFunc/clientGuide"))), G = [ [ {
    strategy: "videoLimited",
    errorMsg: "videoLimited"
} ], [ {
    strategy: "anonymousLayer",
    errorMsg: "anonymousLayer"
} ], [ {
    strategy: "vipCk",
    errorMsg: "vipckfail"
} ], [ {
    strategy: "purchaseCk",
    errorMsg: "vipckPurchaseFail"
} ], [ {
    strategy: "ticketCk",
    errorMsg: "vipckTicketFail"
} ], [ {
    strategy: "ticketCkCode",
    errorMsg: "vipckTicketFail"
} ], [ {
    strategy: "purchaseCkCode",
    errorMsg: "vipckPurchaseFail"
} ], [ {
    strategy: "miniLimitCkCode",
    errorMsg: "miniLimit"
} ], [ {
    strategy: "defaultTmtsErr",
    errorMsg: "defaultTmtsErr"
} ] ], H = [ [ {
    strategy: "isTennisVip",
    errorMsg: "miniLimit"
} ], [ {
    strategy: "purchaseCk",
    errorMsg: "vipckPurchaseFail"
} ], [ {
    strategy: "ticketCk",
    errorMsg: "vipckTicketFail"
} ], [ {
    strategy: "anonymousLayer",
    errorMsg: "anonymousLayer"
} ], [ {
    strategy: "vipCk",
    errorMsg: "vipckfail"
} ] ];

exports.default = {
    init: function(e) {
        e.player = new F.Player(e), e.player.firstRun = !1, A.default.bind(e.player, e), 
        b(e);
    },
    playVideo: m,
    getTmtsError: P,
    showError: T,
    getNextVideo: r,
    isVideoLast: function(e, i) {
        var a = e && e.length;
        return !(!e || !e[a - 1] || e[a - 1].qipuId != i);
    },
    switchPlayVideo: L,
    setVideoTitle: q,
    initVV: h
};