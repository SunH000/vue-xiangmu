/* 
包含所有接口请求函数的模块
每个函数的返回值都是promise
*/

import ajax from './ajax'
import mockAjax from './mockAjax'

/* 
请求获取3级分类列表
/api/product/getBaseCategoryList
*/
export function reqBaseCategoryList() {
    // return ajax('/product/getBaseCategoryList')
    return ajax({
            method: 'GET',
            url: '/product/getBaseCategoryList'
        })
        // return ajax.get('/product/getBaseCategoryList')
}

/* mock接口对应的接口请求函数 */
export const reqBanners = () => mockAjax('/banners')
export const reqFloors = () => mockAjax('/floors')

/* 
根据搜索的条件参数对象获取商品列表数据
*/
export const reqProductList = (searchParams) => ajax({
        url: '/list',
        method: 'POST',
        data: searchParams
    })
    // export const reqProductList = (searchParams) => ajax.post('/list', searchParams)

/* 
reqProductList({
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}) */

/* 
请求获取指定id的商品信息
/api/item/{ skuId }
*/
export const reqProduct = (skuId) => ajax(`/item/${skuId}`)

// reqProduct(6)


/* 
添加到购物车(对已有物品进行数量改动)
/api/cart/addToCart/{ skuId }/{ skuNumChange }
skuId: 商品的id
skuNumChange: 增加或减少的数量 正数代表增加 / 负数代表减少
*/
export const reqAddToCart = (skuId, skuNumChange) => ajax.post(`/cart/addToCart/${skuId}/${skuNumChange}`)

/* 
获取购物车列表
/api/cart/cartList GET
*/
export const reqCartList = () => ajax('/cart/cartList')
    // reqCartList()

/* 
切换商品选中状态
/api/cart/checkCart/{skuID}/{isChecked} GET
skuId: 商品id
isChecked: 新的选中状态值  0代表取消选中 / 1代表选中
*/
export const reqCheckCartItem = (skuId, isChecked) => ajax(`/cart/checkCart/${skuId}/${isChecked}`)

/* 
删除购物车商品
/api/cart/deleteCart/{skuId} DELETE
*/
export const reqDeleteCartItem = (skuId) => ajax.delete(`/cart/deleteCart/${skuId}`)
    /* export const reqDeleteCartItem = (skuId) => ajax({
      url: `/cart/deleteCart/${skuId}`,
      method: 'DELETE'
    }) */

/* 
请求登陆
/api/user/passport/login
POST
*/
export function reqLogin(mobile, password) {
    return ajax({
        method: 'POST',
        url: '/user/passport/login',
        data: { mobile, password }
    })

    // return ajax.post('/user/passport/login', {mobile, password})
}

/* 
请求注册
/api/user/passport/register  POST
*/
// export const reqRegister = ({mobile, password, code}) => ajax.post('/user/passport/register', {mobile, password, code})
export const reqRegister = (userInfo) => ajax.post('/user/passport/register', userInfo)

/* 
退出登陆
/api/user/passport/logout
*/
export const reqLogout = () => ajax('/user/passport/logout')