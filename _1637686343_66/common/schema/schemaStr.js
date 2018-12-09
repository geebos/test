Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}(require("../utils/util"));

exports.default = {
    getMiniVideoListParam: function() {
        return {
            biz_id: "100",
            biz_plugin: "qiyibase",
            biz_params: {
                biz_sub_id: "601",
                biz_params: "selectedTab=2",
                biz_dynamic_params: "",
                biz_extend_params: "",
                biz_statistics: ""
            }
        };
    },
    getMiniVideoSpaceParam: function(i) {
        return {
            biz_id: "7",
            biz_plugin: "com.iqiyi.paopao",
            biz_params: {
                biz_sub_id: "5",
                biz_params: "",
                biz_dynamic_params: "circle_id=" + i + "&circle_type=6",
                biz_extend_params: "",
                biz_statistics: ""
            }
        };
    },
    getWebviewParam: function(a) {
        var e = encodeURIComponent(a);
        return i.default.os.isAndroid ? "url=" + e : {
            biz_id: "100",
            biz_plugin: "qiyibase",
            biz_params: {
                biz_sub_id: "202",
                biz_params: "url=" + e,
                biz_dynamic_params: "",
                biz_extend_params: "",
                biz_statistics: ""
            }
        };
    },
    getPlayerParam: function(a, e) {
        return i.default.os.isAndroid ? "aid=" + a + "&tvid=" + e : {
            biz_id: "102",
            biz_params: {
                biz_sub_id: "101",
                biz_params: "aid=" + a + "&tvid=" + e + "&ctype=0&pc=0",
                biz_dynamic_params: "",
                biz_extend_params: "screenMode=1&openType=",
                biz_statistics: ""
            }
        };
    }
};