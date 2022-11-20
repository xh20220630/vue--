//请求添加学生信息
import server from "@/axios/server";

export default async function reqAddStudent(data){
    const result = server.post('/student/addStudent',data)
    return result
}