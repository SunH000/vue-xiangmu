import { getUserTempId, saveUserInfo, getUserInfo, removeUserInfo } from '@/utils'
import { reqRegister, reqLogin, reqLogout } from '@/api'

export default {
    state: {
        //从本地种读取保存的用户信息
        userInfo: getUserInfo(),
        userTempId: getUserTempId() //用户临时id 获取函数只执行一次
    },
    mutations: {
        RECEIVE_USER_INFO(state, { userInfo }) {
            state.userInfo = userInfo
        },
        RESET_USER_INFO(state) {
            state.userInfo = ''
        }
    },
    actions: {

        //退出登录
        async logout({ commit }) {
            const result = await reqLogout()
            if (result.code === 200) {
                //清除vuex中的用户信息
                commit('RESET_USER_INFO')
                    //清除localStorage中的用户信息
                removeUserInfo()

            } else {
                throw new Error(result.message || '退出登录失败')
            }
        },


        //注册异步action
        async register(context, userInfo) {
            const result = await reqRegister(userInfo)
            if (result.code !== 200) {
                throw new Error(result.message || '注册失败')
            }
        },

        async login({ commit }, { mobile, password }) {
            const result = await reqLogin(mobile, password)
            if (result.code === 200) {
                const userInfo = result.data

                //将用户信息提交给mutation保存在state
                commit('RECEIVE_USER_INFO', { userInfo })

                saveUserInfo(userInfo)
            } else {
                throw new Error(result.data || result.message || '登录失败')
            }
        }


    },

    getters: {}
};