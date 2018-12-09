function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./loginActions")), i = e(require("../../common/login/session")), o = e(require("../../common/user/user")), a = e(require("../../common/login/index")), n = (e(require("../../common/utils/util")), 
require("../../common/form/subscribeSession"), e(require("../../common/pingback/click"))), s = e(require("../../common/pingback/block")), r = (e(require("../../common/form/form")), 
e(require("../subscribe/playSubService")), e(require("../subscribe/subscribeService"))), u = e(require("./loginReducers"));

exports.default = {
    loadLoginState: function() {
        var e = i.default.Session.get(i.default.SESSION_AUTH_KEY), o = i.default.Session.get(i.default.SESSION_INFO_KEY);
        e ? (o && o.userinfo && o.userinfo.uid && this.store.dispatch(t.default.change_loginInfo(o, {}, !0)), 
        this.getUserInfo({})) : this.store.dispatch(t.default.initLogin());
    },
    login: function(e) {
        var t = this.data.curpage || "", i = this;
        wx.showActionSheet({
            itemList: [ "爱奇艺账号登录", "微信登录" ],
            itemColor: "#0bbe06",
            success: function(e) {
                var o = e.tapIndex + 1;
                1 == o ? (n.default.send({
                    rpage: t,
                    rseat: "wx_login_iqiyi"
                }), wx.navigateTo({
                    url: "/subPackage/pages/setPhone/qiyiLogin?rfr=" + t + "&pagefrom=" + t + "&delta=4&loginType=qiyi"
                })) : 2 == o && (n.default.send({
                    rpage: t,
                    rseat: "wx_login_wechat"
                }), a.default.authorize(function() {
                    i.loginCb(t);
                }));
            },
            fail: function(e) {}
        });
    },
    loginCb: function(e, t) {
        var n = this;
        if (!this.login.requesting) {
            this.login.requesting = !0, wx.showLoading && wx.showLoading({
                title: "加载中",
                mask: !0
            });
            var u = {};
            "wx_player" == e ? (u.rseat = "wx_player_login", this.clickPingback({
                block: "",
                rseat: "" + u.rseat
            })) : "wx_pcenter" == e && (u.rseat = "wx_pcenter_login", this.clickPingback({
                block: "",
                rseat: "" + u.rseat
            })), a.default.login(function(e) {
                n.login.requesting = !1, n.getUserInfo(JSON.parse(e.rawData));
            }, function(a, u) {
                if ("A00000" == a.code) {
                    var c = a.data.authcookie;
                    if (a.data && c) {
                        wx.hideLoading && wx.hideLoading();
                        var l = o.default.getAnonymousUid();
                        (n.isMultiAccount || t)({
                            authcookie: c,
                            device_id: l
                        }).then(function(e) {
                            n.setData({
                                mutiDialogFlag: !0,
                                mutiAccountList: e.list
                            });
                            var t = n.data.curpage;
                            getApp().emitter.emit("showMutiAfterWechat" + t), n.app.globalData.mutiAuthcookie = c, 
                            n.app.globalData.mutiPhone = e.phone, s.default.send({
                                rpage: n.data.curpage,
                                block: "wx_block_login_suggest"
                            });
                        }).catch(function(e) {
                            i.default.Session.set(i.default.SESSION_AUTH_KEY, c), n.getUserInfo(JSON.parse(u.rawData)), 
                            n.loginSuccessCb && n.loginSuccessCb(), getApp().emitter.emit("afterLoginSuccess"), 
                            r.default.uploadAfterLogin(c);
                        });
                    }
                } else if ("P00807" == a.code && a.data) {
                    wx.hideLoading && wx.hideLoading(), i.default.Session.set(i.default.SESSION_AUTH_KEY, n.app.globalData.mutiAuthcookie);
                    var g = encodeURIComponent(a.data.token) || "";
                    wx.navigateTo({
                        url: "/subPackage/pages/setPhone/set?tokens=" + g + "&pagefrom=" + e + "&delta=3&phoneType=verifyAccount"
                    });
                } else a.msg ? wx.showToast({
                    title: "" + a.msg,
                    icon: "none"
                }) : wx.showToast({
                    title: "服务异常",
                    icon: "none"
                });
                setTimeout(function() {
                    n.login.requesting = !1;
                }, 50);
            }, function(e) {
                n.login.requesting = !1, wx.showToast({
                    title: "服务异常",
                    icon: "fail"
                });
            });
        }
    },
    getUserInfo: function(e) {
        var o = this, n = {
            authcookie: i.default.Session.get(i.default.SESSION_AUTH_KEY)
        };
        a.default.getUserInfo(n).then(function(a) {
            if ("A00000" == a.data.code) {
                if (wx.hideLoading && wx.hideLoading(), void 0 !== o.store && o.store) o.store.dispatch(t.default.change_loginInfo(a.data.data, e, !0)); else {
                    var n = {
                        type: "CHANGE_LOGIN_INFO",
                        options: {
                            data: a.data.data,
                            wxdata: e,
                            isLogin: !0
                        }
                    }, s = {}, r = (0, u.default)(s, n);
                    o.setData && o.setData({
                        loginInfo: r
                    });
                }
                i.default.Session.set(i.default.SESSION_INFO_KEY, a.data.data), o.loginSuccess && o.loginSuccess();
            } else a.data && a.data.msg ? wx.showToast({
                title: "" + a.data.msg,
                icon: "none"
            }) : wx.showToast({
                title: "服务异常",
                icon: "none"
            }), i.default.Session.clear();
        }).catch(function(e) {
            console.log(e), wx.showToast({
                title: "服务异常",
                icon: "none"
            });
        });
    },
    closeLoginMask: function() {
        this.setData({
            loginCover: !1
        });
    },
    gologin: function(e) {
        var t = this, i = this.data.curpage || "", o = e.currentTarget.dataset.type;
        "username" == o ? wx.navigateTo({
            url: "/subPackage/pages/setPhone/qiyiLogin?rfr=" + i + "&pagefrom=" + i + "&delta=4"
        }) : "weixin" == o && a.default.authorize(function() {
            t.loginCb(i);
        }), this.closeLoginMask();
    }
};