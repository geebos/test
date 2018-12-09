function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", r = e || [], n = e && e.length || 0, i = 0, a = 0;
    return 2 == t ? (a = n % 3, i = Math.floor(n / 3), n >= 3 && 0 !== a && (r = e.slice(0, 3 * i)), 
    r.forEach(function(e) {
        e.imageUrl = e.imageUrl ? e.imageUrl : "/resource/images/vertical-default-bg.png";
    })) : 1 != t && 5 != t && 7 != t || (a = n % 2, i = Math.floor(n / 2), n >= 2 && 0 !== a && (r = e.slice(0, 2 * i)), 
    r.forEach(function(e) {
        e.imageUrl = e.imageUrl ? e.imageUrl : "/resource/images/horizontal-default-bg.png";
    })), r;
}

function r(e) {
    var t = e.info, r = e.index, n = void 0 === r ? 0 : r;
    if (t && t.cards) {
        var i = t.cards[0].videos;
        return i && u.default.isObject(i[n]) ? i[n] : {};
    }
}

function n(e, t) {
    var r = t.isLogin, n = m.default.get() || [], a = t.records || [], s = [];
    if (n.forEach(function(e, t) {
        r ? a.forEach(function(t) {
            e.qipuId == t.tvId && (e.playTime = t.videoPlayTime, "film" == e.type && e.qipuId == t.tvId && s.push(e));
        }) : "film" == e.type && s.push(e);
    }), s = s[0] || {}, s.noshow = !1, !s.date) return {};
    var c = s.content || "";
    c.length > 10 && (c = c.substring(0, 10) + "...");
    var l = u.default.time.formatSecondOmit(s.playTime);
    return l = i(l, s), s.content = "上次观看:" + c + ",已看" + l, s.animation = o(), s.noshow ? {} : Object.assign({}, e, s);
}

function i(e, t) {
    if (e) {
        var r = e.split(":"), n = r.length;
        switch (2 == n && r[0] <= 0 && r[1] < 30 && (t.noshow = !0), n) {
          case 3:
            return r[0] + "时" + r[1] + "分" + r[2] + "秒";

          case 2:
            return r[0] + "分" + r[1] + "秒";

          case 1:
            return r[0] + "秒";
        }
    }
}

function a(e, t) {
    return e.animation = s(t), e;
}

function o() {
    var e = wx.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
    });
    return e.translate3d(0, 0, 0).step(), e.export();
}

function s(e) {
    var t = e ? 0 : 1e3, r = wx.createAnimation({
        duration: t,
        timingFunction: "ease"
    });
    return r.translate3d(0, "100%", 0).step(), r.export();
}

function c(e) {
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
        break;

      case "拍客":
        e.isPaiKe = !0;
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var l = e(require("../../../components/load/loadReducers")), d = require("../../../components/searchLayout/searchLayoutReducer"), u = e(require("../../../common/utils/util")), m = e(require("../../../components/history/playRecordService")), h = e(require("../../../common/source/videoUtil")), p = e(require("../../../common/pingback/block"));

exports.default = {
    record: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
        switch (t.type) {
          case "SET":
            return n(e, t);

          case "REMOVE_PLAY_RECORD":
            return a(e, t.rightTime);

          default:
            return e;
        }
    },
    qipuId: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments[1];
        switch (t.type) {
          case "SET":
            return r(t).qipuId || e;

          case "SWITCH_FOCUS":
            return t.qipuId;

          default:
            return e;
        }
    },
    bgImageUrl: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments[1];
        switch (t.type) {
          case "SET":
            return r(t).bgImg || e;

          case "SWITCH_FOCUS":
            return t.bgImageUrl || e;

          default:
            return e;
        }
    },
    focus: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1];
        if ("SET" === t.type) {
            if (!t.info) return e;
            var r = t.info, n = [];
            return r.cards && r.cards.forEach(function(e) {
                0 != e.order || (n = e);
            }), n.videos.filter(function(e, t) {
                e.cardType = n.cardType, e.order = n.order, e.tvid = e.qipuId;
                var r = h.default.getVideoTemplate(e), i = {};
                return "album" == r ? i = {
                    qipuId: e.qipuId,
                    contentA: e.mainTitle,
                    contentB: e.lowerRightCorner,
                    contentC: e.actors ? "主演：" + e.actors : "",
                    contentD: e.subtitle
                } : "source" == r ? i = {
                    qipuId: e.qipuId,
                    contentA: e.mainTitle,
                    contentB: e.lowerRightCorner + (e.updateStrategy ? "/" + e.updateStrategy : ""),
                    contentC: e.actors ? "主持人：" + e.actors : "",
                    contentD: e.subtitle
                } : "movie" == r ? i = {
                    qipuId: e.qipuId,
                    contentA: e.mainTitle,
                    contentB: e.directors ? "导演：" + e.directors : "",
                    contentC: e.actors ? "主演：" + e.actors : "",
                    contentD: e.subtitle,
                    isMovie: !0
                } : "live" == r && (i = {
                    qipuId: e.qipuId,
                    contentA: e.mainTitle,
                    contentB: "",
                    contentC: e.subtitle,
                    contentD: "直播时间：" + e.showTime
                }), e.index = t + 1, p.default.send({
                    rpage: "wx_home",
                    block: "wx_block_home_focus" + e.index,
                    position: e.index
                }), c(e), Object.assign(e, i, {
                    block: "wx_focus"
                }), !!e.bgImg;
            });
        }
        return e;
    },
    tags: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], r = arguments[1];
        if ("SET" === r.type) {
            var n = r.info.cards.slice(1);
            if (!r.info) return e;
            var i = {
                "直播": {
                    channelId: 151,
                    rseat: ""
                },
                "电视剧": {
                    channelId: 2,
                    rseat: "wx_home_moredsj"
                },
                "电影": {
                    channelId: 1,
                    rseat: "wx_home_moredy"
                },
                "综艺": {
                    channelId: 6,
                    rseat: "wx_home_morezy"
                },
                "动漫": {
                    channelId: 4,
                    rseat: "wx_home_moredm"
                }
            }, a = [], o = {};
            (n = n.filter(function(e) {
                return 3 == e.cardType ? e.videos && e.videos.length >= 3 : e;
            })).forEach(function(e, r) {
                var n = e.kvs ? e.kvs.card_mcnt : "";
                2 == e.cardType ? (p.default.send({
                    rpage: "wx_home",
                    block: "wx_block_home_source",
                    mcnt: n
                }), o = Object.assign(e, {
                    tagName: e.cardName,
                    listClass: "m-list_content",
                    listItemClass: "m-list_item",
                    itemPicClass: "m-list_item-pic",
                    showList: t(e.videos, e.cardType),
                    channelId: e.videos && e.videos.length > 0 ? e.videos[0].channelId : "",
                    channelOrder: e.order
                })) : 1 == e.cardType ? (p.default.send({
                    rpage: "wx_home",
                    block: "wx_block_home_source",
                    mcnt: n
                }), o = Object.assign(e, {
                    tagName: e.cardName,
                    listClass: "m-list-horizontal_content",
                    listItemClass: "m-list-horizontal_item",
                    itemPicClass: "m-list-horizontal_item-pic",
                    showList: t(e.videos, e.cardType),
                    channelId: i["综艺"].channelId || "",
                    channelOrder: e.order
                })) : 3 == e.cardType ? (p.default.send({
                    rpage: "wx_home",
                    block: "wx_block_home_playlist",
                    mcnt: n
                }), o = Object.assign(e, {
                    tagName: e.cardName,
                    showList: e.videos.slice(0, 15),
                    channelOrder: e.order,
                    listClass: "m-swiperList_live",
                    listItemClass: "m-swiperList_live_item",
                    itemPicClass: "m-swiperList_live_item-pic"
                })) : 4 == e.cardType ? (p.default.send({
                    rpage: "wx_home",
                    block: "wx_block_home_live",
                    mcnt: n
                }), o = Object.assign(e, {
                    tagName: e.cardName,
                    showList: t(e.videos, e.cardType),
                    channelId: e.videos && e.videos.length > 0 ? e.videos[0].channelId : "",
                    channelOrder: e.order
                }), e.showList = e.showList.filter(function(e, t) {
                    return "WAITING" == e.playStatus;
                }), e.showList = e.showList.slice(0, 10), e.foldFlag = e.showList.length > 2) : 5 == e.cardType ? (p.default.send({
                    rpage: "wx_home",
                    block: "wx_block_home_theatre",
                    mcnt: n
                }), o = Object.assign(e, {
                    tagName: e.cardName,
                    showList: t(e.videos, e.cardType),
                    channelOrder: e.order
                })) : 6 == e.cardType ? (p.default.send({
                    rpage: "wx_home",
                    block: "wx_block_home_banner",
                    mcnt: n
                }), o = Object.assign(e, {
                    tagName: e.cardName,
                    channelOrder: e.order,
                    showList: e.videos || []
                })) : 7 == e.cardType && (p.default.send({
                    rpage: "wx_home",
                    block: "wx_block_home_subtitle",
                    mcnt: n
                }), o = Object.assign(e, {
                    tagName: e.cardName,
                    showList: t(e.videos, e.cardType),
                    channelOrder: e.order,
                    isSub: !0,
                    listClass: "m-list-horizontal_content",
                    listItemClass: "m-list-horizontal_item",
                    itemPicClass: "m-list-horizontal_item-pic"
                })), a.push(o);
            });
            var s = [];
            return a.forEach(function(e, t) {
                var r = e.videos;
                r && r.length, 6 != e.cardType && 4 != e.cardType && r.map(function(e, t) {
                    c(e);
                }), s.push(e);
            }), s.forEach(function(e, t) {
                var r = t + 1;
                e.index = r;
            }), s;
        }
        return "UPDATE_TAGS" == r.type ? r.tags : e;
    },
    load: l.default,
    searchLayout: d.searchLayout,
    scrollBodyHeight: d.scrollBodyHeight,
    customType: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, t = arguments[1];
        switch (t.type) {
          case "SET":
            return r(t).customType || e;

          case "SWITCH_FOCUS":
            return t.customType || e;

          default:
            return e;
        }
    },
    customLink: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments[1];
        switch (t.type) {
          case "SET":
            return r(t).customLink || e;

          case "SWITCH_FOCUS":
            return t.customLink || "";

          default:
            return e;
        }
    },
    focusIndex: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments[1];
        switch (t.type) {
          case "SET":
            return 1;

          case "SWITCH_FOCUS":
            return t.focusIndex || e;

          default:
            return e;
        }
    }
};