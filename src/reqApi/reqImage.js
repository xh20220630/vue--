//请求图片
import axios from "axios";

//创建一个axios对象
let app =  axios.create({
    timeout:6000,  //请求时长
});
export default async function reqRouteData(data){
   const  result = app.get('http://yapi.smart-xwork.cn/mock/185960/imageCover')
    return result
}