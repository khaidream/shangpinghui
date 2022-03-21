import { reqCartList,reqDeleteCartById,reqUpdateCheckedByid } from "@/api"

export default {
    namespaced:true,
    actions:{
        // 获取购物车列表的数据
        async getCartList(context){
            let result = await reqCartList()
            // 测试是否能获取个人购物车的数据
            if(result.code==200){
                context.commit('GETCARTLIST',result.data)
            }
        },
        // 删除购物车某一个产品的选中状态
        async deleteCartListBySkuId(context,skuId){
            let result = await reqDeleteCartById(skuId)
            if(result.code==200){
                return 'ok'
            }else{
                return Promise.reject (new Error('faile'))
            }
        },
        // 修改购物车某一个产品的选中状态
        async updatedCheckedById(context,{skuId,isChecked}){
            let result = await reqUpdateCheckedByid(skuId,isChecked)
            if(result.code==200){
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        deleteAllCheckedCart(context){
            let PromiseAll = []
            context.getters.cartList.cartInfoList.forEach(item=>{
                let promise = item.isChecked==1?context.dispatch('deleteCartListBySkuId',item.skuId):''
                // 将每次返回的Promise添加到数组当中
                PromiseAll.push(promise)
            })
            // 只要全部的都成功返回结果即为成功
            // 如果有一个失败   ，返回即为失败的结果
            return Promise.all(PromiseAll)
        },
        // 修改全部产品的选中状态
        updateAllCartIsChecked(context,isChecked){
            let PromiseAll = []
            context.state.cartList[0].cartInfoList.forEach(item=>{
                let promise = context.dispatch('updatedCheckedById',{skuId:item.skuId,isChecked})
                PromiseAll.push(promise)
            })
            return Promise.all(PromiseAll)   
        }
    },
    mutations:{
        GETCARTLIST(state,cartlist){
            state.cartList  = cartlist
        }
    },
    getters:{
        cartList(state){
            return state.cartList[0]||{}
        },
        // 计算出来的购物车数据
    },
    state:{
        cartList:[]
    }
}