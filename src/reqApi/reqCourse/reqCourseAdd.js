//请求添加课程的方法
import serve from "../../axios/server";
export default async function reqCourseAddFn(fileData){
        let res = await serve.post('/course/addCourse',fileData);
        return res;
}