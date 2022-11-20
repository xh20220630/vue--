<template>
  <div class="pullBox">
    <el-card>
      <template #header>
        <div class="pull">
          <h4>瀑布流</h4>
        </div>
      </template>
      <div class="content" ref="contentRef">
        <!-- 瀑布流内容区 -->
        <ul
          :style="{ width: ulStyle.width }"
          class="pullAllItem"
          ref="pullAllItemRef"
        >
          <li v-for="(item, index) in liArr" :key="index">
            <img :src="item" alt="" />
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ref, nextTick, onMounted, defineProps, computed, watch } from "vue";
import {useRouter} from "vue-router"
//ul的高度需要计算得出
const contentRef = ref(null);
const pullAllItemRef = ref(null);
const props = defineProps(["activeName"]);
const rowNum = ref(0); //一排的个数
const colNum = ref(0); //有多少列
const liList = ref([]);
const heightArr = ref([]);
const router = useRouter() //生成一个router对象
const ulStyle = ref({
  width: "",
});
//路由离开时触发
router.afterEach(()=>{
    console.log('我离开了');
    //关闭window上的resize
    window.removeEventListener('resize',resizeFn)
})
//记录最小高度
const minScorllHeight = ref(null);
//自定义数据
const liArr = ref([]);
for (let i = 0; i < 18; i++) {
  liArr.value.push(require(`@/assets/imgs/pb/P_0${("0" + i).slice(-2)}.jpg`));
}
const pullName = computed(() => {
  return props.activeName;
});
const handleLi = () => {
  console.log("1111");
  nextTick(() => {
    rowNum.value = Math.floor(contentRef.value.clientWidth / 200);
    liList.value = pullAllItemRef.value.children;
    colNum.value = Math.floor(liList.value.length / rowNum.value);
    //计算pullAllItemRef的高度
    ulStyle.value.width = rowNum.value * 210 + "px";

    // console.log(pullAllItemRef.value.children);
    //找出当前每列当中最矮的
    //遍历每一排
    let height = "";
    heightArr.value = [];
    for (let i = 0; i < colNum.value; i++) {
      //底部离顶部等于offsetTop+自身的高度
      //遍历每一列
      for (let j = rowNum.value * i; j < (i + 1) * rowNum.value; j++) {
        //挑选出当前这一列最矮的
        // console.log(j)
        let li = liList.value[j];
        //第一列
        if (i == 0) {
          li.style.position = "static";
          height = li.offsetTop + li.clientHeight;
          heightArr.value.push(height);
        } else {
          // console.log(heightArr.value)
          li.style.position = "absolute";
          let minHeight = Math.min(...heightArr.value);
          let index = [...heightArr.value].findIndex((item) => {
            // console.log(item);
            return item == minHeight;
          });
          minScorllHeight.value = minHeight;
          //   console.log(index,"index")
          let nowClu = Math.floor(j / rowNum.value);
          // console.log("nowClu",nowClu)
          li.style.top = minHeight + "px";
          li.style.left = index * 200 + "px";
          height = li.offsetTop + li.clientHeight;
          //更新高度
          heightArr.value[index] = height;
        }
      }
      //    let arr = [...liList].splice(rowNum.value*i,(i+1)*rowNum.value);
    }
  });
};
let timer = null;
const resizeFn = () => {
  clearTimeout(timer);
  timer = setTimeout(handleLi, 100);
};
watch(props, (newValue) => {
  if (newValue.activeName == "second") {
    handleLi();
    window.addEventListener("resize",resizeFn);
    pullAllItemRef.value.onscroll = (e) => {
      //     for(let i=0;i<10;i++){
      //     liArr.value.push(require(`@/assets/imgs/pb/P_00${i}.jpg`));
      //     console.log('1111')
      //     }
      //      handleLi()
      //获取页面滚动的高度
      let scrollHeight =
        pullAllItemRef.value.scrollTop + pullAllItemRef.value.clientHeight;
      let clientHeight = pullAllItemRef.value.clientHeight;
      console.log(scrollHeight,minScorllHeight.value-292)
      if (scrollHeight > minScorllHeight.value - 292) {
        //达到需要加载的区域
        // console.log('到了')
        for (let i = 0; i < 10; i++) {
          liArr.value.push(
            require(`@/assets/imgs/pb/P_0${("0" + i).slice(-2)}.jpg`)
          );
        }
        handleLi();
      }
    };
  } else {
    window.removeEventListener("resize", resizeFn);
    minScorllHeight.value=0;
    liArr.value=liArr.value.splice(0,20)
  }
});
</script>
<style lang="scss" scoped>
.pullAllItem {
  margin: 0 auto;
  position: relative;
  height: 800px;
  max-height: 800px;
  // display: flex;
  overflow-y: scroll;
  li {
    // position: absolute;
    width: 200px;
    float: left;
    position: static;
  }
}
</style>