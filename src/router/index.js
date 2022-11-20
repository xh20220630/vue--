import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/login"
import register from '@/views/register'
import homePage from '@/views/homepage'
//导入路由模块
import routerModel from "./routerModel";



const routes = [
  //配置登录路由
 {
  path:'/login',
  name:'login',
  component:Login,
 },

 //配置注册路由
 {
  path:'/register',
  name:'register',
  component:register
 },
 //配置首页路由
 {
  path:'/',
  name:'profile',
  component:()=> import("@/views/homepage/index.vue"),
  redirect:'/profile',
  children:[{
    path:'profile',
    name:'profile',
    component:()=> import("@/views/appMain/ChildView/Person-center.vue"),
    meta:{
      title:'个人中心',
      icon:"user"
    }
  },
  {
    path:"/404",
    name:'404',
    component:()=>import("@/views/error/404.vue"),
  },
  {
    path:"/401",
    name:'401',
    component:()=>import("@/views/error/401.vue"),
  }

]
 },
routerModel.studentRouter,
routerModel.article,
routerModel.course
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
