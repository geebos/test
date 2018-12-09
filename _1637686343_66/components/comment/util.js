function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../common/utils/util")), r = e(require("../../common/user/user"));

exports.default = {
    getSign: function(e) {
        for (var r = Object.getOwnPropertyNames(e).sort(), n = "", i = 0; i < r.length; i++) n = i == r.length - 1 ? n + r[i] + "=" + e[r[i]] : n + r[i] + "=" + e[r[i]] + "&";
        var o = void 0;
        return o = n + "2my3Thr4u55ulYr8", t.default.md5(o);
    },
    formatDate: function(e) {
        var t = new Date(1e3 * e), r = new Date(), n = Date.now() - new Date(1e3 * e).getTime(), i = "";
        return n <= 6e4 ? i = "刚刚" : n > 6e4 && n < 36e5 ? i = Math.round(n / 6e4) + "分钟前" : n >= 36e5 && n < 864e5 ? i = Math.round(n / 36e5) + "小时前" : (t.getDay() + 1) % 7 === r.getDay() && n < 1728e5 ? i = "昨天" + t.getHours() + ":" + t.getMinutes() : n >= 864e5 && (i = new Date(1e3 * e).getMonth() + 1 + "月" + new Date(1e3 * e).getDate() + "日"), 
        i;
    },
    handleCommentUserType: function(e) {
        return e.isKol = !1, e.isStar = !1, e.isIqiyiUser = !1, e.commonUser && e.commonUser.identity && 1 == e.commonUser.identity ? e.isKol = !0 : e.userIdentity && e.userIdentity.identity && (16 == e.userIdentity.identity ? e.isStar = !0 : 26 == e.userIdentity.identity && (e.isIqiyiUser = !0)), 
        e;
    },
    formatComments: function(e) {
        var n = t.default.storage.handleStorageMuti("get", "commentKeys") || [];
        return e && e.length > 0 && e.forEach(function(e) {
            !r.default.getUid() && n.indexOf(e.id) > -1 && (e.agree = !0, e.likes = e.likes + 1), 
            e.formatLikes = t.default.formatNum(e.likes);
        }), e || [];
    }
};