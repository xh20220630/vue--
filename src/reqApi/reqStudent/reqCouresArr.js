//书写一个请求后端路由信息的api

import server from "@/axios/server";

export default async function reqCourseData(data){
    let set = new Set([]);
    const courseObj = {
        coursekind:[],
        courseName:[]
    }
    const result =await server.get('/student/courseMeesage');
    result.data.data.forEach(element => {
        set.add(element.coursekind);
        courseObj.courseName.push(element.courseName)
    });
    courseObj.coursekind = [...set];
    // console.log(courseObj)
    return {
        result,
        courseObj
    }
}