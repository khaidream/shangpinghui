import { reqGoodsInfo ,reqAddOrUpdateShopCart } from "@/api"
// 封装游客身份模块uuid --> 生成一个随机字符串()
import {getUUID} from '@/utils/uuid_token'
export default {
    namespaced:true,
    actions:{
        // 获取产品信息的action
        async getGoodInfo(context,skuId){
            let result = await reqGoodsInfo(skuId)
            if(result.code==200){
                context.commit('GETGOODINFO',result.data)
            }
        },

        // 将产品添加到购物车中
         async addOrUpdateShopCart(context,{skuId,skuNum}){
            let result =  await reqAddOrUpdateShopCart(skuId,skuNum)
            if(result.code==200){
                return 'ok'
            }
            else{
                // 代表加入购物车失败
                return Promise.reject(new Error('faile'));
            }
        },
    },
    state:{
        goodInfo:{},
        // 游客的临时身份
        uuid_token:getUUID()
    },
    mutations:{
        GETGOODINFO(state,value){
            state.goodInfo = value
        }
    },
    getters:{
        // 路径导航简化的数据
        categoryView(state){
            // 当前计算出来的 categoryView属性值至少是一个空对象，假的报错就不会有了
            return state.goodInfo.categoryView || {} 
        },
        // 简化产品信息的数据
        skuInfo(state){
            return state.goodInfo.skuInfo || {}
        },
        // 产品售卖属性的简化
        spuSaleAttrList(state){
            return state.goodInfo.spuSaleAttrList || []
        }
    }
}
