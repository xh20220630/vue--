import server from "@/axios/server"

export default async function reqReg(data){
    const result = server.get('/register',{
        params:data
    })
    // console.log('注册Api')
    return result
}