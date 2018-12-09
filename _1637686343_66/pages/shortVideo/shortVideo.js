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

function a(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var i, r = t(require("../../common/user/user")), o = t(require("../../common/utils/util")), n = t(require("../../common/polyfill/promise")), s = t(require("../../common/pingback/click")), d = t(require("../../common/pingback/shortVideoTrack")), c = require("../../common/form/form"), l = require("../../components/player/VideoPlayer"), u = e(require("../../common/source/videoUtil")), h = t(require("../../components/videoLayout/videoLayout")), f = t(require("service/videoControl")), g = e(require("service/videoService")), v = t(require("../../components/history/playRecordService")), p = t(require("../../components/history/recordService")), m = t(require("../../common/pingback/pv")), y = t(require("service/bindVV")), T = t(require("common/config")), k = t(require("service/channelCache")), P = require("../../vendor/redux/redux"), b = t(require("../../vendor/redux-plugins/reduxTrunk")), _ = t(require("./reducers/index")), I = t(require("./actions/index")), S = {
    formatePlayRecord: function(e) {
        return e.tvTitle || "";
    },
    savePlayRecord: function(e) {
        var t = this.store.getState(), a = t.playInfo || {}, i = t.tmtsInfo || {};
        this.savePlayRecordTimeout(a, e, i);
    },
    savePlayRecordTimeout: function(e, t, a) {
        var i = this;
        this.notCanPlayRecord || (this.notCanPlayRecord = !0, this.saveRecordTimer = setTimeout(function() {
            i.notCanPlayRecord = !1, i.saveRecord(e, {}, {});
        }, 5e3)), !this.notCanPlayRecord_online && r.default.isLogin() && (this.notCanPlayRecord_online = !0, 
        this.saveRecordTimer_online = setTimeout(function() {
            i.notCanPlayRecord_online = !1, i.uploadRecord(i.currentTime, null);
        }, 12e4));
    },
    saveRecord: function(e, t, a) {
        var i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], o = this.formatePlayRecord(e), n = t.playTime == t.duration ? this.currentTime : t.playTime;
        v.default.save({
            id: e.tvId,
            qipuId: e.tvId,
            aid: e.tvId,
            albumName: e.tvTitle || "",
            sourceName: e.tvTitle || "",
            playTime: i ? this.duration : n,
            duration: this.duration,
            content: o,
            imgUrl: e.thumbnail || e.videoUrl || "",
            date: Date.now(),
            type: "notfilm"
        }, r.default.isLogin());
    },
    getTmtsError: function(e, t) {
        var a = u.getError(e, t);
        return a.buttonclick = a.buttonclick = a.buttonclick || this.playNext, a;
    },
    uploadRecord: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1, t = arguments[1], a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
        if (r.default.getAuthcookie()) {
            var i = this.app.globalData.systemInfo, o = this.store.getState().playInfo, n = [], s = Date.now() / 1e3, d = a || o.tvId || "";
            if (d) {
                var c = {
                    terminalId: "32",
                    tvId: d,
                    addtime: s.toFixed ? s.toFixed(0) : s,
                    videoPlayTime: e.toFixed ? e.toFixed(0) : e
                };
                n.push(c), n = JSON.stringify(n);
                var l = {
                    version: i.version,
                    os: i.system.split(" ")[1] || "",
                    ua: i.model,
                    ckuid: r.default.getAnonymousUid(),
                    auth: r.default.getAuthcookie(),
                    upload_records: n
                };
                p.default.uploadRecord(l).then(function(e) {
                    "A00000" == e.code && t && t();
                }).catch(function(e) {});
            }
        }
    }
}, w = (i = {
    app: getApp(),
    onLoad: function(e) {
        var t = this;
        r.default.init();
        var a = (0, P.combineReducers)(_.default);
        "store";
        this.store = (0, P.createStore)(a, (0, P.applyMiddleware)(b.default)), this.store.subscribe(function() {
            t.setData(t.store.getState());
        }), this.store.dispatch(I.default.initVideoLayout(!0)), this.setData({
            curpage: "wx_shortchannel",
            from: "notFilm",
            filterStatus: "",
            showShare: !1,
            isIos: !!o.default.os.isIOS
        });
        this.loadPage(0), this.player = new l.Player(this), this.vvStorage = {
            aUid: r.default.getAnonymousUid(),
            uid: r.default.getUid(),
            asArg: r.default.getAS(),
            ve: r.default.getWeid()
        };
        var i = this;
        y.default.bind(this.player, i), this.bind(), this.initState(), this.clickPingback({
            block: "wx_shortchannel_1"
        });
    },
    bind: function() {
        var e = this;
        this.player.on("ended", function() {
            var t = e.store.getState();
            e.saveRecord(t.playInfo, {}, t.tmtsInfo, !0), e.playNext(!0);
        }), this.player.on("timeupdate", function(t) {
            var a = t.detail.currentTime;
            a > 0 && (e.currentTime = a, e.savePlayRecord(e.currentTime), e.player.firstRun || (e.player.firstRun = !0, 
            e.uploadRecord(-1, null)));
        }), this.player.on("pause", function(t) {
            var a = e.store.getState().setCurrentVideoParams.currentVideoPingback;
            e.hotFeedClickPingback(Object.assign({}, a, {
                rseat: 1
            })), e.currentTime > 0 && !e.switchPlayVideo.switch && e.uploadRecord(e.currentTime, null), 
            e.saveRecordTimer_online && (clearTimeout(e.saveRecordTimer_online), e.notCanPlayRecord_online = !1);
        }), this.player.on("play", function(t) {
            var a = e.store.getState().setCurrentVideoParams.currentVideoPingback;
            e.hotFeedClickPingback(Object.assign({}, a, {
                rseat: 0
            }));
        });
    },
    playVideo: function(e) {
        var t = this, a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        this.player.firstRun = !1;
        var i = "";
        this.store.getState().playInfo.tvId || (i = e.tvId), wx.canIUse("createSelectorQuery") && this.scrollIntoView(e.tvId);

        //此时还未获取到 cache
        console.log('f0', e);

        var r = e.tvId;
        return this.setData({
            currentId: r
        }), a ? this.uploadRecord(0, null, i) : this.currentTime && this.uploadRecord(this.currentTime, null, i), 
        this.resetVideos(), this.store.dispatch(I.default.showLoading()), this.changeCurrentVideo(e, e.tvId), 
        g.getVideoInfo(this.getPlayParam(e)).then(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};

            console.log('f1', t);
            //此时已经获取到 cache
            console.log('f2', e);

            return t.player.setUrl(e.src), t.duration = e.info.duration || "", t.store.dispatch(I.default.setRateList(e.info.vidl)), 
            t.store.dispatch(I.default.setVideoModel(!0)).then(function() {
                return e;
            });
        }).then(function(e) {
            if (t.store.dispatch(I.default.tmtsInfo(e)), t.canPlay()) {
                setTimeout(function() {
                    t.autoPlay(), t.store.dispatch(I.default.showVideo());
                }, 0);
            }
        }).then(function() {
            t.player.emit("ready"), t.setData({
                isPlay: !1
            });
        }, function(a) {
            var i = t.store.getState();
            return t.showLayerBeforeStart(i.playInfo, a.info, a, e), n.default.reject();
        });
    },
    scrollIntoView: function(e) {
        var t = this;
        if (!e) return !1;
        var a = this.data.videos || {}, i = wx.createSelectorQuery(), r = wx.getSystemInfoSync().windowHeight;
        i.select("#node_" + e).boundingClientRect(function(i) {
            var n = i.top, s = i.bottom;
            if (n <= 0 || s > r) {
                var d = t.getIndex(e, a), c = (o.default.getPxByRpx(T.default.feedItemHeight) + o.default.getPxByRpx(T.default.feedBottomBarHeight)) * (d + 1) - r;
                wx.pageScrollTo({
                    scrollTop: c,
                    duration: 0
                });
            }
        }).exec();
    },
    getIndex: function(e, t) {
        var a = -1;
        return t && t.videolist && t.videolist.length > 0 && t.videolist.forEach(function(t, i) {
            t.tvId == e && (a = i);
        }), a;
    },
    resetVideos: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this.currentTime && (this.currentTime = 0);
        var t = this.store.getState().videos.pageNum;
        this.store.dispatch(I.default.resetVideos([], t, e)), this.store.dispatch(I.default.editPlayInfo({})), 
        this.player.pause();
    },
    showLayerBeforeStart: function(e) {
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var t = arguments[2];
        arguments[3];
        this.data.fullScreen && this.player.context.exitFullScreen();
        var a = t.content || "";
        "anonymousLayer" != a && "vipckfail" != a || (t.content = "defaultTmtsErr"), this.store.dispatch(I.default.showError(this.getTmtsError(t, !1)));
    },
    playCurrentVideo: function(e) {
        if (this.data.isPlay) return !1;
        this.setData({
            isPlay: !0
        });
        var t = e.currentTarget.dataset.tvid || "", a = (this.store.getState().videos.videolist, 
        e.currentTarget.dataset || {});
        if (Object.keys(a).forEach(function(e) {
            a["r_" + e] = a[e], delete a[e];
        }), this.store.dispatch(I.default.setCurrentVideoParams({
            currentVideoPingback: a
        })), t) {
            this.switchPlayVideo.switch = !0;
            var i = this.getVideo(t);
            this.initVV(i, 1), this.playVideo(i);
        }
    },
    playNext: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this.switchPlayVideo(e);
    },
    switchPlayVideo: function(e) {
        this.switchPlayVideo.switch = !0;
        var t = this.store.getState().playInfo, a = this.store.getState().videos.videolist, i = a.findIndex(function(e, a) {
            return e.tvId == t.tvId;
        });
        if (i != a.length - 1) {
            var r = a[i + 1], o = {
                r_area: r.r_area,
                r_bkt: r.r_bkt,
                r_eventid: r.r_eventid,
                r_feedid: r.feedId,
                r_tvid: r.tvId,
                r_rank: r.r_rank
            };
            this.setData({
                currentId: r.tvId
            }), this.store.dispatch(I.default.setCurrentVideoParams({
                currentVideoPingback: o
            })), this.saveRecordTimer && (clearTimeout(this.saveRecordTimer), this.notCanPlayRecord = !1), 
            this.saveRecordTimer_online && (clearTimeout(this.saveRecordTimer_online), this.notCanPlayRecord_online = !1), 
            this.initVV(r, 5), this.data.isIos ? (this.data.fullScreen && this.player.context.exitFullScreen(), 
            this.resetVideos()) : this.playVideo(r, e);
        }
    },
    getVideo: function(e) {
        return this.store.getState().videos.videolist.find(function(t) {
            return t.tvId == e;
        }) || null;
    },
    getVideoIndex: function(e) {
        return this.store.getState().videos.videolist.findIndex(function(t) {
            return t.tvId == e;
        });
    },
    screenChangeHandle: function(e) {
        var t = e.detail.fullScreen || !1;
        this.setData({
            fullScreen: t
        });
        var a = this.store.getState().setCurrentVideoParams.currentVideoPingback;
        this.hotFeedClickPingback(Object.assign({}, a, {
            rseat: 3
        }));
    },
    loadPage: function(e) {
        var t = this, a = this.data.curpage;
        this.store.dispatch(I.default.setData(e, a));
        var i = {
            pageNum: 1,
            channelId: this.store.getState().channelInfos.curChannel.channelId,
            action: 1
        };
        this.store.dispatch(I.default.initCondition(i));
        var r = this.store.getState().searchConditions;
        this.getSearchData(r).then(function() {
            "complete" == t.store.getState().load && t.hotFeedPingback({
                rseat: "top_refresh",
                block: "O:0281960040",
                t: 20
            });
        });
    },
    getSearchData: function(e) {
        this.store.dispatch(I.default.showLoad()), this.setData({
            showFeedToast: !1
        }), this.currentTime && this.player.pause(), this.feedTipTimer && clearTimeout(this.feedTipTimer), 
        this.feedTipShowTimer && clearTimeout(this.feedTipShowTimer);
        var t = Object.assign({}, e, {
            uid: r.default.getAnonymousUid(),
            ppuid: r.default.getUid()
        });
        return this.loadVideoPage(t);
    },
    loadVideoPage: function(e) {
        var t = this, a = this.store.getState().videos.totalCounts;
        return 1 == e.action && parseInt(a, 10) >= T.default.maxFeedCount ? (this.store.dispatch(I.default.nomoreLoad()), 
        this.showFeedToast(0), n.default.resolve()) : g.getVideoPage(e).then(function(a) {
            t.store.dispatch(I.default.completeLoad());
            var i = a.data && a.data.pingback ? a.data.pingback : {}, r = a.data && a.data.feeds ? a.data.feeds : [];
            t.store.dispatch(I.default.trackParams({
                pingback: i,
                feeds: r
            })), r && r.length > 0 && t.pageDisplayPingback(), 2 == e.action && wx.stopPullDownRefresh();
            var n = t.pageDataHandle(a), s = t.data.filterStatus, d = o.default.isObject(a.data) && a.data.filterStatus ? a.data.filterStatus : s;
            return s != d && t.setData({
                filterStatus: d
            }), n;
        }).then(function(a) {
            var i = t.store.getState().videos.totalCounts || 0, r = a.results.length, o = T.default.maxFeedCount - i, n = !1;
            if (parseInt(i + r, 10) >= T.default.maxFeedCount && (1 == e.action ? r >= o && a.results.splice(o) : 2 == e.action && (n = !0)), 
            a.isEmpty) 1 == e.pageNum ? t.store.dispatch(I.default.firstErrorLoad()) : (t.showFeedToast(0), 
            t.store.dispatch(I.default.nomoreLoad())); else {
                t.showFeedToast(r);
                var s = 0;
                n && (s = r), t.store.dispatch(I.default.loadVideos(a, e, s));
                var d = t.store.getState();
                k.default.save(d.channelInfos.curChannel.channelId, d.videos.videolist);
            }
        }).catch(function(a) {
            2 == e.action ? (wx.stopPullDownRefresh(), t.showFeedToast(0), t.store.dispatch(I.default.errorLoad())) : 1 == e.action && (1 == e.pageNum ? t.store.dispatch(I.default.firstErrorLoad()) : t.store.dispatch(I.default.errorLoad()));
        });
    },
    pageDataHandle: function(e) {
        var t = e.data && e.data.feeds || [];
        return t && t.length && t.forEach(function(t, a) {
            if (delete t.wallName, delete t.snsTime, delete t.originalDescription, delete t.description, 
            delete t.videoPlayUrl, delete t.vote, delete t.userIdentity, delete t.uvCount, delete t.wallUserCount, 
            delete t.pubStr, t.showVideo = !1, t.name && t.name.length > 8) {
                var i = t.name.slice(0, 7) + "...";
                t.name = i;
            }
            t.agreeCountCN = t.agreeCount, t.sharedCountCN = o.default.formatSharedNum(t.sharedCount);
            var r = e.data.pingback;
            r && (t.r_eventid = r.event_id || "", t.r_bkt = r.bkt || "", t.r_area = r.area || "", 
            t.r_rank = a);
        }), {
            isEmpty: !t.length,
            results: t || []
        };
    },
    showFeedToast: function(e) {
        var t = this;
        this.feedTipTimer = setTimeout(function() {
            t.setData({
                recommend: e,
                showFeedToast: !0
            }), t.feedTipShowTimer = setTimeout(function() {
                t.setData({
                    showFeedToast: !1
                });
            }, 2e3);
        }, 1e3);
    },
    changeCurrentVideo: function(e, t, a) {
        var i = "";
        if (this.store.getState().videos.videolist.forEach(function(e, t) {
            1 == e.isTopFlag && (i = t);
        }), !a) {
            var r = this.getVideoIndex(t), n = "";
            n = i && r >= i ? r * (o.default.getPxByRpx(T.default.feedItemHeight) + o.default.getPxByRpx(T.default.feedBottomBarHeight)) + o.default.getPxByRpx(T.default.refreshBardHeight) : r * (o.default.getPxByRpx(T.default.feedItemHeight) + o.default.getPxByRpx(T.default.feedBottomBarHeight)), 
            this.setData({
                videoTop: n
            });
        }
        e.showVideo = !0, this.store.dispatch(I.default.editPlayInfo(e)), this.store.dispatch(I.default.changeCurVideo(e, t));
    },
    switchChannel: function(e, t) {
        var a = e.currentTarget.dataset.tab;
        this.clickPingback({
            block: "wx_shortchannel_" + (a + 1)
        }), this.switchChannelHandle(a);
    },
    switchChannelHandle: function(e) {
        var t = this.store.getState(), a = t.searchConditions;
        if (t.channelInfos.channelTabIndex != e) {
            this.store.dispatch(I.default.switchChannel(e));
            var i = this.store.getState().channelInfos.curChannel;
            a.ctgName = i.cname, a.pageNum = 1, a.channelId = i.channelId, this.store.dispatch(I.default.changeCondition(a)), 
            this.resetVideos(!0);
            this.store.getState();
            var r = k.default.get(i.channelId);
            r && r.length ? this.store.dispatch(I.default.loadVideos({
                results: r
            }, a)) : (this.store.dispatch(I.default.loadVideos({
                results: []
            }, a)), this.getSearchData(this.store.getState().searchConditions));
        }
    },
    agreeOrCancel: function(e) {
        var t = e.currentTarget.dataset.tvid, a = this.getVideo(t), i = a.isAgree, o = a.agreeCount;
        if (isNaN(o) || (i ? (a.agreeCount = parseInt(a.agreeCount, 0) - 1, this.hotFeedClickPingback({
            r_tivid: t,
            r_feedid: e.currentTarget.dataset.feedid,
            r_eventid: e.currentTarget.dataset.eventid,
            r_bkt: e.currentTarget.dataset.bkt,
            r_area: e.currentTarget.dataset.area,
            r_rank: e.currentTarget.dataset.rank,
            rseat: 10
        })) : (a.agreeCount = parseInt(a.agreeCount, 0) + 1, this.hotFeedClickPingback({
            r_tivid: t,
            r_feedid: e.currentTarget.dataset.feedid,
            r_eventid: e.currentTarget.dataset.eventid,
            r_bkt: e.currentTarget.dataset.bkt,
            r_area: e.currentTarget.dataset.area,
            r_rank: e.currentTarget.dataset.rank,
            rseat: 9
        }))), a.agreeCountCN = a.agreeCount, a.isAgree = !i, this.changeCurrentVideo(a, t, !0), 
        a.isAgree ? this.clickPingback({
            rseat: "wx_shortchannel_like"
        }) : this.clickPingback({
            rseat: "wx_shortchannel_dislike"
        }), r.default.isLogin()) {
            var n = {
                authcookie: r.default.getAuthcookie(),
                agree: a.isAgree ? 1 : 0,
                device_id: r.default.getAnonymousUid(),
                wallId: a.wallId,
                feedId: a.feedId,
                sourceType: a.sourceType || "",
                owner: a.uid
            };
            g.agreeOrCancel(n);
        }
    },
    initState: function(e) {
        this.store.dispatch(I.default.init({}));
    },
    initVV: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, a = this.store.getState().channelInfos.curChannel.channelId, i = this.getVfrm(t, a), r = this.vvStorage || {};
        y.default.init({
            c1: a,
            ht: 0,
            r: e.tvId || "",
            aid: e.tvId || "",
            rfr: "",
            purl: "wx_shortchannel",
            vfrm: i,
            u: r.aUid,
            pu: r.uid,
            as: r.asArg,
            ve: r.ve
        });
    },
    getVfrm: function(e, t) {
        return "0-4-" + ({
            0: 1,
            22: 2,
            25: 3,
            6: 4
        }["" + t] || 0) + "-" + e;
    },
    retryLoadPage: function() {
        var e = this.store.getState().searchConditions;
        this.store.dispatch(I.default.showLoad()), this.getSearchData(e);
    },
    goToPlayVideo: function(e) {
        var t = e.currentTarget.dataset.tvid, a = (e.currentTarget.dataset.feedslen, e.detail.formId), i = e.currentTarget.dataset.rseat || "";
        (0, c.collectFormIdMuti)(a, i), this.hotFeedClickPingback({
            r_tivid: t,
            r_feedid: e.currentTarget.dataset.feedid,
            r_eventid: e.currentTarget.dataset.eventid,
            r_bkt: e.currentTarget.dataset.bkt,
            r_area: e.currentTarget.dataset.area,
            r_rank: e.currentTarget.dataset.rank,
            rseat: 8
        }), this._playVideo({
            aid: t,
            qipuId: t,
            vid: "",
            type: "notfilm"
        });
    },
    _playVideo: function(e) {
        wx.navigateTo({
            url: "/pages/video/video?qipuId=" + e.qipuId + "&aid=" + e.aid + "&rfr=wx_shortchannel"
        });
    },
    clickPingback: function(e) {
        var t = {
            rpage: "wx_shortchannel"
        };
        e.rseat ? t.rseat = e.rseat : e.block && (t.block = e.block, t.type = 21), s.default.send(t);
    },
    hotFeedPingback: function(e) {
        var t = this.store.getState().trackParams.pingback || {};
        e.r_eventid = t.event_id, e.r_bkt = t.bkt, e.r_area = t.area, d.default.send(e);
    },
    hotFeedClickPingback: function(e) {
        e.t = 20, d.default.send(e);
    },
    pageDisplayPingback: function() {
        var e = this.store.getState().trackParams.feeds, t = this;
        e && e.length > 0 && e.forEach(function(e, a) {
            var i = e.feedId, r = e.tvId;
            t.hotFeedPingback({
                block: e.isTopFlag ? "O:0281960030" : "O:0281960010",
                r_rank: a,
                r_feedid: i,
                r_vidlist: r,
                t: 21
            });
        });
    },
    getRrankParam: function(e) {
        var t = null;
        return t = void 0 !== e ? e : (this.store.getState().trackParams.feeds || []).length, 
        Array.apply(null, {
            length: t
        }).map(Number.call, Number).toString();
    },
    loadVideo: function(e) {
        return this.store.dispatch(I.default.loadVideoPage(e));
    },
    onShow: function(e) {
        d.default.enterPage(), m.default.send({
            rpage: "wx_shortchannel"
        }), this.onShow.run ? this.vvStorage = {
            aUid: r.default.getAnonymousUid(),
            uid: r.default.getUid(),
            asArg: r.default.getAS(),
            ve: r.default.getWeid()
        } : this.onShow.run = !0;
    },
    onHide: function() {
        var e = d.default.leavePage();
        this.saveRecordTimer && clearTimeout(this.saveRecordTimer), this.hotFeedPingback({
            rtime: e,
            t: 22
        }), this.player.pause(), this.saveRecordTimer_online && (clearTimeout(this.saveRecordTimer_online), 
        this.notCanPlayRecord_online = !1), this.app.globalData.videoPageReLoad = !0;
    },
    onReady: function() {
        console.log("shortvideo ready");
    },
    setNavigationTitle: function(e) {
        var t = this.store.getState().playInfo;
        t.sourceName, t.albumName, t.shortTitle;
    }
}, a(i, "retryLoadPage", function() {
    this.loadPage();
}), a(i, "getPlayParam", function(e) {
    return {
        qipuId: e.tvId,
        vid: "",
        rate: this.store.getState().videoControl.rate
    };
}), a(i, "autoPlay", function() {
    var e = this;
    this.saveRecordTimer && (clearTimeout(this.saveRecordTimer), this.notCanPlayRecord = !1), 
    this.saveRecordTimer_online && (clearTimeout(this.saveRecordTimer_online), this.notCanPlayRecord_online = !1), 
    setTimeout(function() {
        e.canPlay() && (e.switchPlayVideo.switch = !1, e.player.play());
    }, 1e3);
}), a(i, "onShareAppMessage", function(e) {
    if (o.default.isObject(e) && "button" == e.from) {
        this.hotFeedClickPingback({
            r_tivid: e.target.dataset.tvid,
            r_feedid: e.target.dataset.feedid,
            r_eventid: e.target.dataset.eventid,
            r_bkt: e.target.dataset.bkt,
            r_area: e.target.dataset.area,
            r_rank: e.target.dataset.rank,
            rseat: 11
        });
        var t = e.target.dataset.tvid, a = this.getVideo(t), i = a.thumbnail ? a.thumbnail.replace(/_[\d]+_[\d]+(.jpg|bmp|gif)$/, "_480_360$1") : "";
        return {
            title: "" + a.tvTitle || "热点-流行短视频",
            desc: "轻松追剧，悦享品质",
            path: "pages/video/video?qipuId=" + t + "&id=" + t + "&rfr=wx_shortchannel",
            imageUrl: i
        };
    }
    return {
        title: "热点-流行短视频",
        desc: "轻松追剧，悦享品质",
        path: "pages/shortVideo/shortVideo?rfr=wx_shortchannel"
    };
}), a(i, "onPullDownRefresh", function() {
    var e = this, t = this.store.getState().searchConditions, a = this.store.getState().videos, i = a.isEmpty, r = (a.pageNum, 
    this.store.getState().load);
    if ("firstError" != r && "show" != r) {
        if (t.pageNum++, i) return wx.stopPullDownRefresh(), this.showFeedToast(0), void this.store.dispatch(I.default.errorLoad());
        this.clickPingback({
            rseat: "wx_shortchannel_down"
        }), t.action = 2, this.store.dispatch(I.default.changeCondition(t)), this.resetVideos(), 
        this.getSearchData(this.store.getState().searchConditions).then(function() {
            e.hotFeedPingback({
                rseat: "top_refresh",
                block: "O:0281960040",
                t: 20
            });
        });
    }
}), a(i, "onReachBottom", function(e) {
    var t = this, a = this.store.getState().searchConditions, i = this.store.getState().videos, r = (i.isEmpty, 
    i.pageNum, this.store.getState().load);
    "firstError" != r && "show" != r && "error" != r ? (a.pageNum++, this.clickPingback({
        rseat: "wx_shortchannel_up"
    }), a.action = 1, this.store.dispatch(I.default.changeCondition(a)), this.resetVideos(), 
    this.getSearchData(this.store.getState().searchConditions).then(function() {
        t.hotFeedPingback({
            rseat: "bottom_refresh",
            block: "O:0281960040",
            t: 20
        });
    })) : wx.stopPullDownRefresh();
}), a(i, "shareVideoFormId", function(e) {
    var t = e.detail.formId, a = e.currentTarget.dataset.rseat || "";
    (0, c.collectFormIdMuti)(t, a);
}), a(i, "handleToUserVideo", function(e) {
    var t = e.currentTarget.dataset, a = t.uid, i = void 0 === a ? "" : a, r = t.name, o = void 0 === r ? "" : r, n = t.tvid, s = void 0 === n ? "" : n, d = t.feedid, c = void 0 === d ? "" : d, l = t.eventid, u = void 0 === l ? "" : l, h = t.bkt, f = void 0 === h ? "" : h, g = t.area, v = void 0 === g ? "" : g, p = t.rank, m = void 0 === p ? "" : p;
    this.hotFeedClickPingback({
        r_tivid: s,
        r_feedid: c,
        r_eventid: u,
        r_bkt: f,
        r_area: v,
        r_rank: m,
        rseat: 4
    }), wx.navigateTo({
        url: "/subPackage/pages/userVideo/userVideo?name=" + o + "&uid=" + i
    });
}), a(i, "pullRefresh", function() {
    this.hotFeedPingback({
        rseat: "bar_refresh",
        block: "O:0281960040",
        t: 20
    }), wx.pageScrollTo({
        scrollTop: 0
    }), this.onPullDownRefresh();
}), a(i, "shareVideo", function(e) {
    var t = e.currentTarget.dataset, a = t.sharedCount, i = void 0 === a ? 0 : a, r = t.tvid, n = void 0 === r ? "" : r, s = t.cid, d = void 0 === s ? "" : s;
    if (this.clickPingback({
        rseat: "wx_share",
        qipuId: n,
        c1: d
    }), !i || i < 100) return !1;
    var c = this.data.videos, l = void 0 === c ? {} : c;
    l && l.videolist && l.videolist.length > 0 && (l.videolist.forEach(function(e) {
        e.tvId == n && (e.sharedCount = parseInt(i) + 1, e.sharedCountCN = o.default.formatSharedNum(e.sharedCount));
    }), this.setData({
        videos: l
    }));
}), i);

Page(Object.assign({}, S, w, l.videoPlayer, h.default, f.default));