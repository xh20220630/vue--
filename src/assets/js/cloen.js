
// 定义一个克隆的函数


//orginArr:原数据 cloneArr:克隆的数组
function cloneFn(orginArr,cloneArr){
    //遍历原数据(判断一下原数据)

    for(let i in orginArr){
       let item = orginArr[i];
    //    console.log(cloneArr)
        if(item instanceof(Object)){
            let obj = {}
            cloneFn(item,obj);
        }
        else if(item instanceof(Array)){
            let arr=[];
            cloneFn(item,arr)
        }
        cloneArr[i] = item;
    }
}
// const obj = {
//     name:[1,2,3,4,5],
//     age:[{a:1,b:2}]
// }
// const obj1= {};
// cloneFn(obj,obj1);
// console.log(obj1)
//导出我们的方法
export const clone = cloneFn;