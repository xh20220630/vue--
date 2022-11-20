export default {
    //导出一个关于课程部分的路由
    path:'/course',
    name:'course',
    redirect:'/course/courseManage',
    component:()=>import('@/views/homepage/index.vue'),
    meta:{
        title: "课程",
        icon: "role"
    },
    children:[{
        path:'courseManage',
        name:'courseManage',
        component:()=>import('@/views/appMain/ChildView/course/Course-manage.vue'),
        meta:{
            title: "课程管理",
            icon: "personnel-info"
        }
    },
    {
        path:'live',
        name:'live',
        component:()=>import('@/views/appMain/ChildView/course/Course-live.vue'),
        meta:{
            title: "我的直播",
            icon: "reward"
        }
    },
    {
        path:'classManage',
        name:'classManage',
        component:()=>import('@/views/appMain/ChildView/course/Course-class.vue'),
        meta:{
            title: "班期管理",
            icon: "link"
        }
    },
    {
        path:'addManage',
        name:'addManage',
        component:()=>import('@/views/appMain/ChildView/course/Course-add.vue'),
        meta:{
            title: "添加课程",
            icon: "addcourage"
        }
    }

]
}