// 导入mutations-type里面的方法常量
import {
    RECEIVE_LIST,
    IS_LOGIN,
    READ_DATA,
    ADD_MORE,
    GET_SRARCH,
    IS_INPUT

} from './mutation-type'

import {
    reqList,
    reqIsLogin,
    readData,
    Addmore,
    Search
} from '../ajax/ajax'

export default {
    // 异步获取列表
    async getList({ commit }) {
        const result = await reqList();
        if (result.code == 200) {
            const list = result.data
            commit(RECEIVE_LIST, { list })
        }
    },
    async isLogin({ commit }) {
        const result = await reqIsLogin();
        if (result.code == 200) {
            const userinfo = result
                // console.log(userinfo)
            commit(IS_LOGIN, { userinfo })
        }
    },
    async readData({ commit }, category) {
        const strs = await readData(category)
            // console.log(strs.length)
        commit(READ_DATA, { strs })
    },
    async addmore({ commit }) {
        const strss = await Addmore();
        // console.log(strss)
        commit(ADD_MORE, { strss })
    },
    async getSearch({ commit }, word) {
        const strs = await Search(word);
        // console.log(strs);
        commit(GET_SRARCH, { strs })
    },
    getIsInput({ commit }, isInput) {
        // console.log(isInput);
        // state.isInput = isInput
        commit(IS_INPUT, { isInput })
    }

}