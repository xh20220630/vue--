//请求修改直播的接口
import server from "@/axios/server"
export default async (data)=>{
    const reslut =await server.post('classLive/editLive',{data});
    return reslut;
}