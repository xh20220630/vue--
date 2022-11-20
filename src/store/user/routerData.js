import reqRouteData from "@/reqApi/reqRouteData"
import { setLocalStorage, getLocalStorage } from '@/Storage'
//定义一个路由信息模块
export default ({
    namespaced: true,
    state() {
        return {

            routerData: JSON.parse(getLocalStorage('__routerData', '[]')),
            //用户访问的路由记录的数组
            routerLinkedArr: JSON.parse(getLocalStorage('__routerLinkedArr', '[]')),
        }
    },
    actions: {
        async getRouterData(context) {
            const res = await reqRouteData()  //可以拿到后端返回的路由信息(自动处理好了，不用转)
            //一是在本地需要存储一份，而是在模块上也需要一份
            //修改state中的值还是需要在mutations里面操作
            context.commit('setRouterData', res.data)
            setLocalStorage('__routerData', JSON.stringify(res.data));
        },
        //定义一个向记录路由数组里面添加用户访问的路由信息的方法
        pushRouteLinkedArr(context, val) {
            // console.log(val)
            let Arr = context.state.routerLinkedArr;
            if (Arr.findIndex(item => { return item.fullPath == val.fullPath }) == -1) {
                Arr.push(val);
                //真实存储
                context.commit('setRouterLinkedArr', Arr);
            }
        }
    },
    mutations: {
        setRouterData(state, val) {
            state.routerData = val;
        },
        //定义存储用户访问记录路由的方法
        setRouterLinkedArr(state, val) {
            // console.log("commot",val)
            //改变state里面的值，以及本地存储一份
            state.routerLinkedArr = val;
            setLocalStorage('__routerLinkedArr', JSON.stringify(val));
        },
        //用户未登录时返回
        defaultRouterData(state) {
            state.routerData = [{
                title: "个人中心",
                path: "/profile",
                icon: "user",
                children: [],
            }],
                state.routerLinkedArr = [{
                    fullPath: "/profile",
                    meta: {
                        icon: "user",
                        title: "个人中心"
                    }
                }]
        }

    }
})