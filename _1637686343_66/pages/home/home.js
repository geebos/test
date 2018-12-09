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

var a = t(require("../../common/pingback/pv")), i = t(require("../../common/pingback/click")), o = (t(require("../../common/pingback/block")), 
t(require("../../common/user/user"))), r = require("../../common/form/form"), s = t(require("../../components/searchLayout/searchLayout")), c = t(require("../../components/history/recordService")), n = e(require("../../common/form/subscribeService")), d = e(require("./events/subscribe")), u = require("../../vendor/redux/redux"), l = t(require("../../vendor/redux-plugins/reduxTrunk")), h = t(require("./reducers/index")), p = t(require("./actions/index")), g = t(require("../../common/utils/util")), m = {
    app: getApp(),
    onLoad: function() {
        var e = this;
        o.default.init();
        var t = (0, u.combineReducers)(h.default);
        this.store = (0, u.createStore)(t, (0, u.applyMiddleware)(l.default)), this.store.subscribe(function() {
            e.setData(e.store.getState());
        }), this.loadPage(), this.removePlay(), this.setData({
            keyword: "",
            rpage: "wx_home"
        }), this.loadSearchData().then(function(t) {
            var a = e.searchDataHandle(t), i = {
                page: "index"
            };
            e.store.dispatch(p.default.initSearchLayout(a.searchRecordData, a.hotquery, "", "", "", i));
        }, function() {
            var t = {
                page: "index"
            };
            e.store.dispatch(p.default.initSearchLayout({}, {}, "", "", "", t));
        });
    },
    loadPage: function() {
        var e = this, t = o.default.isLogin();
        this.store.dispatch(p.default.nomoreLoad()), t ? this.getRecordData().then(function(a) {
            e.store.dispatch(p.default.getIndexData(a, t, e));
        }) : this.store.dispatch(p.default.getIndexData([], t, this));
    },
    getRecordData: function() {
        var e = this.app.globalData.systemInfo, t = {
            version: e.version,
            os: e.system.split(" ")[1] || "",
            ua: e.model,
            ckuid: o.default.getAnonymousUid(),
            auth: o.default.getAuthcookie(),
            page_size: 5
        }, a = Object.assign({}, {
            page_num: 1
        }, t);
        return new Promise(function(e, t) {
            c.default.getAllRecord(a).then(function(t) {
                var a = [];
                "A00000" == t.code && (a = t.data && t.data.data), e(a);
            }).catch(function(t) {
                e([]);
            });
        });
    },
    reLoadSearchHistory: function() {
        var e = this.searchDataHandle({}), t = this.store.getState().searchLayout.searchHistory;
        t && t.list && (t.list = e.searchRecordData, this.store.dispatch(p.default.updateSearchState({
            searchHistory: t
        })));
    },
    onShow: function() {
        a.default.send({
            rpage: "wx_home"
        }), this.reLoadSearchHistory(), this.app.globalData.rfr = "", this.app.globalData.showshare = !1, 
        this.setData({
            swiperPlay: !0
        });
        var e = this.liveCardInd || [];
        this.app.globalData.checkLiveSubscibe && e.length > 0 && p.default.checkLiveCard(this);
    },
    onHide: function() {
        this.hideSearchLayout(), this.onHide.run || (this.store.dispatch(p.default.removePlayRecord(!0)), 
        this.onHide.run = !0), this.setData({
            swiperPlay: !1
        });
    },
    clickPingback: function(e) {
        i.default.send({
            rpage: "wx_home",
            block: e.block,
            rseat: e.rseat,
            position: e.position,
            mcnt: e.mcnt
        });
    },
    swiperChange: function(e) {
        var t = this.store.getState().focus[e.detail.current], a = t.qipuId, i = t.customType || 1, o = t.customLink || "", r = e.detail.current + 1;
        this.store.dispatch(p.default.switchFocus(a, t.bgImg, i, o, r));
    },
    playVideo: function(e) {
        var t = e.currentTarget, a = t.dataset.qipuId, i = this.getPlayVideo(a), o = (t.dataset.block, 
        t.dataset.index), s = t.dataset.cardType, c = (t.dataset.order, t.dataset.cardMcnt), n = (t.dataset.imgType, 
        e.detail.formId), d = e.currentTarget.dataset.rseat || "";
        if ((0, r.collectFormIdMuti)(n, d), 5 == s) {
            if (this.clickPingback({
                block: "wx_block_home_theatre",
                rseat: "wx_home_theatre",
                mcnt: c
            }), !a) return wx.showToast({
                icon: "none",
                title: "数据异常"
            }), !1;
            var u = "/subPackage/pages/theatre/room?roomId=" + a;
            wx.navigateTo({
                url: u
            });
        } else {
            if (16 == s && this.clickPingback({
                block: "wx_block_home_focus" + o,
                rseat: "wx_home_focus" + o,
                position: o
            }), !a) return wx.showToast({
                icon: "none",
                title: "数据异常"
            }), !1;
            this._playVideo({
                aid: i.sourceId || i.albumId,
                qipuId: a,
                vid: i.vid,
                isLive: 5 == i.resourceType,
                customType: i.customType,
                customLink: i.customLink,
                videoType: i.videoType,
                type: "film"
            });
        }
    },
    getPlayVideo: function(e) {
        var t = this.store.getState();
        return this.getVideoByQipuId(t.focus, e) || this.getTagsVideo(t.tags, e);
    },
    getTagsVideo: function(e, t) {
        var a = this;
        return e.reduce(function(e, i) {
            return e || a.getVideoByQipuId(i.showList, t);
        }, null);
    },
    getVideoByQipuId: function(e, t) {
        return e.reduce(function(e, a) {
            return a.qipuId === t ? a : e;
        }, null);
    },
    playRecord: function() {
        var e = this.store.getState().record;
        this.clickPingback({
            block: "",
            rseat: "wx_home_history"
        }), this._playVideo({
            qipuId: e.qipuId,
            aid: e.aid
        });
    },
    _playVideo: function(e) {
        this.store.dispatch(p.default.removePlayRecord(!0));
        e.aid;
        var t = e.qipuId, a = "";
        if (2 == e.customType) {
            if (e.customLink) {
                var i = e.customLink;
                i = "/" === i.slice(0, 1) ? i : "/" + i;
                var o = [ "pages/home/home", "pages/shortVideo/shortVideo", "pages/library/library", "pages/my/my", "pages/specialSubject/specialSubject" ].filter(function(e) {
                    return i.indexOf(e) > -1;
                });
                g.default.isArray(o) && o.length > 0 ? wx.switchTab({
                    url: i
                }) : wx.navigateTo({
                    url: i
                });
            }
        } else if (3 == e.customType) a = "/subPackage/pages/webview/webview?webviewSrc=" + (e.customLink ? encodeURIComponent(e.customLink) : ""), 
        wx.navigateTo({
            url: a
        }); else if (4 == e.customType) {
            var r = !1, s = t;
            7 == e.videoType && (r = !0), wx.navigateTo({
                url: "/subPackage/pages/playDetail/playDetail?qipuId=" + s + "&isSingle=" + r
            });
        } else a = e.isLive ? "/pages/liveVideo/liveVideo?qipuId=" + e.qipuId + "&aid=" + e.aid + "&rfr=wx_home" : "/pages/video/video?qipuId=" + e.qipuId + "&aid=" + e.aid + "&rfr=wx_home&useRecord=true", 
        wx.navigateTo({
            url: a
        });
    },
    removePlay: function() {
        var e = this;
        setTimeout(function() {
            e.store.dispatch(p.default.removePlayRecord());
        }, 5e3);
    },
    findMore: function(e) {
        var t = e.detail.formId, a = e.currentTarget, i = a.dataset.channelid || "", o = a.dataset.rseat || "", s = a.dataset.cardType || "", c = a.dataset.moreUrl || "", n = c.indexOf("pages/library/library");
        this.app.globalData.rfr = "home", n >= 0 && (this.app.globalData.channel.channelId = i), 
        1 != s && 2 != s && 5 != s || this.clickPingback({
            block: "wx_block_home_source",
            rseat: o
        }), this.handleUrl(c), (0, r.collectFormIdMuti)(t, o);
    },
    onShareAppMessage: function() {
        return {
            title: "爱奇艺视频",
            desc: "轻松追剧，悦享品质",
            path: "/pages/home/home"
        };
    },
    handleLiveClick: function(e) {
        var t = e.currentTarget.dataset, a = t.qipuId, i = t.cardMcnt, o = void 0 === i ? "" : i, s = this.data.rpage || "", c = e.detail.formId, n = e.currentTarget.dataset.rseat || "";
        this.clickPingback({
            block: "wx_block_home_live",
            rseat: "wx_home_live",
            mcnt: o
        }), (0, r.collectFormIdMuti)(c, n), wx.navigateTo({
            url: "/pages/liveVideo/liveVideo?qipuId=" + a + "&rfr=" + s
        });
    },
    onPullDownRefresh: function() {},
    retryLoadPage: function() {
        this.loadPage(), this.removePlay();
    },
    handleTapBanner: function(e) {
        var t = e.currentTarget, a = t.dataset.url, i = t.dataset.bannerType, o = t.dataset.cardMcnt;
        if (this.clickPingback({
            block: "wx_block_home_ banner",
            rseat: "wx_home_banner",
            mcnt: o
        }), 1 == i) this.handleUrl(a); else {
            var r = "/subPackage/pages/webview/webview?webviewSrc=" + encodeURIComponent(a);
            wx.navigateTo({
                url: r
            });
        }
    },
    handleUrl: function(e) {
        var t = "/" === e.slice(0, 1) ? e : "/" + e, a = [ "pages/home/home", "pages/shortVideo/shortVideo", "pages/library/library", "pages/my/my", "pages/specialSubject/specialSubject" ].filter(function(e) {
            return t.indexOf(e) > -1;
        });
        g.default.isArray(a) && a.length > 0 ? wx.switchTab({
            url: t
        }) : wx.navigateTo({
            url: t
        });
    },
    toggleSubscribeLive: function(e) {
        var t = this, a = e.currentTarget.dataset, i = a.qipuId, o = a.isSubscribe, r = e.detail.formId, s = {
            qipuId: i,
            isSubscribe: o,
            formid: r,
            rfr: this.data.rpage
        }, c = o ? "wx_home_cancelorder" : "wx_home_liveorder";
        this.clickPingback({
            block: "wx_block_home_live",
            rseat: c
        }), d.updateBtnStatus(this, i, o, !0), n.subOrUnsubscribeLiveFlow(s).then(function(e) {
            d.updateBtnStatus(t, i, !o);
            var a = o ? "预约已取消" : "预约成功，节目开播前会通知您哦！";
            wx.showToast({
                title: a,
                icon: "none"
            });
        }).catch(function(e) {
            d.updateBtnStatus(t, i, o);
            var a = o ? "取消预约失败" : "预约失败";
            wx.showToast({
                title: a,
                icon: "none"
            });
        });
    },
    toggleFoldState: function() {
        this.clickPingback({
            block: "wx_block_home_live",
            rseat: "wx_home_liveopen"
        }), this.setData({
            liveCardFolded: !1
        });
    },
    handleBeforePlay: function(e) {
        var t = e.currentTarget, a = (t.dataset.index, t.dataset.cardType), i = t.dataset.cardMcnt, o = t.dataset, r = o.qipuId, s = void 0 === r ? "" : r, c = o.aid, n = void 0 === c ? "" : c, d = o.cType, u = void 0 === d ? "" : d, l = o.videoType, h = void 0 === l ? "" : l, p = o.cid, g = void 0 === p ? "" : p, m = !1, f = n, b = [ 1, 2, 4, 6, 15 ];
        1 == a || 2 == a ? this.clickPingback({
            block: "wx_block_home_source",
            rseat: "wx_home_source",
            mcnt: i
        }) : 3 == a ? this.clickPingback({
            block: "wx_block_home_playlist",
            rseat: "wx_home_playlist",
            mcnt: i
        }) : 7 == a && this.clickPingback({
            block: "wx_block_home_subtitle",
            rseat: "wx_home_subtitle",
            mcnt: i
        }), b.indexOf(g) > -1 && 1 == u ? (7 == h && (m = !0, f = s), wx.navigateTo({
            url: "/subPackage/pages/playDetail/playDetail?qipuId=" + f + "&isSingle=" + m
        })) : this.playVideo(e);
    }
};

Page(Object.assign({}, m, s.default));