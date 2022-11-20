//定义引导的步骤

export default [
    {
        element: "#first-guide", //需要导向的元素的id名
        popover: {
            title: "导向", //导向的标题
            description: "当前系统的引导", //导向的描述
            position: "bottom-right" //导向出现的位置
        }
    },
    {
        element: "#second-hambarger", //需要导向的元素的id名
        popover: {
            title: "汉堡包",
            description: "汉堡包区域,改变菜单栏宽度",
            position: "right-top"
        }
    },
    {
        element: "#three-fullScreen", //需要导向的元素的id名
        popover: {
            title: "全屏",
            description: "点击可以进入全屏",
            position: "bottom-right"
        }
    }, {
        element: "#four-search", //需要导向的元素的id名
        popover: {
            title: "搜索",
            description: "搜索系统的菜单项",
            position:"bottom-right"
        }
    },
    {
        element: "#sixd-tagview", //需要导向的元素的id名
        popover: {
            title: "历史记录",
            padding:0,
            description: "显示当前的用户访问的路由记录",
            position: "bottom-center"
        }
    },
    {
        element: "#five-hambargerTitle", //需要导向的元素的id名
        popover: {
            title: "汉堡屑",
            padding:0,
            description: "显示当前的路由信息",
            position: "bottom-center"
        }
    },
    
    {
        element: "#six-meau", //需要导向的元素的id名
        popover: {
            title: "菜单栏",
            description: "菜单栏内容",
            position: "right-center"
        },
    }
]