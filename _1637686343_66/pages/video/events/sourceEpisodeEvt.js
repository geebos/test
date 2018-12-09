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

function i(e, t) {
    if (e.videoTag) return e.videoTag;
    var i = t.videos, o = t.currentYear, n = t.currentMonth;
    return i.reduce(function(e, t) {
        var i = r(t.period);
        i.year === o && i.month === n || (o = i.year, n = i.month);
        var s = a(o, n), u = e[s] || [];
        return u.push(t), e[s] = u, e;
    }, {});
}

function r(e) {
    return e && 8 === e.length ? {
        year: e.slice(0, 4),
        month: e.slice(4, 6)
    } : null;
}

function a(e, t) {
    return e + "-" + t;
}

function o(e) {
    return e.reduce(function(e, t) {
        var i = t.year, r = t.monthList.map(function(e) {
            return {
                id: a(i, e),
                text: e + "月",
                requestFlag: !1
            };
        });
        return e.concat(r);
    }, []);
}

function n(e, t) {
    var i, r = 0;
    for (var a in t) i || (i = a), t[a].some(function(t, i) {
        return t.qipuId === e && (r = i, !0);
    }) && (i = a);
    return {
        currentKey: i,
        index: r
    };
}

function s(e, t) {
    return wx.getSystemInfoSync().windowHeight - g.default.getPxByRpx(422, 120, 68, t ? 96 : 0);
}

function u(e) {
    return g.default.isString(e) && e.substring(0, e.indexOf("-"));
}

function d(e, t) {
    var i = [], r = !0, a = !1, o = void 0;
    try {
        for (var n, s = e[Symbol.iterator](); !(r = (n = s.next()).done); r = !0) {
            var u = t[n.value.id] || [];
            i.push(u);
        }
    } catch (e) {
        a = !0, o = e;
    } finally {
        try {
            !r && s.return && s.return();
        } finally {
            if (a) throw o;
        }
    }
    return i;
}

function c(e, t) {
    return t.reduce(function(t, i, r) {
        return t >= 0 ? t : i.id === e ? r : t;
    }, -1);
}

function l(e, t, r) {
    var a = t.qipuId, l = t.share, f = t.videoList, p = t.animation, v = e.data.sourceEpisode, h = {
        videoTag: i(v, f),
        months: r ? v.months : o(f.summary)
    }, y = n(a, h.videoTag), b = y.currentKey, m = y.index;
    return h.height = s(0, l), h.currentYear = u(b), h.animation = p, h.videos = d(h.months, h.videoTag), 
    h.selectedTabIndex = c(b, h.months), h.scrollTop = m * g.default.getPxByRpx(184), 
    h.scrollLeft = h.selectedTabIndex * g.default.getPxByRpx(120), h;
}

function f(e, t, i) {
    if (!t.year || !t.month) return e;
    var r = a(t.year, t.month);
    e.videoTag[r] = t.videos;
    var o = c(r, e.months), n = {};
    return n = i ? {
        currentYear: t.year,
        videos: d(e.months, e.videoTag)
    } : {
        currentYear: t.year,
        selectedTabIndex: o,
        videos: d(e.months, e.videoTag),
        scrollLeft: void 0
    }, Object.assign({}, e, n);
}

function p(e, t, i, r, a, o) {
    var n = e;
    if (!p.begin) {
        p.begin = !0;
        var s = n.data.sourceEpisode, u = s.videoTag[i + "-" + r], d = s.months, c = d[o] || {};
        if (!c.requestFlag || a) return y.getSourceVideoList(t, i, r).then(function(t) {
            if (e.globalPage.openSourceEpisodeFlag || (e.globalPage.openSourceEpisodeFlag = !0), 
            p.begin = !1, c.requestFlag = !0, d[o] = c, n.setData({
                "sourceEpisode.months": d
            }), !t) return !1;
            var u = {
                videos: t.videos,
                videoTag: s.videoTag,
                year: i,
                month: r,
                playInfo: n.data.originPlayInfo
            };
            s = f(s, u, a);
            var l = n.data.videoList;
            l = b.default.addSourceVideo(l, u), n.setData({
                sourceEpisode: s,
                videoList: l
            });
        }).catch(function() {
            p.begin = !1;
        });
        p.begin = !1;
        var l = {
            videos: u,
            videoTag: s.videoTag,
            year: i,
            month: r
        };
        return s = f(s, l), n.setData({
            sourceEpisode: s
        }), Promise.resolve(!0);
    }
}

function v(e, t) {
    var i = -1;
    g.default.isArray(e.videos) && (i = e.videos.reduce(function(e, i, r) {
        return e >= 0 ? e : i.qipuId === t ? r : e;
    }, -1));
    var r = {};
    return i * g.default.getPxByRpx(290) > 0 && (r = {
        scrollLeft: i * g.default.getPxByRpx(290)
    }), Object.assign({}, e, r);
}

function s() {
    return wx.getSystemInfoSync().windowHeight - g.default.getPxByRpx(422, 120, 68, 0);
}

function h(e, t) {
    var i = (t.videos || []).reduce(function(t, i, r) {
        return t >= 0 ? t : i.qipuId === e ? r : t;
    }, -1);
    return i >= 0 ? i * g.default.getPxByRpx(184) : 0;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var g = e(require("../../../common/utils/util")), y = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../service/videoService")), b = e(require("../service/videoListService")), m = e(require("./playVideoEvt")), x = e(require("./limitPlayEvt")), w = g.default.getPxByRpx(120);

exports.default = {
    openSourceEpisode: function() {
        var e = this.data, i = t();
        i.translate3d(0, 0, 0).step();
        var r = l(this, {
            qipuId: e.playInfo.qipuId,
            share: e.share,
            videoList: e.videoList,
            animation: i.export()
        }, this.globalPage.openSourceEpisodeFlag);
        this.setData({
            sourceEpisode: r
        });
        var a = r.selectedTabIndex;
        g.default.isArray(r.months) && g.default.isObject(r.months[a]) && !r.months[a].requestFlag && this.switchSource(a, !0);
    },
    bindSourceVideoTagScroll: function(e) {
        var t = this;
        clearTimeout(this.bindSourceVideoTagScroll.time), this.bindSourceVideoTagScroll.time = setTimeout(function() {
            var i = e.detail.scrollLeft, r = t.data, a = r.sourceEpisode.months[Math.floor(i / w)];
            if (a || !r.bestView.currentYear) {
                var o = g.default.isObject(a) && "string" == typeof a.id ? a.id.split("-")[0] : "", n = r.sourceEpisode;
                n = Object.assign({}, n, {
                    currentYear: o,
                    scrollLeft: void 0
                }), t.setData({
                    sourceEpisode: n
                });
            }
        }, 200);
    },
    switchSourceTap: function(e) {
        var t = e.detail.current;
        t = void 0 === t ? e.currentTarget.dataset.index : t, this.switchSource(t);
    },
    switchSource: function(e, t) {
        var i = this.data, r = "";
        if (i.sourceEpisode && i.sourceEpisode.months && i.sourceEpisode.months.length > 0 && (r = i.sourceEpisode.months[e]), 
        r) {
            var a = g.default.isObject(r) && "string" == typeof r.id ? r.id.split("-") : [], o = a[0], n = a[1];
            p(this, i.playInfo.sourceId, o, n, t, e);
        }
    },
    hideSourceEpisode: function() {
        var e = this.data, i = t();
        i.translate3d(0, "100%", 0).step();
        var r = e.sourceEpisode;
        r = Object.assign({}, r, {
            animation: i.export()
        });
        var a = e.videoList;
        a = v(a, e.playInfo.qipuId), this.setData({
            sourceEpisode: r,
            videoList: a
        });
    },
    playSourceVideoEpisode: function(e) {
        var t = this;
        this.player.pause();
        var i = this.data, r = e.currentTarget.dataset.qipuId, a = i.playInfo || {}, o = i.launchApp || !1, n = i.vrsMapQipuId || 0, s = i.isLimitEpisode || !1, u = i.launchEpisodeCard || !1, d = a.albumId || "", c = a.channelId || "";
        if (o && s && u && r != n && this.clickPingback({
            block: "wx_block_player_album",
            rseat: "wx_launchApp",
            aid: d,
            c1: c
        }), this.clickPingback({
            block: "wx_block_player_album",
            rseat: "wx_player_album",
            aid: d,
            c1: c
        }), this.globalPage.episodeCardFlag || (this.globalPage.episodeCardFlag = !0), a.qipuId == r) return !1;
        if (this.globalPage.switchSourceEpisodeFlag) return !1;
        this.globalPage.sourceVideoList = i.videoList, this.globalPage.videoCardType = "videoList", 
        this.globalPage.switchSourceEpisodeFlag = !0;
        var l = {};
        g.default.isObject(i.videoList) && g.default.isArray(i.videoList.videos) && (l = i.videoList.videos.filter(function(e) {
            return e.qipuId === r;
        })[0]);
        var f = this.data.videoList;
        Object.keys(f).indexOf("scrollLeft") > -1 && delete f.scrollLeft, this.setData({
            isPrevue: !1,
            videoList: f
        }), l.playCountCN = g.default.numToChinaNum(l.playCount);
        var p = x.default.isCurrentLimitVideo(this);
        if ((!i.isLimited || i.isLimited && p) && this.uploadRecord(this.globalPage.currentTime, null), 
        !l.qipuId) return !1;
        this.loadPlayFlow(l.qipuId, !1).then(function(e) {
            t.globalPage.switchSourceEpisodeFlag = !1;
        }).catch(function(e) {
            t.globalPage.switchSourceEpisodeFlag = !1;
        });
    },
    playSourceBestView: function(e) {
        this.globalPage.videoCardType = "bestView", this.clickPingback({
            block: "wx_block_player_kandian",
            rseat: "wx_player_kandian"
        });
        var t = this.data, i = e.currentTarget.dataset.qipuId, r = t.bestView.videos.filter(function(e) {
            return e.qipuId === i;
        })[0];
        m.default.switchPlayVideo(this, r);
    },
    getSourceEpisodeIndex: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1], i = -1;
        return g.default.isArray(e) ? (e.forEach(function(e, r) {
            g.default.isArray(e) && e.findIndex(function() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).qipuId == t;
            }) >= 0 && (i = r);
        }), i) : i;
    },
    showSourceBestView: function() {
        this.clickPingback({
            block: "wx_block_player_kandian",
            rseat: "wx_player_morekandian"
        });
        var e = this.data, i = s(), r = t();
        r.translate3d(0, 0, 0).step();
        var a = e.playInfo, o = e.bestView, n = e.sourceBestView;
        n = Object.assign({}, n, {
            height: i,
            animation: r.export(),
            scrollTop: h(a.qipuId, o)
        }), this.setData({
            sourceBestView: n
        });
    },
    hideSourceBestView: function() {
        var e = this.data, i = t();
        i.translate3d(0, "100%", 0).step();
        var r = e.sourceBestView, a = e.bestView, o = e.playInfo;
        r = Object.assign({}, r, {
            animation: i.export()
        });
        var n = (a.videos || []).reduce(function(e, t, i) {
            return e >= 0 ? e : t.qipuId === o.qipuId ? i : e;
        }, -1);
        a = Object.assign({}, a, {
            scrollLeft: n * g.default.getPxByRpx(260, 30)
        }), this.setData({
            sourceBestView: r,
            bestView: a
        });
    },
    sourceScrollLeft: v
};