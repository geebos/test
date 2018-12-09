function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function i(e) {
    var i = e.sourceName || e.shortTitle, t = e.subType || "";
    if ("source" == t) if (e.isFeatureFilm) {
        var a = e.period + "";
        a && a.length >= 8 && (a = a.substring(4, 6) + "-" + a.substring(6) + "期"), i += a;
    } else i = e.shortTitle || e.videoName; else "single" == t && (i = e.shortTitle || e.videoName);
    return i;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../common/user/user")), a = e(require("../../../components/history/playRecordService")), o = e(require("../../../components/history/recordService")), r = function(e) {
    if (e && e.__esModule) return e;
    var i = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (i[t] = e[t]);
    return i.default = e, i;
}(require("../../../common/source/videoUtil"));

exports.default = {
    seek: function(e) {
        var i = this.data.playInfo, t = void 0 === i ? {} : i, a = (t.channelId, t.isFeatureFilm, 
        t.type, this.globalPage.currentTime);
        if (a > 0) {
            var o = this.data.tmtsInfo || {};
            r.is6minVideo(o) && (this.globalPage.currentTime = 0), this.player.seek(a);
        }
    },
    getLocalRecord: function(e) {
        var i = e.aid || "", o = t.default.getAuthcookie(), r = a.default.getRemoveRecordByAid(i, o, "aid") || null;
        return r && r.aid != r.qipuId && "notfilm" != r.type && e.useRecord ? (r.playTime >= r.duration && (r.playTime = 0), 
        o || (this.globalPage.currentTime = r.playTime), {
            qipuId: r.qipuId,
            vid: r.vid,
            rfr: e.rfr || "",
            aid: r.aid || "",
            id: r.id
        }) : (this.globalPage.currentTime = 0, e);
    },
    getRecord: function(e) {
        var i = this;
        if (!t.default.getAuthcookie()) return null;
        var a = this.data.playInfo, r = (a.channelId, a.isFeatureFilm, a.type, this.data.isLimited), n = {
            ckuid: t.default.getAnonymousUid(),
            auth: t.default.getAuthcookie(),
            tvId: a.qipuId
        };
        return new Promise(function(e, t) {
            o.default.getRecord(n).then(function(a) {
                if ("A00000" == a.code) {
                    var o = a.data.videoPlayTime || 0;
                    !r && o && i.player.seek(o), e(o);
                } else t();
            }).catch(function(e) {
                t();
            });
        });
    },
    savePlayRecord: function(e) {
        var i = this.data, t = i.playInfo || {}, a = i.tmtsInfo || {};
        this.savePlayRecordTimeout(t, e, a);
    },
    savePlayRecordTimeout: function(e, i, o) {
        var r = this;
        this.notCanPlayRecord || (this.notCanPlayRecord = !0, this.saveRecordTimer = setTimeout(function() {
            r.notCanPlayRecord = !1;
            var i = {};
            if (!r.savePlayRecordTimeout.remove) {
                r.savePlayRecordTimeout.remove = !0;
                var t = e.qipuId;
                (i = a.default.remove(t, "qipuId")) || (i = {
                    playTime: r.globalPage.currentTime
                });
            }
            r.saveRecord(e, i, o);
        }, 5e3)), !this.notCanPlayRecord_online && t.default.isLogin() && (this.notCanPlayRecord_online = !0, 
        this.saveRecordTimer_online = setTimeout(function() {
            r.notCanPlayRecord_online = !1, r.uploadRecord(r.globalPage.currentTime, null);
        }, 12e4));
    },
    uploadRecord: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1, i = arguments[1];
        if (t.default.getAuthcookie()) {
            var a = this.app.globalData.systemInfo, r = this.data.playInfo, n = [], d = Date.now() / 1e3, u = {
                terminalId: "32",
                tvId: r.qipuId || r.aid,
                addtime: d.toFixed ? d.toFixed(0) : d,
                videoPlayTime: e.toFixed ? e.toFixed(0) : e
            };
            n.push(u), n = JSON.stringify(n);
            var l = {
                version: a.version,
                os: "string" == typeof a.system ? a.system.split(" ")[1] : "",
                ua: a.model,
                ckuid: t.default.getAnonymousUid(),
                auth: t.default.getAuthcookie(),
                upload_records: n
            };
            o.default.uploadRecord(l).then(function(e) {
                "A00000" == e.code && i && i();
            }).catch(function(e) {});
        }
    },
    saveRecord: function(e, o, n, d) {
        var u = i(e), l = (r.is6minVideo(n) ? 360 : 0) || e.duration || n.duration, s = (o.playTime == o.duration ? this.globalPage.currentTime : o.playTime) || this.globalPage.currentTime;
        s = s.toFixed ? s.toFixed(0) : s, a.default.save({
            id: e.qipuId,
            qipuId: e.qipuId,
            aid: e.albumId || e.sourceId || e.aid || e.qipuId,
            vid: e.vid,
            albumName: "single" != e.subType ? e.albumName : e.videoName || e.vn,
            sourceName: "single" != e.subType ? e.sourceName : e.videoName || e.vn,
            playTime: d ? l : s,
            duration: l,
            content: u,
            payMark: e.payMark,
            isExclusive: e.exclusive,
            isVip: e.isVip,
            imgUrl: e.imageUrl || e.albumImageUrl || "",
            date: Date.now(),
            type: "single" != e.subType ? "film" : "notfilm"
        }, t.default.isLogin());
    }
};