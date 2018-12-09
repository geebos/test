function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    return {
        send: function(e) {
            var n = {
                t: 5,
                pf: 2,
                p: 20,
                p1: t.default.os.isIOS ? "2_24_241" : "2_24_242",
                p2: "",
                s1: 1,
                s2: "",
                rt: 18,
                u: r.default.getAnonymousUid() || "",
                pu: r.default.getUid() || "",
                rn: new Date().getTime(),
                ref: ""
            };
            for (var o in e) n[o] = e[o];
            var i = [];
            for (var s in n) 0 === n[s] && (n[s] = "0"), i.push(s + "=" + encodeURIComponent(n[s] || ""));
            wx.request({
                url: "https://msg.qy.net/v5/alt/act?" + i.join("&"),
                method: "GET"
            });
        },
        fireAfterSearch: function(e, t) {
            n = e.results.eventId, o = e.bkt, e.docs;
            var r = [], s = void 0;
            e.docinfos && e.docinfos.forEach(function(e) {
                var t = e.docId + "," + e.siteId + "," + e.channelId;
                r.push(t);
            }), s = r.join(";"), i[e.page] = e.results.list, this.send({
                t: 9,
                page: e.page,
                tag: e.tag,
                mode: e.mod,
                e: n,
                c1: t.channelId || -1,
                time: e.time,
                docIDs: s,
                bkt: o,
                docs: e.docs,
                search_time: e.search_time,
                from: "weixin_mini_program"
            });
        },
        clickPingback: function(e) {
            var t = this, r = i[e.page];
            if (r.length) for (var s = r.length; s--; ) {
                var a = r[s];
                a && e.albumId == a.albumId && (e.pos = s);
            }
            t.send({
                e: n,
                c1: e.channelId,
                ptype: 1,
                site: e.siteId,
                bkt: o,
                pos: e.pos + 1,
                target: e.docId,
                a: 0,
                page: e.page,
                from: "weixin_mini_program"
            });
        }
    };
};

e(require("../../pages/library/common/config"));

var t = e(require("../utils/util")), r = e(require("../../common/user/user")), n = null, o = null, i = {};