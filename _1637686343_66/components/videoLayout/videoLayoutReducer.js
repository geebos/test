function e(e, o) {
    return Object.assign({}, e, {
        videoErrorContent: !1,
        videoFlowPlay: !1,
        canPlay: o.showVideo,
        videoLimitPic: !1,
        videoLimitIcon: !1,
        showShortVideo: !1,
        videoLoading: !1,
        videoLiveLayer: !1,
        coverImage: !1
    });
}

function o(e) {
    return Object.assign({}, e, {
        videoErrorContent: !1,
        videoFlowPlay: !1,
        canPlay: !0,
        videoLimitPic: !1,
        videoLimitIcon: !0
    });
}

function n(e, o) {
    var n = getApp().globalData.networkType, r = g(n), t = !r && "wifi" !== n, i = !r && !t;
    return Object.assign({}, e, {
        videoErrorContent: !1,
        videoFlowPlay: t,
        canPlay: i,
        coverImage: o.coverImage
    });
}

function r(e, o) {
    return Object.assign({}, e, {
        videoErrorContent: !1,
        videoFlowPlay: !1,
        canPlay: !0,
        coverImage: o.coverImage
    });
}

function t(e) {
    return Object.assign({}, e, {
        showShortVideo: !0,
        videoErrorContent: !1
    });
}

function i(e) {
    return Object.assign({}, e, {
        showShortVideo: falses
    });
}

function a(e) {
    return Object.assign({}, e, {
        videoLiveLayer: !0,
        canPlay: !0
    });
}

function c(e) {
    return Object.assign({}, e, {
        videoErrorContent: !1,
        videoFlowPlay: !1,
        canPlay: !1,
        videoLimitPic: !0,
        videoLimitIcon: !0
    });
}

function u(e) {
    return Object.assign({}, e, {
        videoFlowPlay: !1
    });
}

function s(e) {
    return Object.assign({}, e, {
        videoLoading: !0,
        showShortVideo: !1
    });
}

function d(e, o) {
    return Object.assign({}, e, {
        imageUrl: o.imageUrl,
        duration: o.duration
    });
}

function l(e, o) {
    return Object.assign({}, e, {
        videoErrorContent: !0,
        error: o.content,
        videoLoading: !1,
        canPlay: !1,
        specialShow: o.flag
    });
}

function v(e, o) {
    var n = o.networkType, r = o.videoLoading, t = o.showFlowPlay, i = g(n), a = _("flowPlayTime"), c = !i && "wifi" !== n && (!a || new Date().getTime() - a >= 72e5), u = !1;
    u = r ? t ? !i && !c : !i : t ? !i && !c && !r : !i && !r;
    var s = t ? {
        canPlay: u,
        videoOffline: i,
        videoLoading: r,
        videoFlowPlay: c,
        videoErrorContent: !1,
        error: ""
    } : {
        canPlay: !1,
        videoOffline: i,
        videoLoading: r,
        videoErrorContent: !1,
        error: ""
    };
    return Object.assign({}, e, s);
}

function O(e, o) {
    var n = o.networkType, r = o.dialogFlag, t = o.videoLoading, i = g(n), a = _("flowPlayTime"), c = !i && "wifi" !== n && (!a || new Date().getTime() - a >= 72e5), u = u = !i && !c && r;
    return Object.assign({}, e, {
        canPlay: u,
        videoOffline: i,
        videoLoading: t,
        videoFlowPlay: c,
        videoErrorContent: !1,
        error: ""
    });
}

function g(e) {
    return "none" === e || "fail" === e;
}

function _(e) {
    var o = E.default.storage.handleStorageMuti("get", "VIDEO_PLAYER_INFO") || {};
    return e ? o[e] : o;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var g = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ = arguments[1];
    switch (_.type) {
      case "SHOW_VIDEO":
      case "HIDE_VIDEO":
        return e(g, _);

      case "SHOW_LIMIT_VIDEO":
        return o(g);

      case "SHOW_LIMIT":
        return c(g);

      case "SHOW_LOADING":
        return s(g);

      case "SHOW_BACK_IMAGE":
        return d(g, _);

      case "SHOW_ERROR":
        return l(g, _);

      case "SET_VIDEO_MODEL":
        return v(g, _);

      case "SET_SUB_VIDEO_MODEL":
        return O(g, _);

      case "EDIT_VIDEO_LAYOUT":
        return Object.assign({}, g, _.videoLayout);

      case "SET_VIDEO_LAYOUT":
        return _.videoLayout;

      case "HIDE_FLOW_PLAY":
        return u(g);

      case "SHOW_SHORT_VIDEO_PIC":
        return t(g);

      case "HIDE_SHORT_VIDEO_PIC":
        return i(g);

      case "SHOW_LIVE_LAYER":
        return a(g);

      case "SHOW_BEFORE_PLAY_PIC":
        return n(g, _);

      case "HIDE_BEFORE_PLAY_PIC":
        return r(g, _);

      default:
        return g;
    }
};

var E = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/utils/util"));