//计算高度的函数
import {ref,onActivated,onDeactivated} from "vue"
// 第二个参数为一个router对象
const computeHeight = (margrinTop,router)=>{
    //获取当前视口的高度
    let scrollHeight = ref(window.innerHeight - margrinTop); //保持响应式
    //重新计算高度
    const refreshHeight = ()=>{
        scrollHeight.value = window.innerHeight - margrinTop;
        // console.log(scrollHeight.value)
    }
    {
    onActivated(()=>{
    window.addEventListener('resize',refreshHeight);
    // console.log('1111')
   })
}
    //路由离开或者组件失活之后需要解绑事件，不然会引发冲突
    onDeactivated(()=>{
        window.removeEventListener('resize', refreshHeight);
        // console.log('停止监听了')
    })
    return scrollHeight
} 
export default computeHeight  