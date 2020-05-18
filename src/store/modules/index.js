import home from './home'
import user from './user'
import search from './search' // 取默认暴露的模块, 如果没有就是undefined
import detail from './detail'
import shopCart from './shopCart'
import order from './order'

// console.log('search', search)

export default {
    home,
    user,
    search,
    detail,
    shopCart,
    order
}