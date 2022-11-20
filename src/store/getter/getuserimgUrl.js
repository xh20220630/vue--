export default 
    {
        userImgSrc(state){
            if(state.userInfo.userInfo.userImg){
                //后端有值的情况
                return state.staticUrl + '/' +state.userInfo.userInfo.userImg
            }else{
                //后端没有值
                return require("@/assets/imgs/default.webp");
            }
        },
        getterIsOpend(state){
            return state.hamburger.isOpend
        },
        getterRouteLinked(state){
            return state.routerData.routerLinkedArr
        }   
    }   
