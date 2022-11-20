//请求直播列表

import server from "@/axios/server";

export default async (data)=>{
    const result = await server.get('/classLive/livelist',{
        params:data
    });
    return result;
}