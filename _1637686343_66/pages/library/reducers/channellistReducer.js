function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function n() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1], t = e && e.videolist || [];
    return n.videolist.map(function(e, t) {
        return delete e.pageUrl, e.pageNum = n.pageNum, e.isBill && (e.isCoupon = e.isBill), 
        e;
    }), t = t.concat(n.videolist), Object.assign({}, e, {
        pageNum: n.pageNum,
        videolist: t,
        isFinal: n.isFinal,
        isEmpty: n.isEmpty
    });
}

function t() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, t = (arguments[2], 
    arguments[3]), r = d.default.channels, i = d.default.channelMap, o = d.default.modes, u = d.default.conditions;
    r.forEach(function(t) {
        if (Array.isArray(t.modes)) {
            t.modes.forEach(function(e, n) {
                o.forEach(function(a) {
                    a.id == e && (t.modes[n] = a);
                });
            });
            for (var a in i) if (a == t.cid) {
                t.channelId = i[a];
                break;
            }
            "ZONG_YI" == t.cid ? t.issource = !0 : t.issource = !1;
            var r = t.modes;
            t.modes = {
                modelist: r,
                modeTabIndex: e
            };
            for (var s in u) t.cid == s && (t.tags = u[s]);
            t.tags.forEach(function(e, t) {
                e.tabIndex = n;
            });
        }
    });
    var s = a(r, t.channelId);
    return {
        channelTabs: r,
        channelTabIndex: s,
        curChannel: r[s] || {}
    };
}

function a(e, n) {
    return e.findIndex(function(e) {
        return e.channelId == n;
    });
}

function r(e, n) {
    var t = (e.channelTabs || []).filter(function(e, t) {
        return t == n.channelTabIndex;
    });
    if (t.length > 0) {
        var a = t[0] || {};
        c.default.isObject(a) && c.default.isObject(a.modes) && (a.modes.modeTabIndex = 0), 
        c.default.isObject(a) && c.default.isArray(a.tags) && (a.tags = a.tags.map(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            arguments[1];
            return e.tabIndex = 0, e;
        }));
    }
    var r = {
        channelTabIndex: n.channelTabIndex,
        curChannel: a || {}
    };
    return Object.assign({}, e, r);
}

function i(e, n) {
    return e.curChannel && (e.curChannel.modes.modeTabIndex = n.modeIndex || 0), e;
}

function o(e, n) {
    return e.curChannel.tags.map(function(e, t) {
        e.tag == n.tag && (e.tabIndex = n.tabIndex);
    }), e;
}

function u(e, n) {
    return n.options || {};
}

function s(e, n) {
    var t = n.params || {};
    return Object.assign({}, e, t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.channelInfos = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1];
    switch (n.type) {
      case "SET":
        return Object.assign({}, e, t(0, 0, e, n));

      case "SWITCH_CHANNEL":
        return r(e, n);

      case "SWITCH_MODE":
        return i(e, n);

      case "SWITCH_TAG":
        return o(e, n);

      default:
        return e;
    }
}, exports.videos = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "LOAD_VIDEOS":
        return n(e, t);

      case "RESET_VIDEOS":
        return Object.assign({}, e, {
            pageNum: t.pageNum,
            videolist: t.videolist
        });

      default:
        return e;
    }
}, exports.searchConditions = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1];
    switch (n.type) {
      case "INIT_CONDITION":
        return u(0, n);

      case "CHANGECONDITION":
        return s(e, n);

      default:
        return e;
    }
};

var c = e(require("../../../common/utils/util")), d = e(require("../common/config"));