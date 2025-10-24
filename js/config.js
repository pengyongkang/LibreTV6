const PROXY_URL = "/proxy/"; // 适用于 Cloudflare, Netlify (带重写), Vercel (带重写)
// const HOPLAYER_URL = 'https://hoplayer.com/index.html';
const SEARCH_HISTORY_KEY = "videoSearchHistory";
const MAX_HISTORY_ITEMS = 5;

// 网站信息配置
const SITE_CONFIG = {
  name: "彭友TV",
  url: "https://github.com/SeqCrafter/LibreTV",
  description: "免费在线视频搜索与观看平台",
  logo: "image/logo.png",
  version: "1.0.3",
};

// API站点配置
const API_SITES = {
  innerSource: {
    api: "http://caiji.dyttzyapi.com/api.php/provide/vod",
    name: "电影天堂",
    adult: false,
  },

  heimuer: {
    api: "https://json.heimuer.xyz/api.php/provide/vod",
    name: "黑木耳",
    detail: "https://heimuer.tv",
    filterAdRule: "#EXT-X-DISCONTINUITY\\n#EXTINF:\\d+\\.\\d+,\\n.*?\\n#EXT-X-DISCONTINUITY",
    adult: false,
  },
  ffzy: {
    api: "http://ffzy5.tv/api.php/provide/vod",
    name: "非凡影视",
    detail: "http://ffzy5.tv",
    filterAdRule: "#EXT-X-DISCONTINUITY\\r*\\n*#EXTINF:6.666667,[\\s\\S]*?#EXT-X-DISCONTINUITY",
  },
  tyyszy: {
    api: "https://tyyszy.com/api.php/provide/vod",
    name: "天涯资源",
  },
  ckzy: {
    api: "https://www.ckzy1.com/api.php/provide/vod",
    name: "CK资源",
    adult: true,
  },
  zy360: {
    api: "https://360zy.com/api.php/provide/vod",
    name: "360资源",
  },
  wolong: {
    api: "https://wolongzyw.com/api.php/provide/vod",
    name: "卧龙资源",
  },
  cjhw: {
    api: "https://cjhwba.com/api.php/provide/vod",
    name: "新华为",
  },
  hwba: {
    api: "https://cjwba.com/api.php/provide/vod",
    name: "华为吧资源",
  },
  jisu: {
    api: "https://jszyapi.com/api.php/provide/vod",
    name: "极速资源",
    detail: "https://jszyapi.com",
  },
  dbzy: {
    api: "https://dbzy.tv/api.php/provide/vod",
    name: "豆瓣资源",
  },
  bfzy: {
    api: "https://bfzyapi.com/api.php/provide/vod",
    name: "暴风资源",
  },
  mozhua: {
    api: "https://mozhuazy.com/api.php/provide/vod",
    name: "魔爪资源",
  },
  mdzy: {
    api: "https://www.mdzyapi.com/api.php/provide/vod",
    name: "魔都资源",
  },
  ruyi: {
    api: "https://cj.rycjapi.com/api.php/provide/vod",
    name: "如意资源",
  },
  ikun: {
    api: "https://ikunzyapi.com/api.php/provide/vod",
    name: "iKun资源",
  },
  jkun: {
    api: "https://jkunzyapi.com/api.php/provide/vod",
    name: "jkun资源",
    adult: true,
  },
  bwzy: {
    api: "https://api.bwzym3u8.com/api.php/provide/vod",
    name: "百万资源",
    adult: true,
  },
  souav: {
    api: "https://api.souavzy.vip/api.php/provide/vod",
    name: "souav资源",
    adult: true,
  },
  r155: {
    api: "https://155api.com/api.php/provide/vod",
    name: "155资源",
    adult: true,
  },
  lsb: {
    api: "https://apilsbzy1.com/api.php/provide/vod",
    name: "lsb资源",
    adult: true,
  },
  huangcang: {
    api: "https://hsckzy.vip/api.php/provide/vod",
    name: "黄色仓库",
    detail: "https://hsckzy.vip",
    adult: true,
  },
  zuid: {
    api: "https://api.zuidapi.com/api.php/provide/vod",
    name: "最大资源",
  },
  yinghua: {
    api: "https://m3u8.apiyhzy.com/api.php/provide/vod",
    name: "樱花资源",
  },
  wujin: {
    api: "https://api.wujinapi.me/api.php/provide/vod",
    name: "无尽资源",
  },
  wwzy: {
    api: "https://wwzy.tv/api.php/provide/vod",
    name: "旺旺短剧",
  },
  lzi: {
    api: "https://cj.lziapi.com/api.php/provide/vod",
    name: "量子资源站",
  },
  xiaomaomi: {
    api: "https://zy.xmm.hk/api.php/provide/vod",
    name: "小猫咪资源",
  },
  maotaizy: {
    api: "https://caiji.maotaizy.cc/api.php/provide/vod",
    name: "茅台资源",
  },
  yutu: {
    api: "https://yutuzy10.com/api.php/provide/vod",
    name: "玉兔资源",
    adult: true,
  },
};

// 定义合并方法
function extendAPISites(newSites) {
  Object.assign(API_SITES, newSites);
}

// 暴露到全局
window.API_SITES = API_SITES;
window.extendAPISites = extendAPISites;

// 添加聚合搜索的配置选项
const AGGREGATED_SEARCH_CONFIG = {
  enabled: true, // 是否启用聚合搜索
  timeout: 8000, // 单个源超时时间（毫秒）
  maxResults: 10000, // 最大结果数量
  parallelRequests: true, // 是否并行请求所有源
  showSourceBadges: true, // 是否显示来源徽章
};

// 抽象API请求配置
const API_CONFIG = {
  search: {
    path: "?ac=videolist&wd=",
    pagePath: "?ac=videolist&wd={query}&pg={page}",
    maxPages: 50,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "application/json",
    },
  },
  detail: {
    path: "?ac=videolist&ids=",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "application/json",
    },
  },
};

// 优化后的正则表达式模式
const M3U8_PATTERN = /\$https?:\/\/[^"'\s]+?\.m3u8/g;

// 添加自定义播放器URL
const CUSTOM_PLAYER_URL = "player.html";

// 增加视频播放相关配置
const PLAYER_CONFIG = {
  autoplay: true,
  allowFullscreen: true,
  width: "100%",
  height: "600",
  timeout: 15000,
  filterAds: true,
  autoPlayNext: false,
  adFilteringEnabled: false,
  adFilteringStorage: "adFilteringEnabled",
};

// 弹幕API配置
const DANMAKU_CONFIG = {
  defaultApiUrl: "",
  storageKey: "danmakuApiUrl",
};

// 增加错误信息本地化
const ERROR_MESSAGES = {
  NETWORK_ERROR: "网络连接错误，请检查网络设置",
  TIMEOUT_ERROR: "请求超时，服务器响应时间过长",
  API_ERROR: "API接口返回错误，请尝试更换数据源",
  PLAYER_ERROR: "播放器加载失败，请尝试其他视频源",
  UNKNOWN_ERROR: "发生未知错误，请刷新页面重试",
};

// 添加进一步安全设置
const SECURITY_CONFIG = {
  enableXSSProtection: true,
  sanitizeUrls: true,
  maxQueryLength: 100,
};

// 添加多个自定义API源的配置
const CUSTOM_API_CONFIG = {
  separator: ",",
  maxSources: 5,
  testTimeout: 5000,
  namePrefix: "Custom-",
  validateUrl: true,
  cacheResults: true,
  cacheExpiry: 5184000000,
  adultPropName: "isAdult",
};

// 隐藏内置黄色采集站API的变量
const HIDE_BUILTIN_ADULT_APIS = true;
