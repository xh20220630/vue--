// 定义一个格式化时间的函数

export default (time)=>{
    const data = new Date(time);
    const year = data.getFullYear();
    //如果月份小于十就加一（首先加个0，然后后前两位）
    const mouth = ('0'+(data.getMonth()+1)).slice(-2);
    const day = ('0'+data.getDate()).slice(-2);
    const hour = ('0'+data.getHours()).slice(-2);
    const minute = ('0'+data.getMinutes()).slice(-2);
    //拼接好进行返回

    return `${year}年-${mouth}月-${day} ${hour}:${minute}`
}