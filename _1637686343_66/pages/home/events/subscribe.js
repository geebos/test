function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.updateBtnStatus = function(t, s, u) {
    var i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], a = t.store.getState().tags;
    a = a.map(function(t, r) {
        if (4 != t.cardType) return t;
        var a = e.default.isArray(t.showList) ? t.showList : [];
        return t.showList = a.map(function(t, e) {
            return t.qipuId != s ? t : (t.isSubscribe = u, t.disabled = i, t);
        }), t;
    }), t.store.dispatch(r.default.updateTags(a));
};

var e = t(require("../../../common/utils/util")), r = t(require("../actions/index"));