export default {
    //导出一个关于学生部分的路由
    path:'/student',
    name:'stuent',
    redirect:'/student/studentManage',
    component:()=>import('@/views/homepage/index.vue'),
    meta:{
        title: "学员",
        icon: "personnel",
    },
    children:[{
        path:'studentManage',
        name:'studentManage',
        component:()=>import('@/views/appMain/ChildView/student/Student-manage.vue'),
        meta:{
            title: "学员管理",
            icon: "personnel-manage"
        }
    },
    {
        path:'import',
        name:'import',
        component:()=>import('@/views/appMain/ChildView/student/Student-import.vue'),
        meta:{
            title: "导入学员",
            icon: "introduce"
        }
    }

]
}