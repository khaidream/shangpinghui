import { reqAddressInfo,reqOrderInfo,reqOrderId } from "@/api";
export default {
    namespaced:true,
    actions:{
        async getUserAddresss(context){
            let result = await reqAddressInfo()
            if(result.code==200){
                context.commit('GETUSERADDRESS',result.data)
            }
        },
        async getOrderInfo(context){    
            let result = await reqOrderInfo()
            if(result.code==200){
                context.commit('GETORDERINFO',result.data)
            }
        },
    },
    mutations:{
        GETUSERADDRESS(state,address){
                state.address = address
        },
        GETORDERINFO(state,orderInfo){
            state.orderInfo = orderInfo
        },
    },
    getters:{},
    state:{
        address:[],
        orderInfo:{},
    }
}