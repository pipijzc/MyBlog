export default {

    // 登录信息
    userinfo: {},
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    str: "",
    strs: {
        data: [],
        moreData: true
    },
    isInput: false
}