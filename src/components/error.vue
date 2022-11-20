<template>
  <div class='error'>
    <slot></slot>
    <h3>{{msg}}</h3>
    <p>{{count}}秒后自动跳转到<span>{{toRoute.title}}</span></p>
    <el-button @click="linkRoute" color="#44a08d">点击立即跳转</el-button>
  </div>
</template>
<script setup>
import {defineProps,ref,onMounted,onDeactivated} from "vue"
import {useRouter} from "vue-router"
const props = defineProps(["msg","toRoute"])

const count = ref(10);
const router = useRouter();
let timer = null;

const computeTimeLink = ()=>{
    if(count.value <= 0){
        router.replace(props.toRoute.route);
        // count.value = 5
    }else{
       timer = setTimeout(()=>{
            count.value--;
            computeTimeLink();
        },1000)
    }
}
const linkRoute = ()=>{
    clearTimeout(timer);
    router.replace(props.toRoute.route);
}
// computeTimeLink();
onMounted(()=>{
    computeTimeLink();
})

//组件销毁前触发(因为改成了缓存路由，所以要使用失活后)
onDeactivated(()=>{
    clearTimeout(timer);
})
</script>
<style lang="scss" scoped>
.error{
    position: absolute;
    width: 300px;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    h3{
        margin: 10px 0px;
        color:#f00000;;
    }
    p{
        margin-bottom: 10px;
        line-height: 30px;
        span{
            margin-left: 5px;
        }
    }
}
</style>