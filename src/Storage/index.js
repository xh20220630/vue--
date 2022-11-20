//用来生成数据本地存储session和localtion的方法


//在本地存储
export const setSessionStorage = function(key,value){
    key = key || 'default'
    sessionStorage.setItem(key,JSON.stringify(value));
}

export const  setLocalStorage = function(key,value){
    localStorage.setItem(key,JSON.stringify(value));
}

//获取本地存储

//如果当前获取的内容为null，就把我们期望获取到的值返回
export const getSessionStorage = function(key,hopeItem){
   let value = JSON.parse(sessionStorage.getItem(key));
   if(value){
    hopeItem = hopeItem || '' //预防前面没有传
    hopeItem = value
   }
   return hopeItem;
}
export const getLocalStorage = function(key,hopeItem){
   let  value = JSON.parse(localStorage.getItem(key));
   // console.log(value)
   if(value){
    hopeItem = hopeItem || '' //预防前面没有传
    hopeItem = value
   }
   return hopeItem;
 }

 //定义一个清除本地存储的方法
 export const clearStorage=()=>{
    sessionStorage.clear();
    localStorage.clear();
 }