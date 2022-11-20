//配置全局的路由守卫

import router from "@/router"
import store from "@/store";
import {clearStorage} from "@/Storage"
import { reqIsLogin } from "@/reqApi/login";
//没有登录可以允许访问的路由
const witeRouter = ['/login', '/profile', '/404', '/401', '/register'];
const routerAll = router.getRoutes();
router.beforeEach((to, from, next) => {
    //如果是访问白名单，不管是谁通行，如果是访问白名单以外的路由，就需要对当前用户的状态进行判断
    //判断路由是否在我们的路由表中
    if (routerAll.findIndex(item => { return item.path == to.fullPath }) == -1) {
        router.replace('/404')
    } else {
        //发起请求看用户是否登录
        reqIsLogin().then(({ data }) => {
            // console.log(data)
            if (data.statu == 400) {
                //代表当前用户是登录的
                //登录状态下除了登录界面其他界面都能访问
                if (to.fullPath == '/login') {
                    return router.push('/');
                }
                //通行，而且记录对应路由的信息到用户历史路由数组中
                // console.log(to.fullPath !== '/404')
                if (to.fullPath !== '/404') {
                    const { fullPath, meta } = to;
                    store.dispatch('routerData/pushRouteLinkedArr', {
                        fullPath
                        , meta
                    })
                }
                next();
            } else {
                //用户未登录
                //清除本地缓存
                clearStorage();
                //清除store的数据
               cler();
                //强制刷新一下
                if (witeRouter.includes(to.fullPath)) {
                    //访问白名单
                    next();
                } else {
                    router.push('/401');
                }
            }
        }).catch((error) => {
            if (error) throw error
        })
    }
})
const cler = ()=>{
    store.commit('routerData/defaultRouterData')  
    store.state.userInfo.userInfo.userImg=""
    store.state.userInfo.userInfo = {};
}