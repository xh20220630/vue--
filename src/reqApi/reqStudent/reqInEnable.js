//请求是否启用的api

import server from "@/axios/server";

export default async function reqInEnable(data){
    const result = server.post('/student/isEnable',{
        data
    })
    return result
}