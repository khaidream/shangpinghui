// 当前的这个模块：API进行统一管理
import requests from './request'
import mockRequests from './mockAjax'

// 三级联动的接口
// /api/product/getBaseCategoryList get 无参数
// 简写 export const reqreqCategoryList = ()=>requests.get('/product/getBaseCategoryList');
export const reqCategoryList = ()=>{
    // 发请求：axios发请求返回的结果是Promise对象
    return requests({url:'/product/getBaseCategoryList',method:'get'})
}
// 获取banner（Home首页轮播图接口）
export const reqGetBannerList = ()=>mockRequests.get('/banner')
//获取floor数据
export const reqFloorList = () =>mockRequests.get('/floor')
// 获取订单号
// export const reqOrderId = ()=>mockRequests.get('/orderid')
// 获取搜索模块的数据 地址：/api/list 请求的方式：post 请求需要带参数
// 当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params)=>requests({
    url:"/list",
    method:"post",
    data:params
})
// 获取产品详情信息的接口 URL:/api/item/{skuId} 请求方式: get
export const reqGoodsInfo = (skuId) =>requests({url:`/item/${skuId}`,method:'get'})
// 将产品添加到购物车中（或者更新某一个产品的个数）
// /api/cart/addToCart/{skuId}/{skuNum}
export const reqAddOrUpdateShopCart = ( skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
// 获取购物车列表的数据接口
// URL:/api/cart/cartList method:get
export const reqCartList  = () =>requests({url:'/cart/cartList',method:'get'})
// 删除购物车产品的接口
export const reqDeleteCartById = (skuId) =>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
// 修改商品中的选中状态
export const reqUpdateCheckedByid = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
// 获取验证码
export const reqGetCode = (phone)=> requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
// 完成注册
export const reqUserRegister = (data) =>requests({url:'/user/passport/register',data,method:'post'})
// 登录 /api/user/passport/login
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'})
// 获取用户的信息【需要带着token向服务器要用户信息】
export const reqUserInfo =()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})
// 退出登录
export const reqLogOut = () => requests({url:"/user/passport/logout",method:'get'})
// 获取用户地址信息
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
// 获取商品清单
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})
// 提交订单的接口 
export const reqSubmitOrder = (tradeNo,data) =>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
// 获取支付信息
export const reqPayInfo = (orderId) =>requests({url:`/payment/weixin/creatNatives/${orderId}`,method:'get'}) 
// 获取支付订单状态
export const reqPayStaus = (orderId)=>{requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})}
// 获取个人中心的数据
// api/order/auth/{page}/{limit} get
export const reqMyOrderList = (page,limit)=> requests({url:`/order/auth/${page}/${limit}`,method:'get'})