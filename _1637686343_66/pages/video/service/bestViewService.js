function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return e && 8 === e.length ? e.slice(0, 4) + "-" + e.slice(4, 6) + "-" + e.slice(6, 8) + "期" : "";
}

function i(e, i) {
    var n = r(e, i);
    return {
        more: n.length > 2,
        title: t(i.period) + " 看点",
        videos: n.length > 1 ? n : []
    };
}

function n(e) {
    return e.filter(function(e) {
        return Object.assign(e, {
            aid: e.albumId,
            shortTitle: e.mainTitle || e.shortTitle,
            pageUrl: e.pageUrl,
            tags: e.tags,
            updateStrategy: "",
            vt: e.focus,
            imageUrl: e.imageUrl ? a.default.editePic(e.imageUrl, "_284_160") : "/resource/images/list-livevideo-list-bg.png",
            playCountCN: u.default.numToChinaNum(e.count)
        }), !!e.shortTitle;
    });
}

function r(e, t) {
    return e.filter(function(e) {
        return Object.assign(e, {
            shortTitle: e.mainTitle,
            tags: e.tags,
            updateStrategy: "",
            imageUrl: e.imageUrl ? a.default.editePic(e.imageUrl, "_284_160") : "/resource/images/list-livevideo-list-bg.png",
            showContent: e.duration,
            cid: e.channelId || e.cid,
            playCountCN: u.default.numToChinaNum(e.playCount)
        }), !!e.shortTitle;
    });
}

function l(e, t) {
    return e.reduce(function(e, i) {
        if (e || !i.callback) return e;
        var n = i.callback(i.videos, t);
        return n.length >= 2 ? {
            title: i.title,
            videos: n
        } : e;
    }, null);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var u = e(require("../../../common/utils/util")), a = e(require("../../../components/searchLayout/bind/bindUtil"));

exports.default = {
    initBestView: function(e, t) {
        if ("source" == t.subType) return i(e, t);
        var n = "精彩看点";
        return "movie" == t.subType && (n = "精彩片花"), "single" == t.subType && (n = "播放列表"), 
        l([ {
            callback: r,
            title: n,
            videos: e || []
        } ], t);
    },
    getRecommendVideos: function(e, t) {
        var i = "周边视频";
        return "single" == t.subType && (i = "播放列表"), l([ {
            callback: n,
            title: i,
            videos: e
        } ], t);
    }
};