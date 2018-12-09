function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = e(require("common/config")), t = e(require("service/rankService")), i = e(require("../../common/utils/util")), n = e(require("../../common/pingback/pv")), r = e(require("../../common/pingback/block")), s = e(require("../../common/pingback/click")), o = {
    app: getApp(),
    onLoad: function(e) {
        var t = {
            cid: e && e.cid || -1,
            tabIndex: e && e.tabIndex || 0
        };
        this.setData({
            tabs: a.default.tabs,
            categories: a.default.categories,
            mode: t,
            isFolded: !0,
            realTimeLoad: "show",
            riseLoad: "show",
            playIndexLoad: "show",
            realTimePageNum: 1,
            risePageNum: 1,
            playIndexPageNum: 1,
            isIos: !!i.default.os.isIOS
        });
        var n = {
            cid: t.cid,
            pageNum: 1
        };
        this.getPlayIndexRank(n);
    },
    onShow: function() {
        var e = this.data.mode, a = {
            cid: (void 0 === e ? {} : e).cid,
            pageNum: 1
        };
        n.default.send({
            rpage: "wx_rank"
        }), this.sendPingback(), this.setData({
            realTimePageNum: 1,
            risePageNum: 1,
            scrollTop: 0
        }), wx.canIUse("pageScrollTo") && wx.pageScrollTo({
            scrollTop: 0
        }), this.getRealTimeRank(a), this.getRiseRank(a);
    },
    onReady: function() {
        var e = this, t = this.data.mode, i = void 0 === t ? {} : t;
        i.cid && a.default.categories.forEach(function(a, t) {
            a.cid == i.cid && t > 5 && e.setData({
                scrollIntoViewId: i.cid
            });
        });
    },
    sendPingback: function() {
        var e = this.data.mode, a = void 0 === e ? {} : e;
        0 == a.tabIndex ? s.default.send({
            rpage: "wx_rank",
            block: "wx_block_rank_time",
            rseat: "wx_rank_time",
            c1: a.cid
        }) : 1 == a.tabIndex ? s.default.send({
            rpage: "wx_rank",
            block: "wx_block_rank_up",
            rseat: "wx_rank_up",
            c1: a.cid
        }) : 2 == a.tabIndex && s.default.send({
            rpage: "wx_rank",
            block: "wx_block_rank_player",
            rseat: "wx_rank_player",
            c1: a.cid
        }), r.default.send({
            rpage: "wx_rank",
            block: "wx_block_rank_time",
            c1: a.cid
        }), r.default.send({
            rpage: "wx_rank",
            block: "wx_block_rank_up",
            c1: a.cid
        }), r.default.send({
            rpage: "wx_rank",
            block: "wx_block_rank_player",
            c1: a.cid
        });
    },
    resetPageNum: function() {
        this.setData({
            realTimePageNum: 1,
            risePageNum: 1,
            playIndexPageNum: 1,
            "mode.tabIndex": 0,
            realTimeData: [],
            riseData: [],
            playIndexData: [],
            scrollTop: 0
        });
    },
    handleCategoryList: function() {
        var e = this.data.isFolded;
        this.setData({
            isFolded: !e
        });
    },
    switchTab: function(e) {
        var a = e.currentTarget.dataset.tabIndex, t = void 0 === a ? 0 : a, i = this.data.mode && this.data.mode.cid;
        this.setData({
            "mode.tabIndex": t,
            realTimePageNum: 1,
            risePageNum: 1,
            scrollTop: 0
        });
        var n = {
            cid: i,
            pageNum: 1
        };
        0 == t ? (s.default.send({
            rpage: "wx_rank",
            block: "wx_block_rank_time",
            rseat: "wx_rank_time",
            c1: i
        }), this.getRealTimeRank(n)) : 1 == t ? (s.default.send({
            rpage: "wx_rank",
            block: "wx_block_rank_up",
            rseat: "wx_rank_up",
            c1: i
        }), this.getRiseRank(n)) : 2 == t && s.default.send({
            rpage: "wx_rank",
            block: "wx_block_rank_player",
            rseat: "wx_rank_player",
            c1: i
        });
    },
    switchChannel: function(e) {
        var a = e.currentTarget.dataset.cid, t = void 0 === a ? -1 : a;
        this.data.mode;
        this.resetPageNum(), this.sendPingback(), this.setData({
            "mode.cid": t
        });
        var i = {
            cid: t,
            pageNum: 1
        };
        wx.canIUse("pageScrollTo") && wx.pageScrollTo({
            scrollTop: 0
        }), this.getRealTimeRank(i), this.getRiseRank(i), this.getPlayIndexRank(i);
    },
    switchCategory: function(e) {
        var a = e.currentTarget.dataset.cid || -1;
        this.setData({
            "mode.cid": a,
            isFolded: !0
        }), this.sendPingback(), this.resetPageNum(), wx.canIUse("pageScrollTo") && wx.pageScrollTo({
            scrollTop: 0
        }), this.scrollIntoView(a);
        var t = {
            cid: a,
            pageNum: 1
        };
        this.getRealTimeRank(t), this.getRiseRank(t), this.getPlayIndexRank(t);
    },
    scrollIntoView: function(e) {
        if (!e) return !1;
        this.setData({
            scrollIntoViewId: e
        });
    },
    getRealTimeRank: function() {
        var e = this, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        t.default.getRealTimeRanking(a).then(function(t) {
            var n = a.pageNum, r = void 0 === n ? 1 : n, s = "complete";
            t.items && 0 == t.items.length && 1 == r && (i = {}, s = "firstError"), (10 == r || r > 1 && r < 10 && !t.isHasNext || 1 == r && t.items && t.items.length < 10) && (s = "nomore");
            e.data.mode;
            t = e.setNewData(t, i);
            var o = e.handleIsRealData(t);
            e.setData({
                realTimeData: o,
                realTimeLoad: s
            });
        }).catch(function(t) {
            1 == a.pageNum ? e.setData({
                realTimeData: {},
                realTimeLoad: "firstError"
            }) : e.setData({
                realTimeLoad: "error"
            });
        });
    },
    getRiseRank: function() {
        var e = this, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        t.default.getRiseRanking(a).then(function(t) {
            var n = a.pageNum, r = void 0 === n ? 1 : n, s = "complete";
            t.items && 0 == t.items.length && 1 == r && (i = {}, s = "firstError"), (10 == r || r > 1 && r < 10 && !t.isHasNext || 1 == r && t.items && t.items.length < 10) && (s = "nomore");
            e.data.mode;
            t = e.setNewData(t, i);
            var o = e.handleIsRealData(t);
            e.setData({
                riseData: o,
                riseLoad: s
            });
        }).catch(function() {
            1 == a.pageNum ? e.setData({
                riseData: {},
                riseLoad: "firstError"
            }) : e.setData({
                riseLoad: "error"
            });
        });
    },
    getPlayIndexRank: function() {
        var e = this, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        t.default.getPlayIndexRanking(a).then(function(t) {
            var n = a.pageNum, r = void 0 === n ? 1 : n, s = "complete";
            t.items && 0 == t.items.length && 1 == r && (i = {}, s = "firstError"), (10 == r || r > 1 && r < 10 && !t.isHasNext || 1 == r && t.items && t.items.length < 10) && (s = "nomore");
            e.data.mode;
            t = e.setNewData(t, i);
            var o = e.handlePlayIndex(t);
            e.setData({
                playIndexData: o,
                playIndexLoad: s
            });
        }).catch(function() {
            1 == a.pageNum ? e.setData({
                playIndexData: {},
                playIndexLoad: "firstError"
            }) : e.setData({
                playIndexLoad: "error"
            });
        });
    },
    setNewData: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).items || [], t = e.items || [], i = a.concat(t);
        return e.items = i, e;
    },
    onScrollToLower: function() {
        var e = this.data, a = e.mode, t = void 0 === a ? {} : a, i = e.realTimeLoad, n = e.riseLoad, r = e.playIndexLoad, s = e.realTimeData, o = void 0 === s ? {} : s, d = e.riseData, l = void 0 === d ? {} : d, c = e.playIndexData, m = void 0 === c ? {} : c, u = this.data.realTimePageNum || 1, g = this.data.risePageNum || 1, h = this.data.playIndexPageNum || 1;
        if (0 == t.tabIndex) {
            if ("error" == i || "show" == i || "empty" == i || "nomore" == i) return;
            var k = u + 1;
            this.setData({
                realTimePageNum: k,
                realTimeLoad: "show"
            }), this.getRealTimeRank({
                cid: t.cid,
                pageNum: k
            }, o);
        } else if (1 == t.tabIndex) {
            var p = g + 1;
            if ("error" == n || "show" == n || "empty" == n || "nomore" == n) return;
            this.setData({
                risePageNum: p,
                riseLoad: "show"
            }), this.getRiseRank({
                cid: t.cid,
                pageNum: p
            }, l);
        } else if (2 == t.tabIndex) {
            var x = h + 1;
            if ("error" == r || "show" == r || "empty" == r || "nomore" == r) return;
            this.setData({
                playIndexPageNum: x,
                playIndexLoad: "show"
            }), this.getPlayIndexRank({
                cid: t.cid,
                pageNum: x
            }, m);
        }
    },
    handlePlayIndex: function(e) {
        var a = this;
        return e && i.default.isArray(e.items) && e.items.length > 0 && e.items.forEach(function(e) {
            (e = a.iconsMark(e)).formatNum = e.playIndex.format(1, !0), e.numClass = a.handleNumClass(e.index), 
            e.originNum = e.playIndex, e.showNumTitle = "播放指数", e.iconUrl = a.handleRankIcon(e.index);
        }), e || [];
    },
    handleIsRealData: function(e) {
        var a = this;
        return e && i.default.isArray(e.items) && e.items.length > 0 && e.items.forEach(function(e) {
            (e = a.iconsMark(e)).formatNum = e.hotNum.format(1, !0), e.originNum = e.hotNum, 
            e.showNumTitle = "热度", e.numClass = a.handleNumClass(e.index), e.iconUrl = a.handleRankIcon(e.index);
        }), e || [];
    },
    handleNumClass: function(e) {
        var a = "", t = parseInt(e);
        return t > 9 && t < 100 ? a = "medium-num" : 100 == t && (a = "large-num"), a;
    },
    iconsMark: function(e) {
        if (e) switch (e.topRightCorner) {
          case "VIP":
            e.isVip = !0;
            break;

          case "付费":
            e.isPaid = !0;
            break;

          case "用券":
            e.isCoupon = !0;
            break;

          case "自制":
            e.isQiyiProduced = !0;
            break;

          case "独播":
            e.isExclusive = !0;
        }
        return e;
    },
    handleRankIcon: function(e) {
        return 1 == e ? "/resource/images/rank-tag-red.png" : 2 == e ? "/resource/images/rank-tag-orange.png" : 3 == e ? "/resource/images/rank-tag-yellow.png" : "/resource/images/rank-tag-grey.png";
    },
    onShareAppMessage: function() {
        var e = this.data.mode, a = void 0 === e ? {} : e;
        return s.default.send({
            rpage: "wx_rank",
            block: "",
            rseat: "wx_share",
            c1: a.cid
        }), {
            title: "爱奇艺风云榜",
            path: "/pages/ranking/ranking?cid=" + a.cid + "&tabIndex=" + a.tabIndex
        };
    },
    retryLoadData: function() {
        var e = this.data, a = e.mode, t = void 0 === a ? {} : a, i = e.realTimePageNum, n = void 0 === i ? 1 : i, r = e.risePageNum, s = void 0 === r ? 1 : r, o = (e.playIndexPageNum, 
        e.realTimeData), d = void 0 === o ? {} : o, l = e.riseData, c = void 0 === l ? {} : l, m = e.playIndexData, u = void 0 === m ? {} : m;
        0 == t.tabIndex ? this.getRealTimeRank({
            cid: t.cid,
            pageNum: n
        }, d) : 1 == t.tabIndex ? this.getRiseRank({
            cid: t.cid,
            pageNum: s
        }, c) : 2 == t.tabIndex && this.getPlayIndexRank({
            cid: t.cid,
            pageNum: s
        }, u);
    }
};

Page(Object.assign({}, o, {}));