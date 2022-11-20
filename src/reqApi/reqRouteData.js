//书写一个请求后端路由信息的api

import server from "@/axios/server";

export default async function reqRouteData(data){
    const result = server.get('/routerData')
    return result
}