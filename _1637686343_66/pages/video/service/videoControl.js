function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../common/utils/util")), o = e(require("../../../common/user/user")), n = e(require("../../../common/login/constant"));

require("../../../common/form/form");

exports.default = {
    showShare: function() {
        var e = this;
        wx.canIUse && wx.canIUse("button.open-type.share");
        clearTimeout(this.showShare.time), this.setData({
            "videoControl.showShare": !0
        }), this.showShare.time = setTimeout(function() {
            e.setData({
                "videoControl.showShare": !1
            });
        }, 1e3);
    },
    collectAlbum: function(e, u, a, i, r) {
        var s = o.default.isLogin() ? o.default.getAuthcookie() : "", c = o.default.isLogin() ? "" : o.default.getAnonymousUid(), l = o.default.isLogin() ? t.default.md5(s) : c, d = {
            authcookie: s,
            ckuid: c,
            subType: e,
            subKey: u,
            agent_type: n.default.agenttype,
            channelId: a,
            antiCsrf: r ? l : ""
        };
        return new Promise(function(e, t) {
            wx.request({
                url: i,
                data: d,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(o) {
                    var n = o.data;
                    n && "A00000" == n.code ? e(n) : t(n);
                },
                fail: function(e) {
                    t(e);
                }
            });
        });
    }
};