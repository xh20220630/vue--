import server from "@/axios/server"
//关于登录的一些请求
//发起登录请求(导出我们登录的函数)
export const reqLogin=async (data)=>{
   const result = await server.post('/login',data);
   return result
}
export const reqExitLogin = async ()=>{
   const result = await server.get('login/exitlogin')
   return result;
}

export const reqIsLogin = async ()=>{
   const result = await server.get('login/islogin')
   return result;
}