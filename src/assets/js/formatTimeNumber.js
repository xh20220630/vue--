//格式化时间错格式的时间

export default (data)=>{
    //格式化成小时分钟的形式
    let time = new Date(data);
    const hour = ('0'+time.getHours()).slice(-2);
    const minute = ('0'+time.getMinutes()).slice(-2);
    return `${hour} : ${minute}`
}