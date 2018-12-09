function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e, o) {
    e.playCount = e.playCount ? e.playCount.toString() : "";
    var a = (e.videoinfos || [])[0] || {}, n = e.video_lib_meta || {};
    e.channel && -1 != e.channel.indexOf(",") ? (e.category = e.channel && e.channel.split(",")[0], 
    e.categoryId = e.channel && e.channel.split(",")[1]) : (e.category = "", e.categoryId = ""), 
    e.categoryId || (e.category = null);
    var r = e.siteId && e.siteId.replace(/pps/, "iqiyi"), c = {
        albumId: e.albumId || "",
        categoryName: e.category || "",
        channelId: e.categoryId || "",
        title: i.default.highLight(e.title, o.keyword),
        tvid: a.tvId,
        vid: a.vid,
        isVip: 1 == e.paymark,
        isBill: 2 == e.paymark,
        isPaid: "iqiyi" == r && 3 == e.paymark || "iqiyi" !== r && 2 == e.isPurchase,
        is_exclusive: e.is_exclusive,
        sd: a.is1080p,
        is_qiyi_produced: e.is_qiyi_produced,
        playCount: i.default.formatPlayCount(e.playCount),
        siteId: r,
        siteName: e.siteName,
        isSiteOut: "iqiyi" !== r,
        docId: e.doc_id,
        sourceType: e.source_type || 1,
        playSource: r,
        type: !(!n || !n.category) || null,
        typeList: n && n.category ? n.category : null,
        isPaike: !!e.special_content_type,
        region: "iqiyi" == r ? e.region : n.region ? n.region[0] : "",
        language: e.language || (n.language ? n.language[0] : ""),
        directorList: e.directorList,
        directorShow: e.directorShow,
        actorShow: e.actorShow,
        actorList: e.actorList,
        playTime: t.default.time.formatSecondOmit(a.timeLength),
        eventId: e.eventId,
        channel: e.channelId,
        contentType: e.contentType,
        pos: e.pos,
        videoDocType: e.videoDocType,
        entity_id: n.entity_id || "",
        qipu_id: e.qipu_id || ""
    };
    return c.typeList && c.typeList.length ? (c.typeList = c.typeList.splice(0, 6), 
    c.typeListShow = c.typeList.join(" ")) : c.typeListShow = "", c;
};

var i = e(require("bindUtil")), t = e(require("../../../common/utils/util"));