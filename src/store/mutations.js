import { IS_LOGIN, READ_DATA, ADD_MORE, GET_SRARCH, IS_INPUT, GET_TOKEN } from './mutation-type'
import Vue from 'vue'

export default {
    [IS_LOGIN](state, { userinfo }) {
        state.userinfo = userinfo
    },
    [READ_DATA](state, { strs }) {
        state.strs.data = strs
    },
    [ADD_MORE](state, { strss }) {
        state.strs.moreData = strss.moreData
            // console.log(strss);
        strss.data.forEach(item => {
            state.strs.data.push(item)
        })
    },
    [GET_SRARCH](state, { strs }) {
        state.strs.data = strs
    },
    [IS_INPUT](state, { isInput }) {
        state.isInput = isInput
    },
    [GET_TOKEN](state, { token }) {
        // console.log(token)
        state.Authorization = token
    }
}