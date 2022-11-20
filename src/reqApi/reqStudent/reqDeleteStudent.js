//请求删除学生的接口
import server from "@/axios/server"
//命名导出
export const reqDeleteStudent = (data)=>{
    const res = server.post('/student/delete',data);
    return res;
}
export const rootDeletStudent = (data)=>{
    const res = server.post('/student/rootDelete',data);
    return res;
}



