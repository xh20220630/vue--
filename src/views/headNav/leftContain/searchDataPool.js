//处理需要检索的数据
import getData from '@/reqApi/reqRouteData';


export default async  ()=>{
    const {data} =await getData();
    // console.log(data);
    let searchData=data.map((item)=>{
        item["titles"] = [item.title];
        item.children.forEach(el => {
            // console.log(el)
            el["titles"]=  [item.title];
            el["titles"].push(el.title)
        });
        return item
    })
    return searchData;
}