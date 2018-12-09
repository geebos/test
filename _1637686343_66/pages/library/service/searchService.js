function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getVideoList = function(e) {
    return new t.default(function(t, i) {
        wx.request({
            url: "https://search.video.iqiyi.com/o",
            data: e || {},
            method: "GET",
            success: function(e) {
                var a = e.data;
                if ("A00000" == a.code) {
                    var u = r.default.getFormatData(o.default.replaceQiyipic(a.data));
                    t(u);
                } else i(e);
            },
            fail: i
        });
    });
};

var t = e(require("../../../common/polyfill/promise")), r = (e(require("../common/config")), 
e(require("../../../common/search/searchInterface"))), o = e(require("../../../common/utils/util"));