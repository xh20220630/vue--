import server from "@/axios/server";

export default async function reqCourseMessage(data){
    const reslut = await server.get('/course/courseMessage',{
        params:data,
    });
    return reslut
}