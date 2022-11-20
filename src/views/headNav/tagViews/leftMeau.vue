<template>
    <ul class="leftMeau">
        <li @click="leftFnObj.refrash">刷新</li>
        <li @click="leftFnObj.closeRight">关闭右侧</li>
        <li @click="leftFnObj.closeOther">关闭其他</li>
    </ul>
</template>
<script setup>
import {ref,defineProps,computed} from "vue"
import {useRouter,useRoute} from "vue-router"
import {useStore} from "vuex"
const props = defineProps(["index"]);
const index = computed(()=>props.index)
const store = useStore();
const router = useRouter();
const route = useRoute();
const routelinkedArr = computed(() => store.getters.getterRouteLinked);
const nowIndex = ()=>{
    return routelinkedArr.value.findIndex(item=>{
        return item.fullPath == route.fullPath;
    })
}
const leftFnObj = ref({
    //刷新功能
    refrash(){
        router.go(0);
    },
    closeRight:function(){
        //分两种情况
        console.log(nowIndex())
        //1.当前的路由下标在我们所点击的路由下标的左边（大于情况）
        if(index.value > nowIndex()){
            routelinkedArr.value.splice(index.value+1);
        }
        //2..当前的路由下标在我们所点击的路由下标的右边（小于情况）
        else{
            routelinkedArr.value.splice(index.value+1);
            console.log(routelinkedArr.value);
            router.push(routelinkedArr.value[index.value].fullPath);
        }
        store.commit('routerData/setRouterLinkedArr',routelinkedArr.value)
    },
    closeOther(){
        store.commit('routerData/setRouterLinkedArr',routelinkedArr.value.splice(index.value,1));
         router.push(routelinkedArr.value[0].fullPath);
    }
})
</script>
<style lang="scss" scoped>
.leftMeau{
    z-index: 99999;
    position: fixed;
    width: 60px;
    background-color: aliceblue;
    font-size: 12px;
    padding: 5px;
    height: 80px;
    border-radius: 10px;
    text-align: center;
    li{
        text-align: center;
        line-height: 27px;
        border-bottom: 1px solid #fff;
        cursor: pointer;
        &:hover{
            opacity: .6;
        }
    }
}
</style>