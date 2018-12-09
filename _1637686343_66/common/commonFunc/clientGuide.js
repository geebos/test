function e() {
    var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).pageUrl;
    e && t.default.storage.handleStorageMuti("set", "VIDEO_PAGE_URL", e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../utils/util"));

exports.default = {
    getPageUrl: e,
    getPageUrlWhenShow: function(r) {
        if (!r) return !1;
        t.default.storage.handleStorageMuti("get", "VIDEO_PAGE_URL") != r.pageUrl && e(r);
    }
};