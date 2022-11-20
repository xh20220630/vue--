import { createStore } from 'vuex'
import userInfo from "@/store/user/userInfo"
import getters from "./getter/getuserimgUrl"
import routerData from './user/routerData'
import hamburger from './effect/hamburger'
export default createStore({
  state:{
    //默认的静态资源请求路由
    staticUrl:'http://localhost:6002'
  },
 getters,
  modules: {
    userInfo,
    routerData,
    hamburger
  }
})
