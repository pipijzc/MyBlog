import { RECEIVE_LIST, IS_LOGIN, READ_DATA, ADD_MORE, GET_SRARCH, IS_INPUT } from './mutation-type'
import Vue from 'vue'

export default {
    // 获取列表数据
    [RECEIVE_LIST](state, { list }) {
        state.list = list
    },
    [IS_LOGIN](state, { userinfo }) {
        state.userinfo = userinfo
    },
    [READ_DATA](state, { strs }) {
        state.strs = strs
    },
    [ADD_MORE](state, { strss }) {
        strss.forEach(item => {
            state.strs.push(item)
        })
    },
    [GET_SRARCH](state, { strs }) {
        state.strs = strs
    },
    [IS_INPUT](state, { isInput }) {
        state.isInput = isInput
    }
}