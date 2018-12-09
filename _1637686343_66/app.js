function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("common/login/index"));

var t = e(require("common/pingback/launch")), a = e(require("common/emitter/Emitter")), n = e(require("common/utils/util")), s = e(require("common/user/user"));

App({
    onLaunch: function(e) {
        var l = this, o = {};
        this.emitter = new a.default(), this.globalData.showScene = n.default.isObject(e) && e.scene ? e.scene : 0, 
        this.globalData.mutiPhone = "", this.globalData.vfm = n.default.isObject(e) && n.default.isObject(e.query) ? e.query.vfm : "", 
        this.globalData.shareCurrentQipuId = n.default.isObject(e) && n.default.isObject(e.query) ? e.query.qipuId : "", 
        this.globalData.vrsMapFlag = !1, this.globalData.vrsMapObj = {}, this.globalData.vrsMapQipuId = 0;
        var i = s.default.getAnonymousUid(), u = n.default.md5(i + new Date().getTime());
        this.globalData.de = u, n.default.isObject(e) && n.default.isObject(e.query) && void 0 !== e.query.vfm && Object.assign(o, {
            vfm: e.query.vfm
        });
        try {
            var r = wx.getSystemInfoSync();
            this.globalData.systemInfo = r, Object.assign(o, {
                ua_model: r.model,
                scene: this.globalData.showScene
            });
        } catch (e) {}
        wx.getNetworkType({
            success: function(e) {
                t.default.send(Object.assign(o, {
                    net_work: e ? e.networkType : ""
                }), l), l.globalData.networkType = e ? e.networkType : "";
            },
            fail: function(e) {
                t.default.send(o, l);
            }
        }), wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(e) {
            l.globalData.networkType = e.networkType;
        });
    },
    onShow: function(e) {
        this.globalData.showScene = n.default.isObject(e) && e.scene ? e.scene : 0, this.globalData.agentversion = "2.9.0", 
        this.globalData.vfm = n.default.isObject(e) && n.default.isObject(e.query) ? e.query.vfm : "", 
        this.globalData.path = n.default.isObject(e) ? e.path : "", getCurrentPages().length <= 1 && (this.globalData.shareCurrentQipuId = n.default.isObject(e) && n.default.isObject(e.query) ? e.query.qipuId : "");
    },
    onError: function(e) {},
    onHide: function() {
        this.globalData.vfm = "", this.globalData.path = "";
    },
    globalData: {
        userInfo: {},
        channel: {
            channelId: "2"
        },
        systemInfo: {}
    }
});