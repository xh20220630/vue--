//书写一个请求后端路由信息的api

import server from "@/axios/server";

export default async function reqCourseData(){
    let set = new Set([]);
    const courseObj = {
        coursekind:[],
        courseName:[]
    }
    const result =await server.get('/course/courseMessage');
    courseObj.coursekind = result.data.courseKindArr;
    result.data.courseMeesage.forEach(element => {
        let obj = {};
        obj.courseName = element.courseName;
        obj.couseKind = element.courseKind;
        obj.courseClass = element.courseClass
        courseObj.courseName.push(obj);
    });
    // courseObj.coursekind = [...set];
    // console.log(courseObj)
    return {
        courseObj
    }
}