//书写一个请求后端路由信息的api

import server from "@/axios/server";

export default async function reqProfileDara(){
    const result = await server.get('/profile/data');
    return result
}