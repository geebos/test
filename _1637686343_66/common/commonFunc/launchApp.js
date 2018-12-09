Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.launchAppErrorFunc = function(e) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "page";
    wx.navigateTo({
        url: "/subPackage/pages/clientGuide/clientGuide?rfr=" + e + "&linkFrom=" + i
    });
}, exports.isSupportLaunchApp = function() {
    return 1036 == getApp().globalData.showScene;
}, exports.openCustomizeLink = function(i) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    if ("webview" == i) {
        var t = encodeURIComponent(r);
        wx.navigateTo({
            url: "/subPackage/pages/webview/webview?webviewSrc=" + t
        });
    } else if ("mina" == i) {
        var n = "/" === r.slice(0, 1) ? r : "/" + r, o = [ "pages/home/home", "pages/shortVideo/shortVideo", "pages/my/my" ].filter(function(e) {
            return n.indexOf(e) > -1;
        });
        e.default.isArray(o) && o.length > 0 ? wx.switchTab({
            url: n
        }) : wx.navigateTo({
            url: n
        });
    }
};

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../utils/util"));