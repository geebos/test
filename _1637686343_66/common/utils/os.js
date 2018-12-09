Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = wx.getSystemInfoSync().system;

exports.default = {
    isAndroid: -1 !== e.indexOf("Android"),
    isIOS: -1 !== e.indexOf("iOS"),
    compareVersion: function(e, r) {
        e = e.split("."), r = r.split(".");
        for (var t = Math.max(e.length, r.length); e.length < t; ) e.push("0");
        for (;r.length < t; ) r.push("0");
        for (var n = 0; n < t; n++) {
            var s = parseInt(e[n]), i = parseInt(r[n]);
            if (s > i) return 1;
            if (s < i) return -1;
        }
        return 0;
    }
};