import server from "@/axios/server";
//第一个参数是文件数据，第二个参数是param数据
export default async function reqUploadExcel(data){
    const reslut = await server.post('http://localhost:6002/import/upload',data);
    return reslut
}