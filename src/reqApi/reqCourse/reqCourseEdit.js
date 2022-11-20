//请求编辑课程

import server from "@/axios/server";

export default async function reqCourseEdit(data){
    const reslut = await server.post('/course/courseEdit',data);
    return reslut
}