function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

function e(n, e) {
    if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function t(n) {
    return "free" !== f(n.payMark);
}

function r(n) {
    return 1 == n.payMark || 7 == n.payMark;
}

function i(n, e) {
    return 2 == n.payMark;
}

function u(n, e) {
    return 3 == n.payMark;
}

function o(n) {
    return "A02602" === n;
}

function a(n) {
    return "A02503" === n;
}

function c(n) {
    return "tennisFee" === f(n.payMark);
}

function f(n) {
    switch (n) {
      case 1:
        return "vipFee";

      case 2:
        return "purchase";

      case 3:
        return "ticket";

      case 4:
      case 5:
      case 6:
        return "tennisFee";

      case 7:
        return "funVip";

      default:
        return "free";
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var s = function() {
    function n(n, e) {
        for (var t = 0; t < e.length; t++) {
            var r = e[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(n, r.key, r);
        }
    }
    return function(e, t, r) {
        return t && n(e.prototype, t), r && n(e, r), e;
    };
}();

exports.validateFuc = function(n, e) {
    var t = new y();
    return t.add(n, e), t.start();
}, exports.validateFuncMuti = function(n) {
    for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], t = new y(), r = 0, i = e.length; r < i; r++) t.add(n, e[r]);
    var u = t.start();
    if (u) return u;
};

var l = n(require("../../../common/user/user")), d = function(n) {
    if (n && n.__esModule) return n;
    var e = {};
    if (null != n) for (var t in n) Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
    return e.default = n, e;
}(require("../../../common/source/videoUtil")), p = n(require("../../../common/utils/util")), v = {
    videoLimited: function(n, e) {
        var t = n.isLimited, r = (n.playInfo.prevueId, n.contentObj), i = !(!p.default.isObject(r) || !r.content);
        if (t && !i) return e;
    },
    anonymousLayer: function(n, e) {
        var r = n.playInfo, i = n.contentObj, u = p.default.isObject(i.msg) && i.msg.code ? i.msg.code : "", c = !u || (o(u) || a(u));
        if (t(r) && !l.default.isLogin() && c) return e;
    },
    vipCk: function(n, e) {
        var i = n.playInfo;
        if (t(i) && r(i) && l.default.isLogin() && !l.default.isVip()) return e;
    },
    purchaseCk: function(n, e) {
        var r = n.playInfo, u = n.contentObj;
        p.default.isObject(u.info) && u.info;
        if (t(r) && i(r)) return e;
    },
    purchaseCkCode: function(n, e) {
        var r = n.playInfo, u = n.contentObj, c = (p.default.isObject(u.info) && u.info, 
        p.default.isObject(u.msg) && u.msg.code ? u.msg.code : "");
        if (t(r) && i(r) && (o(c) || a(c))) return e;
    },
    ticketCk: function(n, e) {
        var r = n.playInfo, i = n.contentObj;
        p.default.isObject(i.info) && i.info;
        if (t(r) && u(r)) return e;
    },
    ticketCkCode: function(n, e) {
        var r = n.playInfo, i = n.contentObj, c = (p.default.isObject(i.info) && i.info, 
        p.default.isObject(i.msg) && i.msg.code ? i.msg.code : "");
        if (t(r) && u(r) && (o(c) || a(c))) return e;
    },
    miniLimitCkCode: function(n, e) {
        var t = n.playInfo, r = n.contentObj, i = p.default.isObject(r.msg) && r.msg.code ? r.msg.code : "";
        if (c(t) && (o(i) || a(i))) return e;
    },
    defaultTmtsErr: function(n, e) {
        return e;
    },
    isPayVideo: function(n, e) {
        return "free" !== f(n.playInfo.payMark);
    },
    isTennisVip: function(n, e) {
        return "tennisFee" === f(n.playInfo.payMark);
    },
    isPruchase: function(n) {
        return "purchase" === f(n.payMark);
    },
    isTicket: function(n) {
        return "ticket" === f(n.payMark);
    },
    isTicketVipVideo: function(n, e) {
        return d.is6minVideo(e) && 3 == n.payMark && "single" !== n.subType;
    },
    isEmpty: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments[1];
        if (!n) return e;
    },
    isPhoneNum: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments[1];
        if (!/^\d{11}$/.test(n.trim())) return e;
    }
}, y = function() {
    function n() {
        e(this, n), this.init();
    }
    return s(n, [ {
        key: "init",
        value: function() {
            this.cache = [];
        }
    }, {
        key: "add",
        value: function(n, e) {
            for (var t, r = this, i = 0; t = e[i++]; ) !function(e) {
                var t = e.strategy.split(":"), i = e.errorMsg;
                r.cache.push(function() {
                    var e = t.shift();
                    return t.unshift(n), t.push(i), v[e].apply(null, t);
                });
            }(t);
        }
    }, {
        key: "start",
        value: function() {
            for (var n, e = 0; n = this.cache[e++]; ) {
                var t = n();
                if (t) return t;
            }
        }
    } ]), n;
}();