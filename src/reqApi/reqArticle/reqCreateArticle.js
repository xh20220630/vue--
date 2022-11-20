//请求创建文章
import server from "@/axios/server"
export default (data)=>{
    const res = server.post('article/create',{data});
    return res
}