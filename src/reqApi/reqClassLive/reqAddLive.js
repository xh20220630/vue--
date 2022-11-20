//请求添加直播的接口
import server from "@/axios/server";
export default async function reqAddLive(data){
    const reslut = await server.post('classLive/addLive',{
        data
    })
    return reslut
}