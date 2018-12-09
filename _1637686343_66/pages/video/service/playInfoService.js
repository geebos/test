function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return "source" !== e.subType ? e : (e.tags = i(e.tags, 3), e.hosts = i(e.hosts, 3), 
    e.guests = i(e.guests, 6), e);
}

function i() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments[1];
    return e.split(",").slice(0, t).join(",");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = e(require("../../../common/utils/util")), r = require("../common/commonService"), s = e(require("../../../components/searchLayout/bind/bindUtil"));

exports.default = {
    getPlayInfo: function(e, i) {
        if (e.subType = (0, r.getSubType)(e), e = Object.assign(e), e.pageUrl = e.pageUrl, 
        i && i.videos) {
            var s = i.videos[0];
            e.vt = s ? s.vt : "";
        }
        if (e.mainActors && (e.mainActors = o.default.string.slice(e.mainActors, 0, 6, ",")), 
        e.tags && (e.tags = o.default.string.slice(e.tags, 0, 6, ",")), e.score && (e.score = parseFloat(e.score).toFixed(1)), 
        "movie" == e.subType) {
            var n = e.period || "";
            e.period && e.period.length >= 4 && (e.period = "" + n.slice(0, 4)), e.tags = o.default.string.slice(e.tags, 0, 3, ",");
        }
        if ("single" == e.subType) {
            var u = e.period || "";
            e.period && e.period.length >= 8 && (e.period = u.slice(0, 4) + "-" + u.slice(4, 6) + "-" + u.slice(6, 8));
        }
        return e.issueTime && e.issueTime.length > 10 && (e.issueTime = e.issueTime.substring(0, 10)), 
        e.playCountCN = o.default.numToChinaNum(e.playCount), e.pd = e.order, e = t(e);
    },
    setPlayInfo: function(e, t) {
        var i = (0, r.getSubType)(e) || "";
        e.subType = i;
        var o = e.hotNum, s = e.filterStatus, n = e.playCountCN;
        return o || "album" != i || (o = t.hotNum), s || (s = t.filterStatus), n || (n = t.playCountCN), 
        Object.assign({}, e, {
            aid: 1 == e.type ? e.aid : e.qipuId,
            hotNum: o,
            filterStatus: s,
            playCountCN: n
        });
    },
    getFragments: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return e.length < 2 ? {
            title: "片段",
            icon: !0,
            videos: []
        } : (e = e.filter(function(e, t) {
            return e.playCountCN = o.default.numToChinaNum(e.playCount), e.sourceName = e.videoName, 
            e.shortTitle = e.mainTitle, e.albumName = e.videoName, e.imageUrl = e.imageUrl ? s.default.editePic(e.imageUrl, "_284_160") : "/resource/images/list-livevideo-list-bg.png", 
            e.showContent = e.topRightCorner && "合集" == e.topRightCorner ? e.bottomRightCorner ? e.bottomRightCorner + "个片段" : "" : e.bottomRightCorner ? o.default.time.formatSecondOmit(e.bottomRightCorner) : "", 
            e.icon = {
                isCollect: !(!e.topRightCorner || "合集" != e.topRightCorner),
                topRightCorner: e.topRightCorner
            }, !!e.shortTitle;
        }), {
            title: "片段",
            icon: !0,
            videos: e
        });
    }
};