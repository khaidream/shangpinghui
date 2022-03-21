import { reqGetSearchInfo } from "@/api"
// search模块的小仓库
export default {
    namespaced:true,
    actions:{
        // 获取search模块数据
        async getSearchList(context,params={}){
            // 当前这个reqGetSearchInfo这个函数在调用服务器数据的时候，至少传递一个参数(空对象)
            // params形参：是当用户派发action的时候，第二个参数传递过来的
            let  result = await reqGetSearchInfo(params)
            if(result.code==200){
                context.commit('GETSEARCHLIST',result.data)
            }
        }
    },
    mutations:{
        GETSEARCHLIST(state,value){
            state.searchList = value
        }
    },
    // 为了简化数据而生
// 可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
    getters:{
        // 当前形参state，当前仓库中的state，并非大仓库中的那个state
        goodsList(state){
            // 如果服务器的数据回来了，没问题是一个数组
            // 假如网络不给力，或没有网络，返回的就是undefined了
            // 计算新的属性的属性值至少给人家来一个数组
            return state.searchList.goodsList ||[]
        },
        trademarkList(state){
            return state.searchList.trademarkList||[]
        },
        attrsList(state){
            return state.searchList.attrsList||[]
        }
    },
    state:{
        searchList:{}
    }
}
