function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e) {
    return new t.default(function(t, i) {
        wx.request({
            url: "https://search.video.iqiyi.com/o",
            data: e || {},
            method: "GET",
            success: function(e) {
                t(u.default.replaceQiyipic(e.data));
            },
            fail: i
        });
    });
};

var t = e(require("../../common/polyfill/promise")), u = e(require("../../common/utils/util"));