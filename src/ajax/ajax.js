import ajax from './index'
// const base_url = "/api"
// const base_url = 'http://47.114.170.251:80'
const base_url = 'http://vectorjzc.top'

// 获取列表
// export const reqList = () => ajax(base_url + '/list')
// 发起登录
export const reqLogin = (username, password) => ajax(base_url + '/login', { username, password }, "POST")
    // 判断登录状态
export const reqIsLogin = () => ajax(base_url + '/userinfo')
    // 上传用户数据
export const uploadContent = (contents, category, showDetail) => ajax(base_url + '/upload', { contents, category, showDetail }, "POST")
    // 获取用户上传的数据
export const readData = (category) => ajax(base_url + '/readstr?category=' + category)
    // 获取用户上传的数据（后台）
export const adminReadData = () => ajax(base_url + '/admin/readstr')
    // 删除指定的数据
export const deleData = (id) => ajax(base_url + '/delete', { id })
    // 获取指定id的数据
export const getById = (id) => ajax(base_url + '/getbyid', { id })
    // 获取编辑数据的信息
export const editData = (id) => ajax(base_url + '/edit', { id })
    // 数据编辑
export const modifyData = (contents, id, category, showDetail) => ajax(base_url + '/modify', { contents, id, category, showDetail }, "POST")
    // 增加星星
export const AddStar = (hello) => ajax(base_url + '/addstar', { hello })
    // 获取星星
export const GetStar = () => ajax(base_url + '/getstar')
    // 获取更多
export const Addmore = () => ajax(base_url + '/addmore')
    // 获取最新
export const Getnew = () => ajax(base_url + '/getnew')
    // 关键词搜索
export const Search = (word) => ajax(base_url + '/search', { word })

// 留言发布
export const SendFriMsg = (friendMsg) => ajax(base_url + '/frimsg', { friendMsg }, "POST")

// 获取留言页的或者编辑页的留言信息
export const GetFriMsg = (all) => ajax(base_url + '/getfrimsg', { all })
    // 获取首页5条留言
export const GetFriMsg5 = () => ajax(base_url + '/getfrimsg5')
    // 点击按钮获取更多10条留言
export const AddMsg = () => ajax(base_url + '/addmsg')

// 回复留言
export const ReplayFriMsg = (replay) => ajax(base_url + '/replaymsg', { replay }, "POST")

// 删除留言
export const DeleteFriMsg = (id) => ajax(base_url + '/delefrimsg', { id }, "POST")

// 提交友链信息
export const SubmitFriLink = (FriLink) => ajax(base_url + '/uploadlink', { FriLink }, "POST")
    // 获取友链信息
export const GetLink = () => ajax(base_url + '/getlink')
    // 获取首页6条友链信息
export const GetLink6 = () => ajax(base_url + '/getlink6')

// 编辑友链
export const editLink = (id) => ajax(base_url + '/editlink', { id })
    // 删除友链
export const deleLink = (id) => ajax(base_url + '/delelink', { id })
    // 提交友链编辑
export const updateLink = (FriLink) => ajax(base_url + '/updatelink', { FriLink }, "POST")