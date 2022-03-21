// home模块的小仓库
import { reqCategoryList, reqGetBannerList,reqFloorList } from "@/api"
export default {
    namespaced:true,
    actions:{
        async categoryList(context){
            let result =await reqCategoryList();
           if(result.code ===200){
               context.commit('CATEGORYLIST',result.data)
           }
        },
        // 获取首页轮播图的数据
        async getBannerList(context){
          let result =  await reqGetBannerList();
          if(result.code==200){
            //   console.log(result); //{code:200,data:[{...},{...},{...}]}
              context.commit('GETBANNERLIST',result.data)
          }
        },
        async getFloorList(context){
            let result = await reqFloorList();
            if(result.code==200){
                // 提交mutation
                context.commit('GETFLOORLIST',result.data)
            }
        }

    },
    mutations:{
        CATEGORYLIST(state,value){
            state.categoryList = value.splice(0,16) //因为数据多了一条使用使用splice切割了一下
        },
        GETBANNERLIST(state,value){
            state.bannerList = value
        },
        GETFLOORLIST(state,value){
            state.floorList = value
        }
    },
    // 计算属性
    getters:{},
    state:{
        // stsate中的数据默认初始值别瞎写、服务器返回对象，起始值就是对象，服务器返回数组，起始值就是数组【根据接口的返回值初始化】
        // home仓库中存储三级菜单的数据
        categoryList:[],
        // 轮播图的数据
        bannerList:[],
        // floor组件的数据
        floorList:[]
    }
}