import ajax from './index'
const base_url = "/api"

// 获取列表
export const reqList = () => ajax(base_url + '/list')
    // 发起登录
export const reqLogin = (username, password) => ajax(base_url + '/login', { username, password }, "POST")
    // 判断登录状态
export const reqIsLogin = () => ajax(base_url + '/userinfo')
    // 上传用户数据
export const uploadContent = (contents, category) => ajax(base_url + '/upload', { contents, category }, "POST")
    // 获取用户上传的数据
export const readData = (category) => ajax(base_url + '/readstr?category=' + category)
    // 删除指定的数据
export const deleData = (id) => ajax(base_url + '/delete', { id })
    // 获取指定id的数据
export const getById = (id) => ajax(base_url + '/getbyid', { id })
    // 获取编辑数据的信息
export const editData = (id) => ajax(base_url + '/edit', { id })
    // 数据编辑
export const modifyData = (contents, id, category) => ajax(base_url + '/modify', { contents, id, category }, "POST")
    // 增加星星
export const AddStar = (hello) => ajax(base_url + '/addstar', { hello })
    // 获取星星
export const GetStar = () => ajax(base_url + '/getstar')
    // 获取更多
export const Addmore = () => ajax(base_url + '/addmore')
    // 获取最新
export const Getnew = () => ajax(base_url + '/getnew')

export const Search = (word) => ajax(base_url + '/search', { word })