function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    var a = e.totalPages, i = e.videos, o = e.pageSize;
    return i.length > (a - 1) * o ? Promise.resolve(e.videos) : r(t.albumId, 2, e.totalPages, e.videos);
}

function r(e, t, a, i) {
    if (t > a) return Promise.resolve(i);
    for (var o = [], n = 1; t <= a && n <= 4; ) {
        var u = l.getVideoList(e, t);
        n++, t++, o.push(u);
    }
    return Promise.all(o).then(function(e) {
        i = e.reduce(function(e, t) {
            return e.concat(t.data.videoList.videos);
        }, i);
    }).then(function() {
        return r(e, t, a, i);
    });
}

function a(e) {
    e.payMark;
    return e.payMark >= 4 && e.payMark <= 6 ? {
        isTennisVip: !0
    } : {
        isVip: 0 !== e.payMark
    };
}

function i(e) {
    return e && 8 === e.length ? e.slice(0, 4) + "-" + e.slice(4, 6) + "-" + e.slice(6, 8) + "期" : "";
}

function o(e, t) {
    var r = t.albumId || "";
    e.forEach(function(e) {
        e.icon = a(e), e.showContent = i(e.period), e.playCountCN = u.default.numToChinaNum(e.playCount);
        var t = r || e.qipuId;
        e.launchParams = u.default.string.schemaStr(d.default.getPlayerParam(t, e.qipuId), "player", "472");
    });
}

function n(e) {
    function t(e) {
        var t = e.split("-");
        return {
            year: t[0],
            month: t[1]
        };
    }
    var r = [];
    e.videoTag[e.year + "-" + e.month] = e.videos;
    var a = [];
    for (var i in e.videoTag) a.push(i);
    for (var o = 0; o < a.length; o++) for (var n = o; n < a.length; n++) if (function(e, r) {
        var a = t(e), i = a.year, o = a.month, n = t(r), u = n.year, d = n.month;
        return u > i || i === u && d > o;
    }(a[o], a[n])) {
        var u = a[o];
        a[o] = a[n], a[n] = u;
    }
    var d = !0, l = !1, s = void 0;
    try {
        for (var c, v = a[Symbol.iterator](); !(d = (c = v.next()).done); d = !0) {
            var f = c.value;
            r = r.concat(e.videoTag[f]);
        }
    } catch (e) {
        l = !0, s = e;
    } finally {
        try {
            !d && v.return && v.return();
        } finally {
            if (l) throw s;
        }
    }
    return r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var u = e(require("../../../common/utils/util")), d = e(require("../../../common/schema/schemaStr")), l = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("./videoService"));

exports.default = {
    loadVideoList: function(e) {
        var r = e.videoList, a = e.playInfo, i = !r || !r.videos || r.videos.length <= 0;
        if (r.currentYear && r.currentMonth && i) return l.getSourceVideoList(a.sourceId, r.currentYear, r.currentMonth).then(function(t) {
            if (t) {
                var r = [];
                t.videos.forEach(function(e) {
                    if (e && e.qipuId) {
                        delete e.books, delete e.comicbooks, delete e.tickets, delete e.games, e.aid = a.albumId || "";
                        var t = e.aid || e.qipuId;
                        e.launchParams = u.default.string.schemaStr(d.default.getPlayerParam(t, e.qipuId), "player", "472");
                    }
                    r.push(e);
                }), e.videoList.videos = r;
            }
            return e;
        });
        if (r && !a.sourceId) return t(r, a).then(function(t) {
            var i = [];
            return t.forEach(function(e, t) {
                if (e && e.qipuId) {
                    delete e.vpic, delete e.imageUrl, delete e.vurl, delete e.books, delete e.comicbooks, 
                    delete e.tickets, delete e.games, delete e.qualityImageUrl, delete e.period, e.aid = a.albumId || "";
                    var r = e.aid || e.qipuId;
                    e.launchParams = u.default.string.schemaStr(d.default.getPlayerParam(r, e.qipuId), "player", "472"), 
                    i.push(e);
                }
            }), r.videos = i, r.page = r.totalPages, u.default.storage.handleStorageMuti("set", "CUR_VIDEOLIST_VIDEOS", i), 
            e;
        });
        if (a && "album" == a.subType && r && r.videos && r.videos.length) {
            var o = [];
            r.videos.forEach(function(e, t) {
                if (e && e.qipuId) {
                    delete e.vpic, delete e.imageUrl, delete e.vurl, delete e.books, delete e.comicbooks, 
                    delete e.tickets, delete e.games, delete e.qualityImageUrl, delete e.period, e.aid = a.albumId || "";
                    var r = e.aid || e.qipuId;
                    e.launchParams = u.default.string.schemaStr(d.default.getPlayerParam(r, e.qipuId), "player", "472"), 
                    o.push(e);
                }
            }), u.default.storage.handleStorageMuti("set", "CUR_VIDEOLIST_VIDEOS", o);
        }
        return Promise.resolve(e);
    },
    addVideo: function(e, t) {
        return l.getVideoList(e, t).then(function(e) {
            try {
                e = e.data;
                var t = [];
                return u.default.isObject(e.videoList) && u.default.isArray(e.videoList.videos) && (t = e.videoList.videos), 
                Promise.resolve(t);
            } catch (e) {
                return Promise.reject();
            }
        });
    },
    getVideoList: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
        return "source" === t.subType && e && (o(e.videos || [], t), e.title = "选集", e.more = !0, 
        e.icon = !0, e.subTitle = !0), e;
    },
    addSourceVideo: function(e, t) {
        return o(t.videos, t.playInfo), Object.assign({}, e, {
            videos: n(t)
        });
    }
};