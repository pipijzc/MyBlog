// 导入mutations-type里面的方法常量
import {
    IS_LOGIN,
    READ_DATA,
    ADD_MORE,
    GET_SRARCH,
    IS_INPUT,
    GET_TOKEN

} from './mutation-type'

import {

    reqIsLogin,
    readData,
    Addmore,
    Search,
} from '../ajax/ajax'

export default {
    async isLogin({ commit }) {
        const result = await reqIsLogin();
        if (result.code == 200) {
            const userinfo = result
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
    },
    getTokens({ commit }, token) {
        commit(GET_TOKEN, { token })
        localStorage.setItem('Authorization', token)
    }

}