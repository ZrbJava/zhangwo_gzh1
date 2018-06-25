// export const domain = "/palmar"
export const domain = "test"
    // export const domain = "http://wx.palmar.cn"
    // export const domain = "http://192.168.1.138/new_palmar/public/wechat/index.php/"
    // export const domain = "http://bobo.com/new_palmar/public/wechat/index.php/" 
export default {
    // 这里是接口列表
    index: "Apivote/index", //活动首页
    vote: "Apivote/vote", //投票接口
    signup: "Apivote/signup", //投票接口
    playerlist: "Apivote/playerlist", //参赛选手列表
    ranking: "Apivote/ranking", //赛区排名数据接口
    isplayer: "Apivote/isplayer", //是否参赛者
    historyZone: "Apivote/historyZone", //历史赛区
    sign: "Apivote/sign", //报名页面
    signup: "Apivote/signup", //参赛报名
    my: "Apivote/my", //我的
    code_get_token: "Apivote/code_get_token", //微信授权获取CODE
    rise: "Apivote/rise", //每日票数情况
    search: "Apivote/search", //搜索参赛选手
    player: "Apivote/player", //参赛详情
    getPlayerTags: "Apivote/getPlayerTags", //选手标签数据
    getTopFans: "Apivote/getTopFans", //前五粉丝
    tags: "Apivote/tags", //标签集合
    getWXConfig: 'Apivote/getWXConfig', //获取调用jssdk需要的参数
    selected_tags: "Apivote/selected_tags", //获取用户已选标签
    edit: "Apivote/edit" //选手资料编辑
}