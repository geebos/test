function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.commonGetRequest = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return new t.default(function(t, o) {
        var r = e.reqParams, d = "" + e.url;
        if (r) {
            var n = Object.keys(r).map(function(e) {
                return e + "=" + encodeURIComponent(r[e]);
            }).join("&");
            d = e.url + "?" + n;
        }
        wx.request({
            url: d,
            method: "GET",
            success: function(e) {
                200 == e.statusCode ? a.default.isObject(e.data) ? "A00000" == e.data.code ? t(a.default.replaceQiyipic(e.data.data)) : o(e.data) : o({
                    code: "FEC002",
                    msg: "data eror",
                    data: e.data
                }) : o({
                    code: "FEC001",
                    msg: "server eror",
                    data: e.statusCode
                });
            },
            fail: function(e) {
                o({
                    code: "FEC000",
                    msg: "network eror"
                });
            }
        });
    });
}, exports.commonPostRequest = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "form";
    return new t.default(function(t, r) {
        wx.request({
            url: "" + e.url,
            method: "POST",
            data: "form" == o ? e.reqParams : JSON.stringify(e.reqParams),
            header: {
                "content-type": "form" == o ? "application/x-www-form-urlencoded" : "application/json"
            },
            success: function(e) {
                200 == e.statusCode ? a.default.isObject(e.data) ? "A00000" == e.data.code ? t(a.default.replaceQiyipic(e.data.data)) : r(e.data) : r({
                    code: "FEC002",
                    msg: "data eror",
                    data: e.data
                }) : r({
                    code: "FEC001",
                    msg: "server eror",
                    data: e.statusCode
                });
            },
            fail: function(e) {
                r({
                    code: "FEC000",
                    msg: "network eror"
                });
            }
        });
    });
};

var t = e(require("../../common/polyfill/promise")), a = e(require("../../common/utils/util"));