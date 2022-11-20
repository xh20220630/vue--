// 请求修改班期
import server from "@/axios/server"
export default function reqUpdataClassFn(data){
    const result = server.post("/student/updataClass",{
        data,
    })
    return result;
}