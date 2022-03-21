import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogOut } from "@/api"
import { setToken,getToken,removeToken } from "@/utils/token"
// 登录与注册的模块
export default {
    namespaced:true,
    actions:{
        // 获取验证码
        async getCode(context,phone){
            let result =await reqGetCode(phone)
            if(result.code==200){
                context.commit('GETCODE',result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 用户注册
        async userRegister(context,user){
             let result = await reqUserRegister(user)
             if(result.code==200){
                 return 'ok'
             }else{
                return Promise.reject(new Error('faile'))
             }
        },
        // 登录业务
        async userLogin(context,data){
            let result = await reqUserLogin(data)
            if(result.code==200){
                context.commit('USERLOGIN',result.data.token)
                // localStorage.setItem('TOKEN',result.data.token)
                // 持久化存储token
                setToken(result.data.token)
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 获取用户信息
        async getUserInfo(context){
            let result = await reqUserInfo()
            if(result.code==200){
                context.commit('GETUSERINFO',result.data)
                return 'ok'
            }else{
                // return Promise.reject(new Error('faile'))
            }
        },
        // 退出登录
        async userLogOut(context){
           let result =  await reqLogOut()
           if(result.code=200){
               context.commit('CLEAR')
               return 'ok'
           }else{
               return Promise.reject(new Error('faile'))
           }
        }
    },
    mutations:{
        GETCODE(state,code){
            state.code = code
        },
        USERLOGIN(state,token){
            state.token = token
        },
        GETUSERINFO(state,userInfo){
            state.userInfo = userInfo
        },
        CLEAR(state){
            // 把仓库中相关用户信息及本地存储清空   
            state.token = ''
            state.userInfo = {}
            removeToken();
        }
    },
    state:{
        code:'',
        token: getToken(),//localStorage.getItem('TOKEN'),//null 点击登录派发action之后会将TOKEN存储在本地 此时state.token的值恒为本地存储内的TOKEN
        userInfo:{}
    },
    getters:{}
}