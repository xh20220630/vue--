//请求班期信息的api

import server from "@/axios/server";

export default async (data)=>{
    const result = await server.post('/classLive/class',{data});
    return result;
}