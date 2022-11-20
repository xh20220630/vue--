import { getLocalStorage,setLocalStorage } from "@/Storage"

export default {
    namespaced:true,
    state:{
        //向本地存储里面拿值,后面的参数是默认值
        isOpend:getLocalStorage('__isOpend__',{status:true})
    },
    actions:{
        actionIsOpned(context){
            let isOpend = context.state.isOpend;
            // console.log(isOpend);
            //把isOpned的状态发生更改
            isOpend.status = !isOpend.status;
            //真实修改数据
            context.commit('changeIsOpend',isOpend.status)
            //存入数据库中
            setLocalStorage('__isOpend__',{status:isOpend.status});
            // console.log(isOpend);
        }
    },
    mutations:{
        changeIsOpend(state,val){
            state.isOpend.status = val;
        }
    }

}