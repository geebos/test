Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    channels: [ {
        cid: "DIAN_SHI_JU",
        cname: "电视剧",
        modes: [ 11, 8, 4 ]
    }, {
        cid: "DIAN_YING",
        cname: "电影",
        modes: [ 11, 8, 4 ]
    }, {
        cid: "ZONG_YI",
        cname: "综艺",
        modes: [ 11, 4 ]
    }, {
        cid: "DONG_MAN",
        cname: "动漫",
        modes: [ 11, 8, 4 ]
    } ],
    modes: [ {
        id: 4,
        name: "新上线"
    }, {
        id: 8,
        name: "好评榜"
    }, {
        id: 11,
        name: "热播榜"
    } ],
    conditions: {
        DIAN_SHI_JU: [ {
            tag: "areas",
            items: [ "全部地区", "内地", "韩国", "美剧", "日本", "台湾", "香港", "泰国" ]
        }, {
            tag: "type",
            items: [ "全部类型", "自制剧", "古装剧", "言情剧", "武侠剧", "偶像剧", "家庭剧", "青春剧", "都市", "喜剧", "战争", "军旅剧", "谍战剧", "悬疑剧", "罪案剧", "穿越剧", "宫廷剧", "历史剧", "神话剧", "科幻剧", "年代剧", "农村剧", "商战剧", "剧情", "仙侠", "奇幻", "网络剧" ]
        }, {
            tag: "year",
            items: [ "全部年份", "2018", "2017", "2016", "2015", "2011-2014", "2000-2010", "90年代", "80年代", "更早" ]
        } ],
        DIAN_YING: [ {
            tag: "areas",
            items: [ "全部地区", "华语", "美国", "欧洲", "韩国", "日本", "泰国", "其他" ]
        }, {
            tag: "type",
            items: [ "全部类型", "动作", "喜剧", "爱情", "惊悚", "科幻", "恐怖", "伦理", "悬疑", "犯罪", "剧情", "网络大电影" ]
        }, {
            tag: "year",
            items: [ "全部年份", "2018", "2017", "2016", "2015", "2014", "2013" ]
        } ],
        ZONG_YI: [ {
            tag: "areas",
            items: [ "全部地区", "内地", "港台", "日韩", "欧美" ]
        }, {
            tag: "type",
            items: [ "全部类型", "爱奇艺出品", "真人秀", "脱口秀", "游戏", "访谈", "选秀", "播报", "搞笑", "情感", "相亲", "美食", "时尚", "曲艺", "盛会", "少儿", "粤语", "其它" ]
        } ],
        DONG_MAN: [ {
            tag: "areas",
            items: [ "全部地区", "国漫", "日漫", "韩国", "欧美", "其它" ]
        }, {
            tag: "version",
            items: [ "全部版本", "TV版", "OVA版", "剧场版", "真人版", "特别版", "电影版", "短片" ]
        }, {
            tag: "type",
            items: [ "全部风格", "萝莉", "轻改", "漫改", "原创", "游戏", "搞笑", "经典", "热血", "催泪", "治愈", "猎奇", "致郁", "励志", "装逼", "战斗", "后宫", "机战", "基腐", "恋爱", "百合", "科幻", "乙女", "奇幻", "推理", "校园", "运动", "智斗", "日常", "魔法", "历史", "美食", "职场", "神魔", "偶像", "萌系", "伪娘", "美少女", "萝莉", "声控", "少儿", "泡面", "青春", "冒险", "竞技", "音乐", "合家欢", "跟播新番" ]
        } ]
    },
    channelMap: {
        DIAN_YING: 1,
        DIAN_SHI_JU: 2,
        JI_LU_PIAN: 3,
        DONG_MAN: 4,
        YIN_YUE: 5,
        ZONG_YI: 6,
        YU_LE: 7,
        GAME: 8,
        LV_YOU: 9,
        PIAN_HUA: 10,
        GONG_KAI_KE: 11,
        JIAO_YU: 12,
        SHI_SHANG: 13,
        SHI_SHANG_ZONG_YI: 14,
        SHAO_ER: 15,
        WEI_DIAN_YING: 16,
        TI_YU: 17,
        AO_YUN: 18,
        ZHI_BO: 19,
        GUANG_GAO: 20,
        SHENG_HUO: 21,
        GAO_XIAO: 22,
        QI_PA: 23,
        CAI_JING: 24,
        ZI_XUN: 25,
        QI_CHE: 26,
        YUAN_CHUANG: 27,
        TAO_MI: 91,
        LIAN_XIANG_HE_ZUO: 92,
        PIAN_MA_QI_CE_SHI: 96,
        OTHER: 97,
        CE_SHI: 99,
        VIP: 120,
        QI_YI_CHU_PIN: 111,
        PAIKE: "",
        JUNSHI: 28,
        MU_YING: 29,
        KE_JI: 30,
        TUO_KOU_XIU: 31,
        JIAN_KANG: 32,
        GONG_YI: 33,
        11: "公开课",
        "公开课": 11,
        14: "时尚综艺",
        "时尚综艺": 14
    },
    PURCHASE: {
        ALL: /(全部是否免费)|(全部资费)/,
        FREE: "免费",
        VIP: "付费",
        0: "免费",
        2: "付费"
    },
    YEAR_VALUE: {
        "全部年份": "-",
        "90年代": "1990-1999",
        "80年代": "1980-1989",
        "更早": "-1979"
    },
    album_channels_map: {
        "电影": 1,
        "综艺": 1,
        "电视剧": 1,
        "动漫": 1,
        "少儿": 1,
        "脱口秀": 1
    },
    SEARCH_NUM: 12,
    TOTLE_PAGE: 21
};