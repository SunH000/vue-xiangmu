//管理商品详情信息的vuex子模块

/* 
管理搜索模块相关数据的vuex模块
*/
import { reqProduct } from '@/api'

const state = {
    detailInfo: {}, // 搜索得到商品列表相关数据的对象(不是数组)
}

const mutations = {
    /*  
    接收保存新的商品详情信息
    */
    RECEIVE_DETAIL_INFO(state, detailInfo) {
        state.detailInfo = detailInfo
    }
}

const actions = {
    /* 
    获取商品详情信息的异步action
    */
    async getDetailInfo({ commit }, skuId) {
        const result = await reqProduct(skuId)
        if (result.code === 200) {
            const detailInfo = result.data
            commit('RECEIVE_DETAIL_INFO', detailInfo)
        }
    }
}

const getters = {
    categoryView(state) {
        const categoryView = state.detailInfo.categoryView

        return categoryView || {}
            //return categoryView === undefined ? {} : categoryView
    },
    skuInfo(state) {
        const skuInfo = state.detailInfo.skuInfo
        return skuInfo || {}
    },
    skuImageList(state) {
        const skuInfo = state.detailInfo.skuInfo
        return skuInfo ? skuInfo.skuImageList : []
    },
    spuSaleAttrList(state) {
        const spuSaleAttrList = state.detailInfo.spuSaleAttrList
        return spuSaleAttrList || []
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}