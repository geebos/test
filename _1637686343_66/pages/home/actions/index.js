function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r(e, t, r, n) {
    return {
        type: "SET",
        info: e,
        index: t,
        records: r,
        isLogin: n,
        focusIndex: arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1
    };
}

function n(e) {
    return {
        type: "UPDATE_TAGS",
        tags: e
    };
}

function i(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    e.liveCardInd = [];
    var r = e.data.tags, i = r.filter(function(t, r) {
        return 4 == t.cardType && (u.default.isArray(t.showList) ? t.showList : []).length > 0 && e.liveCardInd.push(r), 
        4 == t.cardType;
    });
    if (i.length <= 0) return r;
    var o = u.default.isArray(i[0].showList) ? i[0].showList : [];
    return o.length <= 0 ? r : (o.length > 2 && t && e.setData({
        liveCardFolded: !0
    }), s.liveSubscribeStatus(o).then(function() {
        var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).data;
        r.forEach(function(e, r) {
            return 4 != e.cardType || (!u.default.isArray(e.showList) || (e.showList.forEach(function(e, r) {
                e.isSubscribe = !!u.default.isObject(t[r]) && t[r].isSubscribe, e.disabled = !1;
            }), e));
        }), e.store.dispatch(n(r)), !0 === e.app.globalData.checkLiveSubscibe && (e.app.globalData.checkLiveSubscibe = !1);
    }));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = t(require("../../../components/load/loadActions")), a = t(require("../../../components/searchLayout/searchLayoutAction")), u = t(require("../../../common/utils/util")), c = e(require("../../../common/serviceApi/serviceApi")), s = e(require("../../../common/form/subscribeService")), d = {
    HOME: "/h5/mina/home/"
};

exports.default = Object.assign({
    setData: r,
    switchFocus: function(e, t, r, n, i) {
        return {
            type: "SWITCH_FOCUS",
            bgImageUrl: t,
            qipuId: e,
            focusIndex: i,
            customType: r,
            customLink: n
        };
    },
    getIndexData: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = arguments[2];
        return function(a) {
            return c.commonGetRequest({
                url: "" + u.default.OUTERHOST.PUB + d.HOME
            }).then(function() {
                var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return n.tags = n.tags || [], a(r(n, 0, e, t)), a(o.default.completeLoad()), n;
            }).then(function(e) {
                i(n, !0);
            }).catch(function(e) {
                console.error(e), a(o.default.errorLoad());
            });
        };
    },
    removePlayRecord: function(e) {
        return {
            type: "REMOVE_PLAY_RECORD",
            rightTime: e
        };
    },
    updateTags: n,
    checkLiveCard: i
}, o.default, a.default);