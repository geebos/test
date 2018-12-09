function e(e) {
    return t({
        networkType: e,
        videoLoading: !0,
        showFlowPlay: !0
    });
}

function o() {
    return new Promise(function(e, o) {
        wx.getNetworkType({
            success: function(o) {
                var t = o.networkType;
                e(t);
            },
            fail: function(e) {
                o(e);
            }
        });
    });
}

function t(e) {
    arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    var o = e.networkType, t = e.videoLoading, i = e.showFlowPlay, r = n(o), d = a("flowPlayTime"), u = !r && "wifi" !== o && (!d || new Date().getTime() - d >= 72e5);
    return i ? {
        canPlay: !1,
        videoOffline: r,
        videoLoading: t,
        videoFlowPlay: u,
        videoErrorContent: !1,
        error: "",
        showFlowPlay: i,
        networkType: o
    } : {
        canPlay: !1,
        videoOffline: r,
        videoLoading: t,
        videoErrorContent: !1,
        error: "",
        showFlowPlay: i,
        networkType: o
    };
}

function i(e) {
    return {
        videoErrorContent: !1,
        videoFlowPlay: !1,
        canPlay: e,
        videoLimitPic: !1,
        videoLimitIcon: !1,
        showShortVideo: !1,
        videoLoading: !1,
        videoLiveLayer: !1,
        coverImage: !1
    };
}

function n(e) {
    return "none" === e || "fail" === e;
}

function a(e) {
    var o = d.default.storage.handleStorageMuti("get", "VIDEO_PLAYER_INFO") || {};
    return e ? o[e] : o;
}

function r(e, o) {
    var t = d.default.storage.handleStorageMuti("get", "VIDEO_PLAYER_INFO") || {};
    t[e] = o, d.default.storage.handleStorageMuti("set", "VIDEO_PLAYER_INFO", t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var d = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/utils/util"));

exports.default = {
    initVideoLayout: function() {
        return o().then(function(o) {
            return e(o);
        }).catch(function(o) {
            return e("wifi");
        });
    },
    showVideo: i,
    setVideoModel: t,
    showLimit: function(e) {
        return Object.assign({}, e, {
            videoErrorContent: !1,
            canPlay: !1,
            videoLimitPic: !0,
            videoLimitIcon: !0,
            videoLoading: !1
        });
    },
    flowPlay: function() {
        var e = this.data.videoLayout, o = e.videoErrorContent, t = e.videoLimitPic;
        if (o || t) {
            var i = Object.assign({}, this.data.videoLayout, {
                videoFlowPlay: !1
            });
            this.setData({
                videoLayout: i
            });
        } else this.play();
        r("flowPlayTime", new Date().getTime());
    },
    play: function() {
        var e = this, o = this.data.videoLayout;
        o = Object.assign({}, o, i(!0)), this.setData({
            videoLayout: o
        }), setTimeout(function() {
            e.player.play();
        }, 1e3);
    },
    onErrorTap: function() {
        this.data.videoLayout.error.buttonclick.bind(this)();
    },
    onLimitPlay: function() {
        var e = this, o = this.data.videoLayout;
        o = Object.assign({}, o, {
            videoErrorContent: !1,
            videoFlowPlay: !1,
            canPlay: !0,
            videoLimitPic: !1,
            videoLimitIcon: !0
        }), this.setData({
            videoLayout: o,
            "video.url": this.data.tmtsInfo.src
        }), setTimeout(function() {
            e.player.play();
        }, 1e3);
    }
};