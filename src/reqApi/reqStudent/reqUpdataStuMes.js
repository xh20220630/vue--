import server from "@/axios/server";

export default async function reqUpdataStuMes(data){
    const result = server.post('/student/updataStuMessage',{
        data,
    })
    return result
}