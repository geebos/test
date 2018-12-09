function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Player = exports.videoPlayer = void 0;

var r = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/emitter/Emitter"));

exports.videoPlayer = {
    bindplay: function(e) {
        this.player.emit("play", e);
    },
    bindpause: function(e) {
        this.player.emit("pause", e);
    },
    bindended: function(e) {
        this.player.emit("ended", e);
    },
    bindtimeupdate: function(e) {
        this.player.emit("timeupdate", e);
    },
    refresh: function() {
        this.player.emit("refresh");
    },
    binderror: function(e) {
        this.player.emit("binderror", e);
    }
}, exports.Player = function(i) {
    function u(n) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "videoId";
        e(this, u);
        var o = t(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this));
        return o.context = wx.createVideoContext(r), o.videoPage = n, o;
    }
    return n(u, o.default), r(u, [ {
        key: "setUrl",
        value: function(e) {
            this.videoPage.setData({
                "video.url": e
            });
        }
    }, {
        key: "play",
        value: function() {
            this.context.play();
        }
    }, {
        key: "pause",
        value: function() {
            this.context.pause();
        }
    }, {
        key: "seek",
        value: function(e) {
            this.context.seek(e);
        }
    }, {
        key: "exitFullScreen",
        value: function() {
            this.context.exitFullScreen();
        }
    } ]), u;
}();