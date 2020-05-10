/* 
用来管理首页数据的vuex模块
*/
import { reqBaseCategoryList, reqBanners, reqFloors } from '@/api'

export default {
    state: {
        baseCategoryList: [], // 所有分类的数组
        banners: [], // 轮播的数组
        floors: [], // 楼层的数组
    },

    mutations: {
        /* 
        接收保存新的分类列表
        */
        RECEIVE_BASE_CATEGORY_LIST(state, baseCategoryList) {
            state.baseCategoryList = baseCategoryList
        },

        /* 
        接收保存新的轮播数组
        */
        RECEIVE_BANNERS(state, banners) {
            state.banners = banners
        },

        /* 
        接收保存新的楼层数组
        */
        RECEIVE_FLOORS(state, floors) {
            state.floors = floors
        },
    },

    actions: {
        /* 
        获取分类列表的异步action
        */
        async getBaseCategoryList({ commit }) {
            // 1. 发异步ajax请求
            const result = await reqBaseCategoryList()
                // 2. 成功后, 提交mutation保存数据
            if (result.code === 200) {
                const baseCategoryList = result.data
                commit('RECEIVE_BASE_CATEGORY_LIST', baseCategoryList)
            }
        },

        /* 
        获取轮播列表的异步action
        */
        async getBanners({ commit }) {
            // 1. 发ajax请求, 获取数据
            const result = await reqBanners()
                // 2. 成功后, 取出数据, 提交给mutation
            if (result.code === 200) {
                const banners = result.data
                commit('RECEIVE_BANNERS', banners)
            }
        },

        /* 
        获取楼层列表的异步action
        */
        async getFloors({ commit }) {
            // 1. 发ajax请求, 获取数据
            const result = await reqFloors()
                // 2. 成功后, 取出数据, 提交给mutation
            if (result.code === 200) {
                const floors = result.data
                commit('RECEIVE_FLOORS', floors)
            }
        },

    },
    getters: {},
}