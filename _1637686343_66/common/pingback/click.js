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
    send: function(e) {
        var r = {
            rpage: e.rpage,
            p1: t.default.os.isIOS ? "2_24_241" : "2_24_242",
            u: u.default.getAnonymousUid(),
            pu: u.default.getUid(),
            nu: u.default.checkNewUser() ? 1 : 0,
            rn: new Date().getTime(),
            t: e.type || 20,
            block: e.block || "",
            rseat: e.rseat || "",
            position: e.position || "",
            mcnt: e.mcnt || "",
            br: 0,
            aid: e.aid || "",
            qipuId: e.qipuId || "",
            c1: e.c1 || "",
            de: getApp().globalData.de || null,
            bstp: 0
        };
        21 == r.t && delete r.rseat, wx.request({
            url: "https://msg.qy.net/v5/alt/act",
            method: "GET",
            data: r
        });
    }
};