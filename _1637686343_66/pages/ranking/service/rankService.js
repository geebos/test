Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}(require("../../../common/serviceApi/serviceApi")), r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/utils/util"));

exports.default = {
    getRealTimeRanking: function(n) {
        var u = {
            cid: n.cid || 2,
            dim: "hour",
            len: 10,
            pageNumber: n.pageNum || 1,
            play_platform: "H5_QIYI"
        };
        return e.commonGetRequest({
            url: "" + r.default.OUTERHOST.PUB + t.REALTIME,
            reqParams: u
        }).then(function(e) {
            return e;
        }).catch(function(e) {
            return Promise.reject(e);
        });
    },
    getRiseRanking: function(n) {
        var u = {
            cid: n.cid || 2,
            dim: "hour",
            len: 10,
            pageNumber: n.pageNum || 1,
            play_platform: "H5_QIYI"
        };
        return e.commonGetRequest({
            url: "" + r.default.OUTERHOST.PUB + t.RISE,
            reqParams: u
        }).then(function(e) {
            return e;
        }).catch(function(e) {
            return Promise.reject(e);
        });
    },
    getPlayIndexRanking: function(n) {
        var u = {
            cid: n.cid || 2,
            dim: "day",
            len: 10,
            pageNumber: n.pageNum || 1,
            play_platform: "H5_QIYI"
        };
        return e.commonGetRequest({
            url: "" + r.default.OUTERHOST.PUB + t.PLAYINDEX,
            reqParams: u
        }).then(function(e) {
            return e;
        }).catch(function(e) {
            return Promise.reject(e);
        });
    }
};

var t = {
    REALTIME: "/h5/mina/board/realTime/",
    RISE: "/h5/mina/board/rise/",
    PLAYINDEX: "/h5/mina/board/playIndex/"
};