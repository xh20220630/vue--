//请求所有直播信息的接口
import server from "@/axios/server";
export default async function getAllLive(data){
    const result = await server.post('classLive/allLive',{
        data
    });
    return result
}