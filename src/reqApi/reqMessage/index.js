//请求消息的接口
import server from "@/axios/server";
import store from "@/store";
import { ElMessage } from "element-plus";

//请求返回消息
export const reqShowMessage =async (userName)=>{
    const res = await server.get("/infoMessage/requestMessage", {params: {
        userName
    }});
    return res;
}

//请求删除信息 
//如果成功就给当前元素添加删除的动画
export const deleteMessage = async (id,elemnt)=>{
    const res = await server.post('/infoMessage/deleteMessage',{
        objectID:id
    });
    if(res.data.status == 400){
        //代表删除成功
        elemnt && elemnt.classList.add("deleteAnnimation");
        setTimeout(()=>{
            ElMessage.success("删除成功");
        },500);
    }
    return res;
}

//返回消息

export const responseMessage = ()=>{

}   