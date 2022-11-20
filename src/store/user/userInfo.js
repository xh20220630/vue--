//定义一个展示用户信息的模块
import registerApi from "@/reqApi/register"
import { reqLogin, reqExitLogin } from "@/reqApi/login"
import servers  from "@/axios/server"
import { ElMessage } from "element-plus"
import { setLocalStorage, getLocalStorage, clearStorage } from '@/Storage'
import {reqShowMessage} from "@/reqApi/reqMessage/index"
//引入路由对象
import router from "@/router"
export default ({
    namespaced: true, //开启一个命名空间
    state: {
        userInfo: getLocalStorage('__userInfo__', {}), //先看一下本地是否存储了，没有存储就设置
        //用户的消息列表
        userMessage:getLocalStorage('__userMessage__', null)
    },
    getters: {
    },
    mutations: {
        setUserInfo(state, value) {
             state.userInfo = value;
        },
        setUserMessage(state,value){
            state.userMessage = value;
        }
    },
    actions: {
        //用户登录的操作放在这个里面做
        async LoginFn(context, value) {
            const { data } = await reqLogin(value)
            //    console.log(data)
            //如果状态为400就是登录成功，其他都是登录失败
            if (data.statu == 400) {
                //不管登录成功还是失败都应该提示一下用户
                ElMessage.success(data.msg);
                // console.log(data.data)
                //登录成功后将用户的信息在store设置一份，以便其他地方使用，另外在本地存储一份
                context.commit('setUserInfo', data.data);
                setLocalStorage('__userInfo__', data.data);

                //向后端请求获取路由信息
                context.dispatch('routerData/getRouterData', null, { root: true });
        
                //登录成功跳转路由
                router.push('/');
            } else {
                ElMessage.error(data.msg);
            }
        },

        //用户注册的操作
        async registerFn(context, value) {
            const { data } = await registerApi(value);
            //逻辑跟登录差不多
            console.log(data)
            //如果状态为400就是登录成功，其他都是登录失败
            if (data.status == 400) {
                //不管登录成功还是失败都应该提示一下用户
                ElMessage.success(data.msg);
                //注册成功就可以跳转到登录界面了
            } else {
                ElMessage.error(data.msg);
            }
        },

        //用户退出登录的操作
        async exitLoginFn(context) {
            //向后端发起退出请求
            const { data } = await reqExitLogin();
            if (data.statu == 400) {
                //代表当前退出登录的状态是成功的

                //清除本地的数据
                clearStorage();
                context.state.userInfo = {};
                context.state.userMessage = null;
                console.log(context);
                //弹个窗
                ElMessage.success(data.msg);
            } else {
                //退出登录失败

                //弹个窗
                ElMessage.error(data.msg);
            }
            //跳转一下
            router.push('/login');
        },
        //获取当前用户的消息列表
    // async requestMessage(context) {
    //     //获取当前的用户名
    //         const res = await reqShowMessage();
    //         //代表当前有用户给你发消息
    //         context.commit('setUserMessage', res.data);
    //         console.log('调用我了');
    //         //将消息进行本地存储
    //         setLocalStorage("__userMessage__",res.data);
    // }
    }

})