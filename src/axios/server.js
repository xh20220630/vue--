import axios from "axios";

//生成一个基础的axios对象

const server = axios.create({
    baseURL:'http://localhost:6002', //基础路由
    timeout:6000,  //请求时长
    withCredentials:true,  //是否携带cookie
    // headers: {'content-type': 'application/x-www-form-urlencoded','charset':'UTF-8'},
  })

export default server