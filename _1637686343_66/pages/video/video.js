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

var a = t(require("../../common/user/user")), i = t(require("../../common/utils/util")), o = (t(require("../../common/schema/schemaStr")), 
t(require("../../common/polyfill/promise")), t(require("../../common/pingback/click"))), n = t(require("../../common/pingback/block")), r = t(require("../../common/pingback/pingbackArgs")), s = require("../../components/player/VideoPlayer"), l = require("../../common/form/form"), c = (e(require("service/videoService")), 
t(require("service/bindVV")), t(require("events/episodeEvt"))), u = t(require("service/videoControl")), d = t(require("events/sourceEpisodeEvt")), m = t(require("events/videoLayoutEvt")), p = t(require("events/limitPlayEvt")), h = t(require("events/recordEvt")), f = t(require("../../components/searchLayout/bind/bindUtil")), g = (t(require("../../components/history/playRecordService")), 
t(require("../../components/history/recordService")), t(require("../../components/login/login"))), v = (t(require("../../components/subscribe/playSubService")), 
t(require("../../components/mutiAccount/mutiAccount"))), b = (require("../../components/videoLayout/validate/validateLayer"), 
t(require("../../common/commonFunc/clientGuide"))), y = e(require("../../common/commonFunc/launchApp")), k = (require("../../components/paopao/paopao"), 
t(require("../../components/homeLead/homeLead"))), _ = t(require("../../common/pingback/pv")), I = t(require("./events/init")), w = t(require("./events/socialEvt")), C = t(require("../../components/comment/commentService")), q = t(require("../../components/comment/comment")), P = {
    getNextLayerVideo: function() {
        p.default.getNextLayerVideo(this);
    },
    goAlbumInfo: function() {
        var e = this.data.originPlayInfo.albumId;
        this.clickPingback({
            block: "",
            rseat: "wx_player_albumname"
        }), wx.navigateTo({
            url: "/subPackage/pages/playDetail/playDetail?qipuId=" + e
        });
    },
    loginSuccess: function() {
        var e = this.data.playInfo.qipuId || "";
        this.loadPage({
            qipuId: e
        });
    },
    shareInVideo: function(e) {
        var t = e.detail.formId, a = e.currentTarget.dataset, o = a.shareCount, n = void 0 === o ? 0 : o, r = a.subType, s = void 0 === r ? "" : r, c = a.rseat, u = void 0 === c ? "" : c, d = a.aid, m = void 0 === d ? "" : d, p = this.data.playInfo, h = void 0 === p ? {} : p;
        if (n && n >= 100) {
            var f = n + 1;
            "single" == s ? this.setData({
                "playInfo.shareCount": f,
                "playInfo.shareCountCN": i.default.formatSharedNum(f)
            }) : this.setData({
                "subscribePlayInfo.shareCount": f,
                "subscribePlayInfo.shareCountCN": i.default.formatSharedNum(f)
            });
        }
        (0, l.collectFormIdMuti)(t, u), this.clickPingback({
            block: "",
            rseat: u,
            aid: m,
            c1: h.cid
        });
    }
}, S = {
    app: getApp(),
    data: {
        curpage: "wx_player",
        isPrevue: !1,
        hideLayerButton: !1,
        firstTime: !0,
        bestViewFlag: !1,
        desc: {},
        episode: {},
        sourceEpisode: {},
        load: "show",
        subLoad: "show",
        videoControl: {
            showShare: !1
        },
        ifCanIUse: {},
        video: {},
        tmtsInfo: {},
        pluginParams: "",
        videoTitleObj: {},
        agreeSingleVideo: {},
        vrsMapQipuId: 0,
        launchEpisodeCard: !0,
        isLimitEpisode: !1,
        brandMarkFlag: !1,
        fullScreen: !1,
        isAndroid: i.default.os.isAndroid
    },
    onLoad: function(e) {
        this.app.globalData.mapFlag = !0, e = e || {}, this.loadPage(e), this.setData({
            rfr: e.rfr || ""
        }), this.seek.firstPlay = !1, q.default.setCommentCondition({
            pageNum: 1,
            isFinal: !1
        }, this), i.default.isFunction(this.app.emitter.on) && this.app.emitter.on("hideMutiDialog", this.hideMutiDialog), 
        1 == k.default.currentPage() && n.default.send({
            rpage: "wx_player",
            block: "wx_block_player_home"
        });
    },
    openOperateLink: function(e) {
        var t = e.currentTarget.dataset, a = t.operateType, o = t.aid, n = t.cid;
        if (this.clickPingback({
            block: "wx_block_player_hdbanner",
            rseat: "wx_launchApp",
            aid: o,
            c1: n
        }), "3" == a || "4" == a) return i.default.compatibility.versionSpecifyCompare("1.9.5") || y.launchAppErrorFunc("wx_player", "storage"), 
        !1;
        var r = this.data.resourceInfo.wxplayer_url, s = "1" == a ? "mina" : "2" == a ? "webview" : "";
        if (!s || !r) return !1;
        y.openCustomizeLink(s, r);
    },
    loadPage: function(e) {
        i.default.compatibility.logManager("info", {
            qipuId: e.qipuId
        }), I.default.initPage(this, e);
    },
    loadPlayFlow: function(e, t) {
        return I.default.initThenPlay(this, e, t);
    },
    clickPingback: function(e) {
        o.default.send({
            rpage: "wx_player",
            block: e.block,
            rseat: e.rseat,
            aid: e.aid,
            c1: e.c1
        });
    },
    launchPingback: function(e) {
        var t = this.data.playInfo, a = void 0 === t ? {} : t, i = (e.currentTarget.dataset || {}).launch || !1, o = a.channelId || "", n = a.albumId || "";
        this.clickPingback({
            block: "wx_block_player_launchApp",
            rseat: "wx_player_App",
            aid: n,
            c1: o
        }), i && this.clickPingback({
            block: "wx_block_player_launchApp",
            rseat: "wx_launchApp",
            aid: n,
            c1: o
        });
    },
    onShow: function(e) {
        var t = r.default.vfmInPath("pages/video/video");
        _.default.send(Object.assign({
            rpage: "wx_player"
        }, t));
        var i = this.app.globalData;
        this.data.firstTime;
        this.setData({
            launchApp: y.isSupportLaunchApp()
        });
        var o = this.data;
        if (this.onShow.run ? (this.vvStorage = {
            aUid: a.default.getAnonymousUid(),
            uid: a.default.getUid(),
            asArg: a.default.getAS(),
            ve: a.default.getWeid()
        }, b.default.getPageUrlWhenShow(o.playInfo)) : this.onShow.run = !0, o.playInfo && o.playInfo.qipuId && a.default.getAuthcookie()) {
            var n = o.playInfo.qipuId || "";
            a.default.getUid() ? i.videoPageReLoad && !i.showshare && this.loadPage({
                qipuId: n
            }) : this.getUserInfo({});
        }
    },
    onUnload: function() {
        i.default.storage.handleStorageMuti("remove", "CUR_VIDEOLIST_VIDEOS"), i.default.storage.handleStorageMuti("remove", "VIDEO_PAGE_URL"), 
        i.default.isFunction(this.app.emitter.off) && this.app.emitter.off("hideMutiDialog", this.hideMutiDialog);
    },
    launchAppError: function() {
        this.globalPage.episodeCardFlag && this.data.launchEpisodeCard && this.setData({
            launchEpisodeCard: !1
        }), y.launchAppErrorFunc("wx_player", "storage");
    },
    onHide: function() {
        this.saveRecordTimer && (clearTimeout(this.saveRecordTimer), this.notCanPlayRecord = !1), 
        this.saveRecordTimer_online && (clearTimeout(this.saveRecordTimer_online), this.notCanPlayRecord_online = !1);
    },
    onReady: function() {},
    retryLoadPage: function() {
        this.loadPage(this.data.options);
    },
    screenChangeHandle: function(e) {
        var t = this.data.fullScreen;
        t = i.default.os.isIOS ? "vertical" != e.detail.direction : !t, this.setData({
            fullScreen: t
        });
    },
    upvote: function(e) {
        var t = this, o = this.data, n = o.newComments, r = void 0 === n ? {} : n, s = o.hotComments, l = void 0 === s ? {} : s, c = e.currentTarget.dataset, u = c.contentId, d = void 0 === u ? "" : u, m = c.agree, p = void 0 !== m && m, h = c.likes, f = void 0 === h ? 0 : h, g = c.type, v = void 0 === g ? "time" : g, b = "hot" == v ? l : r, y = b && b.comments, k = f, _ = i.default.storage.handleStorageMuti("get", "commentKeys") || [], I = "hot" == v ? "wx_block_player_goodcomment" : "wx_block_player_newcomment", w = p ? "wx_player_commentdislike" : "wx_player_commentlike";
        if (this.clickPingback({
            block: I,
            rseat: w
        }), a.default.isLogin()) p ? (k = parseInt(f, 0) - 1, C.default.likeOrCancelComment(d, !1).then(function(e) {
            q.default.toggleCommentStatus({
                contentId: d,
                comments: y,
                isAgree: p,
                likes: k,
                type: v
            }, t);
        })) : (k = parseInt(f, 0) + 1, C.default.likeOrCancelComment(d, !0).then(function(e) {
            q.default.toggleCommentStatus({
                contentId: d,
                comments: y,
                isAgree: p,
                likes: k,
                type: v
            }, t);
        })); else {
            if (p) {
                var P = _.indexOf(d);
                _.splice(P, 1), i.default.storage.handleStorageMuti("set", "commentKeys", _), k = parseInt(f, 0) - 1;
            } else k = parseInt(f, 0) + 1, _.push(d), _.length > 20 && _.splice(0, 1), i.default.storage.handleStorageMuti("set", "commentKeys", _);
            q.default.toggleCommentStatus({
                contentId: d,
                comments: y,
                isAgree: p,
                likes: k,
                type: v
            }, t);
        }
    },
    onShareAppMessage: function(e) {
        var t = this.data.playInfo || this.data.options, a = t.qipuId, i = (t.shortTitle, 
        t.vid), o = t.vt, n = t.desc, r = (t.albumName, t.sourceName, t.sourceId), s = t.aid, l = t.imageUrl, c = (t.albumQipuId, 
        r || s);
        this.app.globalData.showshare = !0;
        var u = l ? f.default.editePic(l, "_480_360") : "";
        return {
            title: this.getShareTitle(t),
            desc: o || n || "轻松追剧，悦享品质",
            path: "/pages/video/video?qipuId=" + a + "&id=" + c + "&vid=" + i + "&rfr=wx_article",
            imageUrl: u || ""
        };
    },
    getShareTitle: function(e) {
        var t = e.subType, a = (e.sourceName, e.albumName), i = e.shortTitle, o = e.isFeatureFilm, n = e.pd, r = e.videoName, s = "";
        switch (t) {
          case "source":
            s = o ? a + ":" + i : i;
            break;

          case "movie":
            s = i || a;
            break;

          case "album":
            s = a && n ? a + "第" + n + "集" : i;
            break;

          default:
            s = i || r;
        }
        return s || "爱奇艺视频";
    },
    onPullDownRefresh: function() {},
    goCircle: function(e) {
        var t = void 0 !== e.currentTarget.dataset.circleId ? "wx_stars3" : "wx_starup";
        this.clickPingback({
            block: "wx_partstars",
            rseat: t
        });
    },
    joinClient: function(e) {
        var t = e.currentTarget.dataset.launchType, a = "banner" == t ? "wx_block_player_launchApp" : "wx_block_player_allComments", i = "banner" == t ? "wx_player_launchApp" : "wx_launchApp";
        this.clickPingback({
            block: a,
            rseat: i
        });
    },
    hideMutiDialog: function() {
        this.setData({
            mutiDialogFlag: !1
        });
    },
    scrollToComments: function() {
        this.clickPingback({
            block: "",
            rseat: "wx_player_comment"
        });
        var e = this;
        if (wx.canIUse("createSelectorQuery")) {
            var t = wx.createSelectorQuery();
            t.select("#commentsPart").boundingClientRect(), t.selectViewport().scrollOffset(), 
            t.exec(function(t) {
                e.setData({
                    scrollTopHeight: t[0].top - 200
                });
            });
        }
    },
    scrolltoBottom: function() {
        var e = this.data.newComments || {};
        if (e && e.comments && e.comments.length > 0) {
            var t = this.data, a = t.commentCondition, i = t.subscribePlayInfo, o = e.isMore, n = void 0 === o || o, r = e.comments, s = a.isFinal, l = i.qipuId, c = (i.channelId, 
            this.data.subLoad), u = r[r.length - 1].id;
            if ("firstError" == c || "show" == c || s || "empty" == c || "nomore" == c || 0 == n) return;
            if (a.pageNum > 4) return void this.setData({
                commentCondition: {
                    isFinal: !0
                }
            });
            a.pageNum++, this.setData({
                subLoad: "show"
            }), q.default.setCommentCondition(a, this);
            var d = this.data.commentCondition.pageNum, m = void 0 === d ? 1 : d;
            this.getNewComments({
                qipuId: l,
                pageNum: m,
                pageSize: 10,
                lastCommentId: u
            });
        }
    },
    toggleFoldState: function() {
        this.clickPingback({
            block: "wx_block_player_goodcomment",
            rseat: "wx_player_morecomment"
        }), this.setData({
            isHotFolded: !1
        });
    },
    getNewComments: function(e) {
        var t = e.qipuId, a = e.pageNum, i = e.pageSize, o = e.lastCommentId, n = this.data.newComments, r = this;
        return q.default.loadNewComments({
            qipuId: t,
            pageNum: a,
            pageSize: i,
            lastCommentId: o
        }, n, r);
    },
    retryLoadComment: function() {
        var e = this.data.commentCondition.pageNum, t = void 0 === e ? 1 : e, a = this.data.playInfo.qipuId;
        this.getNewComments(a, t, 10);
    },
    handleSourceClick: function(e) {
        var t = this.data.featureInfo, a = e.currentTarget.dataset.pluginParams || "", i = t.albumId || "", o = t.channelId || "";
        this.clickPingback({
            block: "wx_block_player_feature",
            rseat: "wx_player_feature",
            aid: i,
            c1: o
        }), a ? this.clickPingback({
            block: "wx_block_player_feature",
            rseat: "wx_launchApp",
            aid: i,
            c1: o
        }) : this.handleSourceLaunch();
    },
    handleSourceLaunch: function() {
        var e = this.data.featureInfo, t = e.albumId || "", a = e.qipuId || "", i = e.isLimited || "", o = e.featureVideoId || !1, n = e.videoId || "", r = o ? a : n;
        i ? wx.navigateTo({
            url: "/subPackage/pages/playDetail/playDetail?qipuId=" + t
        }) : wx.navigateTo({
            url: "/pages/video/video?qipuId=" + r + "&aid=" + t
        });
    }
};

Page(Object.assign({}, P, S, s.videoPlayer, c.default, m.default, u.default, d.default, g.default, k.default, v.default, h.default, w.default));