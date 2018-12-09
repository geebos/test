function e(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (r[a] = e[a]);
    return r.default = e, r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.versionSpecifyCompare = function(e) {
    var r = getApp().globalData, n = (t.isObject(r.systemInfo) ? r.systemInfo : {}).SDKVersion;
    if (!n || !t.isString(n)) return !1;
    switch (a.default.compareVersion(n, e)) {
      case 0:
      case 1:
        return !0;

      case -1:
      default:
        return !1;
    }
}, exports.logManager = function(e) {
    if (wx.getLogManager) {
        for (var a = r.format(new Date(), "yyyy-MM-dd hh:mm:ss"), t = wx.getLogManager(), n = arguments.length, o = Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++) o[s - 1] = arguments[s];
        switch (e) {
          case "info":
            t.info.apply(t, [ a ].concat(o));
            break;

          case "debug":
            t.debug.apply(t, [ a ].concat(o));
            break;

          case "warn":
            t.warn.apply(t, [ a ].concat(o));
            break;

          default:
            t.log.apply(t, [ a ].concat(o));
        }
    }
};

var r = e(require("time")), a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("os")), t = e(require("object"));