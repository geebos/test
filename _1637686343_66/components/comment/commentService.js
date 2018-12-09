function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    var t = {
        qypid: "02000021010000000000",
        business: "comment",
        tvid: e,
        is_iqiyi: !0,
        is_video_page: !0
    };
    return new i.default(function(e, n) {
        wx.request({
            url: "https://control-i.iqiyi.com/control/content_config",
            data: t,
            method: "GET",
            success: function(t) {
                var i = t.data;
                i && "A00000" == i.code ? e(i) : n(i);
            },
            fail: function(e) {
                n(e);
            }
        });
    });
}

function n(e) {
    var t = e.qipuId, n = void 0 === t ? "" : t, s = e.pageNum, d = void 0 === s ? 1 : s, l = e.pageSize, m = void 0 === l ? 10 : l, f = e.types, p = void 0 === f ? "hot" : f, v = e.hotSize, g = void 0 === v ? 10 : v, _ = e.lastId, y = void 0 === _ ? "" : _, h = {
        business_type: 17,
        timestamp: new Date().getTime(),
        content_id: n,
        uid: o.default.getUid(),
        agent_version: "9.6.0",
        agent_type: r.default.os.isIOS ? 116 : 115,
        page: d,
        page_size: m,
        hot_size: g,
        types: p,
        last_id: y
    };
    return h.sign = a.default.getSign(h), u.commonGetRequest({
        url: "" + r.default.OUTERHOST.COMMENT + c.COMMENT,
        reqParams: h
    }).then(function(e) {
        return e;
    }).catch(function(e) {
        return i.default.reject(e);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = e(require("../../common/polyfill/promise")), o = e(require("../../common/user/user")), r = e(require("../../common/utils/util")), u = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}(require("../../common/serviceApi/serviceApi")), a = e(require("./util")), c = {
    COMMENT: "/v3/comment/get_comments.action"
};

exports.default = {
    getCommentSources: function(e, o) {
        return t(e.qipuId).then(function(t) {
            return t.data && t.data.contentDisplayEnable ? n(e) : (o.setData({
                newComments: {
                    title: "最新评论",
                    type: "time",
                    comments: [],
                    isShowComment: !0
                },
                subLoad: "noMore"
            }), new i.default(function(e, t) {
                t({
                    error: "不展示评论"
                });
            }));
        }).catch(function(e) {
            return new i.default(function(t, n) {
                n(e);
            });
        });
    },
    likeOrCancelComment: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = {
            uid: o.default.getUid(),
            content_id: e,
            appid: 24,
            proxyUri: t ? "v3/comment/internal/like.action" : "v3/comment/internal/remove_like.action",
            business_type: 17
        };
        return n.sign = a.default.getSign(n), u.commonGetRequest({
            url: "" + r.default.OUTERHOST.PUB + c.COMMENT,
            reqParams: n
        }).then(function(e) {
            return e;
        }).catch(function(e) {
            return r.default.isObject(e) && e.code && ("B00004" == e.code ? wx.showToast({
                icon: "none",
                title: "你点的太快了"
            }) : "string" == typeof e.code && -1 == e.code.indexOf("FEC") && wx.showToast({
                icon: "none",
                title: "已经喜欢过了"
            })), i.default.reject(e);
        });
    },
    getContentDisplay: t,
    getComments: n
};