import server from "@/axios/server";
export default async function reqAddLive(data){
    const reslut = await server.post('classLive/deleteLive',{
        data
    })
    return reslut
}