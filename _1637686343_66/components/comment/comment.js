function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1], o = arguments[2], n = {
        title: "精彩评论",
        type: "hot",
        comments: s.default.formatComments(t.hot),
        isShowComment: t.isShowComment || !1,
        isMax: !1,
        isMore: !1
    };
    return o.setData({
        hotComments: n,
        isHotFolded: t.hot.length > e / 2 - 1
    }), n;
}

function o() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = arguments[2], n = e.comments ? e.comments : [], m = t.comments ? t.comments : [], a = n.concat(m), r = "complete", u = {
        title: "最新评论",
        type: "time",
        comments: s.default.formatComments(a),
        isShowComment: t.isShowComment || !1,
        isMax: t.totalCount > 50,
        isMore: t.remaining > 0
    };
    return 0 == a.length && (r = "noMore"), o.setData({
        newComments: u,
        totalComments: t.totalCount ? i.default.formatNum(t.totalCount) : "",
        subLoad: r
    }), u;
}

function n(t, e) {
    var o = {
        pageNum: 1,
        isFinal: !1
    };
    e.setData({
        commentCondition: Object.assign({}, o, t)
    });
}

function m() {
    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).filter(function(t) {
        return !!t.content;
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

t(require("../../common/polyfill/promise")), t(require("../../common/user/user"));

var i = t(require("../../common/utils/util")), a = (function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    e.default = t;
}(require("../../common/serviceApi/serviceApi")), t(require("./commentService"))), s = t(require("./util"));

exports.default = {
    loadHotComments: function(t, o) {
        var n = t.qipuId, r = t.hotSize;
        return a.default.getComments({
            qipuId: n,
            types: "hot",
            hotSize: r
        }).then(function(t) {
            return t.hot && t.hot.length > 0 ? (t.hot = m(t.hot), t.hot.length > r && (t.hot = t.hot.splice(0, r)), 
            t.hot.forEach(function(t, e) {
                t.formatLikes = i.default.formatNum(t.likes), t.addTime = s.default.formatDate(t.addTime), 
                s.default.handleCommentUserType(t);
            }), t.isShowComment = !0) : t.isShowComment = !1, e(t, r, o), t.hot;
        });
    },
    loadNewComments: function(t) {
        var e = t.qipuId, r = t.pageNum, u = void 0 === r ? 1 : r, l = t.pageSize, c = void 0 === l ? 10 : l, d = t.lastCommentId, f = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, h = arguments[2];
        return a.default.getComments({
            qipuId: e,
            types: "time",
            pageNum: u,
            pageSize: c,
            lastId: d
        }).then(function(t) {
            var e = !1;
            return (u >= 5 || u < 5 && 0 == t.remaining) && (e = !0), n({
                pageNum: u,
                isFinal: e
            }, h), t.comments && t.comments.length > 0 && (t.comments = m(t.comments), t.comments.forEach(function(t, e) {
                t.formatLikes = i.default.formatNum(t.likes), t.addTime = s.default.formatDate(t.addTime), 
                s.default.handleCommentUserType(t);
            })), t.isShowComment = !0, o(t, f, h), t.comments;
        }).catch(function(t) {
            h.setData({
                subLoad: "error"
            });
        });
    },
    setCommentCondition: n,
    toggleCommentStatus: function(t, e) {
        var o = t.contentId, n = t.comments, m = t.isAgree, a = t.likes, s = t.type, r = void 0 === s ? "time" : s;
        for (var u in n) n[u].id == o && (n[u] = Object.assign({}, n[u], {
            agree: !m,
            formatLikes: i.default.formatNum(a),
            likes: a
        }));
        if ("hot" == r) {
            var l = Object.assign({}, e.data.hotComments, {
                comments: n
            });
            e.setData({
                hotComments: l
            });
        } else {
            var c = Object.assign({}, e.data.newComments, {
                comments: n
            });
            e.setData({
                newComments: c
            });
        }
    }
};