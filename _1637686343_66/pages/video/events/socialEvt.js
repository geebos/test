function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function i(e) {
    var t = void 0;
    switch (e) {
      case "album":
        t = 1;
        break;

      case "source":
        t = 2;
        break;

      case "movie":
        t = 7;
        break;

      case "live":
        t = 9;
        break;

      default:
        t = 1;
    }
    return t;
}

function a(e) {
    var t = e.sourceName || e.shortTitle, i = e.subType || "";
    if ("source" == i) if (e.isFeatureFilm) {
        var a = e.period + "";
        a && a.length >= 8 && (a = a.substring(4, 6) + "-" + a.substring(6) + "期"), t += a;
    } else t = e.shortTitle || e.videoName; else "single" == i && (t = e.shortTitle || e.videoName);
    return t;
}

function s() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], i = e.qipuId, a = e.albumId, s = e.isEffect, u = e.featureVideoId, o = (e.channelId, 
    e.isFeatureFilm, e.isHidden), r = e.videoId, l = e.isLimited, c = u || r;
    o || d.default.send({
        rpage: "wx_player",
        block: "wx_block_player_feature"
    });
    var m = t.app.globalData.showScene, b = "";
    e.btnText = "观看全片", 1036 == m && c && s && i ? b = n.default.string.schemaStr(f.default.getPlayerParam(a, c), "player", "472") : l && (e.btnText = "查看详情"), 
    t.setData({
        featureInfo: e,
        singlePluginParams: b
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var u = t(require("../../../common/user/user")), o = t(require("../../../components/subscribe/playSubService")), r = e(require("../../../common/source/videoUtil")), l = require("../../../common/form/form"), n = t(require("../../../common/utils/util")), d = t(require("../../../common/pingback/block")), c = e(require("../service/videoService")), f = t(require("../../../common/schema/schemaStr"));

exports.default = {
    checkIsSubscribe: function(e) {
        var t = this, a = e.channelId, s = (e.albumQipuId, e.qipuId), r = (e.tvid, e.sourceId, 
        e.albumId), l = i(e.subType);
        this.setData({
            videoType: l
        });
        var n = "";
        1 == l ? n = r : 2 == l && (n = r), 7 == l && (n = s);
        u.default.isLogin() ? this.collectAlbum(l, n, a, "https://subscription.iqiyi.com/dingyue/api/isSubscribed.action", !0).then(function(e) {
            e ? t.setData({
                isCollect: !0
            }) : t.setData({
                isCollect: !1
            });
        }, function(e) {
            (e.code = "A00001") && t.setData({
                isCollect: !1
            });
        }) : o.default.getIndex(e.albumId) > -1 ? this.setData({
            isCollect: !0
        }) : this.setData({
            isCollect: !1
        });
    },
    collectVideo: function(e) {
        var t = this, a = this.data, s = a.playInfo, r = a.tmtsInfo, n = a.subscribePlayInfo, d = (s.albumQipuId, 
        s.sourceId, e.detail.formId), c = e.currentTarget.dataset, f = c.albumId, m = c.channelId, b = c.isCollect, p = c.tvid, I = b ? "wx_player_cancelcollection" : "wx_player_collection", g = "", h = i(s.subType), v = b ? "已取消收藏" : "收藏成功，可在“我的页面”查看";
        1 == h ? g = f : 2 == h && (g = f), 7 == h && (g = p);
        var y = b ? "https://subscription.iqiyi.com/dingyue/api/unsubscribe.action" : "https://subscription.iqiyi.com/dingyue/api/subscribe.action";
        this.clickPingback({
            block: "",
            rseat: I
        }), u.default.isLogin() ? this.collectAlbum(h, g, m, y).then(function(e) {
            e && (t.setData({
                isCollect: !b,
                toastTitle: v,
                showToast: !0
            }), setTimeout(function() {
                t.setData({
                    showToast: !1
                });
            }, 3e3));
        }).catch(function(e) {
            t.setData({
                toastTitle: "网络异常，请重试",
                showToast: !0
            }), setTimeout(function() {
                t.setData({
                    showToast: !1
                });
            }, 3e3);
        }) : (b ? o.default.remove(g) : this.saveSubscribe(n, {}, r, !0), this.setData({
            isCollect: !b,
            toastTitle: v,
            showToast: !0
        }), setTimeout(function() {
            t.setData({
                showToast: !1
            });
        }, 3e3), o.default.get()), (0, l.collectFormIdMuti)(d, I);
    },
    saveSubscribe: function(e, t, s, l) {
        var n = a(e), d = r.is6minVideo(s), c = this.globalPage.duration || (d ? 360 : 0) || e.duration, f = (t.playTime == t.duration ? this.globalPage.currentTime : t.playTime) || this.globalPage.currentTime;
        f = f.toFixed ? f.toFixed(0) : f, o.default.save({
            id: e.albumId || e.tvid,
            qipuId: e.qipuId || e.tvid,
            tvId: e.qipuId,
            albumQipuId: e.albumId,
            channelId: e.channelId,
            sourceId: e.sourceId,
            aid: e.albumId || e.sourceId || e.aid || e.qipuId,
            vid: e.vid,
            subType: i(e.subType),
            subKey: e.albumId,
            albumName: "single" != e.subType ? e.albumName : e.videoName || e.vn,
            sourceName: "single" != e.subType ? e.sourceName : e.videoName || e.vn,
            playTime: l ? c : f,
            duration: c,
            content: n,
            imgUrl: e.albumImageUrl || e.imageUrl || "",
            date: Date.now(),
            type: "single" != e.subType ? "film" : "notfilm",
            payMark: e.payMark,
            exclusive: e.exclusive,
            isVip: e.isVip,
            bossStatus: e.bossStatus,
            videoDuration: e.duration
        }, u.default.isLogin());
    },
    checkIfAgreeSingle: function(e) {
        var t = n.default.storage.handleStorageMuti("get", "AGREE_SINGLE_VIDEOS");
        if (!n.default.isArray(t) || n.default.isArray(t) && 0 == t.length) return !1;
        var i = t.find(function(t) {
            return t.qipuId == e;
        });
        if (!i) return !1;
        this.setData({
            agreeSingleVideo: i
        });
    },
    agreeSingle: function(e) {
        var t = e.currentTarget.dataset, i = t.isAgree, a = t.qipuId, s = n.default.storage.handleStorageMuti("get", "AGREE_SINGLE_VIDEOS") || [], u = n.default.isArray(s) && s.findIndex(function(e) {
            return e.qipuId == a;
        }), o = (i = !i) ? "wx_player_like" : "wx_player_dislike";
        this.clickPingback({
            block: "",
            rseat: o
        });
        var r = {
            qipuId: a,
            isAgreeSingle: i
        };
        this.setData({
            agreeSingleVideo: r
        }), u < 0 && s.length < 20 ? s.push(r) : u < 0 && s.length >= 20 ? s.shift().push(r) : u >= 0 && s.splice(u, 1, r), 
        n.default.storage.handleStorageMuti("set", "AGREE_SINGLE_VIDEOS", s);
    },
    handleSingleSource: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
        e.featureVideoId ? c.getVideoFeatureInfo(e.featureVideoId).then(function(i) {
            i && (i.featureVideoId = e.featureVideoId, s(i, t));
        }) : e.albumId && e.albumId != e.qipuId ? c.getAlbumFeatureInfo(e.albumId).then(function(e) {
            e && (e.featureVideoId = "", s(e, t));
        }) : t.setData({
            featureInfo: null
        });
    }
};