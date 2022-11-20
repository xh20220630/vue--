import server from "@/axios/server";

export default async function reqUploadExcel(data){
    const reslut = await server.get('http://localhost:6002/import/ShowImporttFile',{
        params:data
    });
    return reslut
}