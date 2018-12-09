function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../utils/util")), u = e(require("../user/user"));

exports.default = {
    send: function(e, s) {
        s = s || getApp();
        var d = wx.getSystemInfoSync(), r = Object.assign({
            p1: t.default.os.isIOS ? "2_24_241" : "2_24_242",
            pu: u.default.getUid(),
            hu: 0 == u.default.getVipType() ? -1 : 1,
            net_work: "",
            ua_model: "",
            device_id: u.default.getAnonymousUid(),
            isnew: u.default.checkNewUser() ? 1 : 0,
            br: 0,
            os_v: d.system || "",
            de: s.globalData.de || null
        }, e || {});
        wx.request({
            url: "https://msg.qy.net/v5/h5ply/miopen",
            method: "GET",
            data: r
        });
    }
};