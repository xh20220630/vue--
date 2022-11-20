//格式化时间错格式的时间

export default (data)=>{
    //格式化成小时分钟的形式
   let hour = data/60 < 10?'0'+data/60:data/60;
   let minute = data%60 < 10 ?'0'+data%60:data%60;
   return `${hour}:${minute}`
}