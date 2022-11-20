export default {
    //导出一个关于文章部分的路由
    path:'/article',
    name:'article',
    redirect:'/article/ranking',
    component:()=>import('@/views/homepage/index.vue'),
    meta:{
        title: "文章",
        icon: "article"
    },
    children:[{
        path:'create',
        name:'create',
        component:()=>import('@/views/appMain/ChildView/article/Article-create.vue'),
        meta:{
            title: "文章创建",
            icon: "article-create"
        }
    },
    {
        path:'ranking',
        name:'ranking',
        component:()=>import('@/views/appMain/ChildView/article/Article-ranking.vue'),
        meta:{
            title: "文章排名",
            icon: "article-ranking"
        }
    }
]
}