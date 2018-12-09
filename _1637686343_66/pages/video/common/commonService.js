Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getSubType = function(e) {
    var i = e.isFeatureFilm, n = e.videoType, r = e.channelId;
    e.cType, e.sourceId;
    return i ? 1 == n ? "album" : 2 == n ? "source" : 1 == r || 4 == r ? "movie" : "single" : "single";
}, exports.isSeriesOnly = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return void 0 !== e.isFeatureFilm && 0 != e.isFeatureFilm && "undefiend" != typeof e.channelId && 2 == e.channelId;
};