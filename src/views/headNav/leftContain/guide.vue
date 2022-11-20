<template>
  <div class='guide'>
       <el-tooltip
        effect="dark"
        content="开启引导"
      >
         
         <span>
           <svg-icon icon="guide" id="first-guide" @click="beginGuide"></svg-icon>
         </span>
      </el-tooltip>
  </div>
</template>
<script setup>
import {onMounted,ref} from "vue"
import Driver from "driver.js"
import "driver.js/dist/driver.min.css";
//导入我们定义好的引导步骤
import steps from "./setp";
let driver = null
// 生成driver对象
onMounted(()=>{
     driver=new Driver({
    //是否开启动画
    animate:false,
    //是否点击遮罩层关闭
    allowClose:true,
    //关闭按钮的文本
    closeBtnText:"点击关闭",
    //进入下一步按钮的文本
    nextBtnText:"下一步",
    //返回上一步按钮的文本
    prevBtnText:"返回上一步",
    onHighlighted:()=>{
      const activeElement = driver.getHighlightedElement();
      // console.log(activeElement);
      if(activeElement.node.id == "six-meau"){
        activeElement.stage.node.classList.add('show')
      }else{
        // console.log('执行')
         activeElement.stage.node.classList.remove('show')
      }
    }
})
})

const beginGuide = ()=>{
    driver.defineSteps(steps);
    driver.start() //开启引导

}
</script>
<style lang="scss" scoped>
.guide{
    line-height: 80px;
    #first-guide{
      border: none;
      cursor: pointer;
    }
}
:global(.show){
  top: 0 !important;
  height: 100% !important;
}
</style>