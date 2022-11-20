//请求返回所有的文章

import server  from "@/axios/server";

export default (options)=>{
    const data = server.get("article/list",{params:options});
    return data;
}