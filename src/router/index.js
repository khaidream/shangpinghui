// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter);
// 引入路由组件
import store from '@/store'
// import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
const Home = ()=>  import('@/pages/Home')
// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace

// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        // call||apply区别
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数的区别：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}
/* 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，
然后当路由被访问的时候才加载对应组件，这样就更加高效了。 */

// 配置路由
let router =  new VueRouter({
    // 配置路由
    routes:[
        {
            path:'/communication',
            component:()=>import('@/pages/Communication'),
            children:[
                {
                    path:'attrs-listeners',
                    component:()=>import('@/pages/Communication/AttrsListenersTest')
                },
                {
                    path:'children-parent',
                    component:()=>import('@/pages/Communication/ChildrenParentTest')
                },
                {
                    path:'event',
                    component:()=>import('@/pages/Communication/EventTest')
                },
                {
                    path:'model',
                    component:()=>import('@/pages/Communication/ModelTest')
                },
                {
                    path:'scope-slot',
                    component:()=>import('@/pages/Communication/ScopeSlotTest')
                },
                {
                    path:'sync',
                    component:()=>import('@/pages/Communication/SyncTest')
                }
            ]
        },
        {
            path:'/center',
            component:()=>import('@/pages/Center'),
            meta:{show:true},
            redirect:'/center/myorder',
            children:[
                {
                    // 二级路由不需要写完整的路径
                    path:'myorder',
                    component:()=>import('@/pages/Center/myOrder')
                },
                {
                    path:'groupOrder',
                    component:()=>import('@/pages/Center/groupOrder')
                },
     /*            {
                    // 路由重定向
                    path:'/center',
                    redirect:'/center/myorder'
                } */
            ]
        },
        {
            path:'/paysuccess',
            component:()=>import('@/pages/PaySuccess'),
            meta:{show:true}
        },
        {
            path:'/pay',
            component:()=>import('@/pages/Pay'),
            meta:{show:true},
            beforeEnter:((to,from,next)=>{
                if(from.path=='/trade'){
                    next()
                }else{
                    next(false)
                }
            })
        },
        {
            path:'/detail/:skuid',
            component:()=>import('@/pages/Detail'),
            meta:{show:true}

        },
        {
            path:'/home',
            component:Home,
            meta:{show:true}
        },
        {
            path:'/search/:keyword?',
            component:()=>import('@/pages/Search'),
            meta:{show:true},
            name:'search',
            // 路由组件能不能传递props数据？
            // 布尔值写法：只能传递params参数
            // props:true
            // 对象写法:额外的给路由组件传递一些props
            // props:{a:1,b:2}
            // 函数写法：可以把params参数、query参数，通过props传递给路由组件
            // props:($route)=>{
            //     return {keyword:$route.params.keyword,k:$route.query.k}
            // }
        },
        {
            path:'/login',
            component:()=>import('@/pages/Login'),
            meta:{show:false}
        },
        {
            path:'/register',
            component:()=>import('@/pages/Register'),
            meta:{show:false}
        },
        // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/addcartsuccess',
            component:()=>import('@/pages/AddCartSuccess'),
            meta:{isShow:true}
        },
        {
            path:'/shopcart',
            component:()=>import('@/pages/ShopCart'),
            meta:{isShow:true}
        },
        {
            path:'/trade',
            component:()=>import('@/pages/Trade'),
            meta:{isShow:true},
            // 路由独享守卫
            beforeEnter:(to,from,next)=>{
                if(from.path=='/shopcart'){
                    next()
                }else{
                    next(false)
                }
            }
        }
    ],
    scrollBehavior(to,from,savedPosition){
        // 返回的y代表滚动条在最上方        
        return {y:0}
    }
})
// 全局守卫：前置守卫
router.beforeEach(async (to,from,next)=>{
    // next()
    // 获取token 未登录一定不会有token
   let token =  store.state.user.token
   let name = store.state.user.userInfo.name
//    用户已经登录
   if(token){
    if(to.path=='/login'){
        // 登录了去的是login(不能去，停留在首页)
        next('/home')
    }else{
        // 登录了，去的不是login
        if(name){
            next()
        }else{
            // 没有用户信息，派发action让仓库存储用户信息再跳转
            try{
                await store.dispatch('user/getUserInfo')
                next()
            }catch(error){
                // token失效了,获取不到用户信息，需要重新登录
                await store.dispatch('user/userLogOut')
                next('/login')
            }
        }
    }
   }else{
    //    未登录不能去交易、支付相关的 跳转到登录页
    let toPath = to.path
    if(toPath=='/trade' || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
        next(`/login?redirect=${toPath}`)
    }else{
        next()
    }
   }
})

export default router;