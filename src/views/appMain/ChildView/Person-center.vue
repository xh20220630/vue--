<template>
  <div class="PensonCenter">
    <el-card class="authorInfo">
      <div class="authorInfoBox">
        <!-- 头像展示区域 -->
        <el-avatar size="large" :src="userImgUrl"></el-avatar>
        <!-- 用户的基本信息 -->
        <div class="userInfoBox">
          <p>
            <span>用户名:</span><span>{{ userInfo.username }}</span>
          </p>
          <p>
            <span>权限:</span>
            <span v-if="userInfo.admin">管理员</span>
            <span v-else>普通用户</span>
          </p>
        </div>
      </div>
      <div class="techBox">
        <!-- 技能展示区 -->
        <h2 class="techTitle">前端</h2>
        <ul>
          <li>
            <span>html</span
            ><el-progress
              :color="pargarmColor(70)"
              :percentage="70"
              :format="format"
            ></el-progress>
          </li>
          <li>
            <span>css</span
            ><el-progress
              :color="pargarmColor(60)"
              :percentage="60"
              :format="format"
            ></el-progress>
          </li>
          <li>
            <span>vue</span
            ><el-progress
              :color="pargarmColor(70)"
              :percentage="70"
              :format="format"
            ></el-progress>
          </li>
          <li>
            <span>小程序</span
            ><el-progress
              :color="pargarmColor(40)"
              :percentage="40"
              :format="format"
            ></el-progress>
          </li>
          <li>
            <span>react</span
            ><el-progress
              :color="pargarmColor(0)"
              :percentage="0"
              :format="format"
            ></el-progress>
          </li>
        </ul>
        <h2 class="techTitle">后端</h2>
        <ul>
          <li>
            <span>java</span
            ><el-progress
              :percentage="30"
              :color="pargarmColor(30)"
              :format="format"
            ></el-progress>
          </li>
          <li>
            <span>Python</span
            ><el-progress
              :color="pargarmColor(20)"
              :percentage="20"
              :format="format"
            ></el-progress>
          </li>
          <li>
            <span>javaDB</span
            ><el-progress
              :percentage="10"
              :color="pargarmColor(10)"
              :format="format"
            ></el-progress>
          </li>
          <li>
            <span>springMVC</span
            ><el-progress
              :color="pargarmColor(20)"
              :percentage="20"
              :format="format"
            ></el-progress>
          </li>
          <li>
            <span>mysql</span>
            <el-progress
              :percentage="30"
              :color="pargarmColor(30)"
              :format="format"
            ></el-progress>
          </li>
        </ul>
        <div class="myCommitBox">
          <span>我的评价是</span>
          <el-rate
            v-model="sumarPargarm"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          >
          </el-rate>
          <span class="pargramText">{{ format(sumarPargarm * 20) }}</span>
        </div>
        <div class="otherCommitBox">
          <h2 class="techTitle">那么你对我的评价是什么</h2>
          <ul>
            <li v-for="(item, index) in commitObj" :key="index">
              <span>{{ item.title }}</span>
              <el-slider
                @change="changeCommitSumPar()"
                v-model="item.data"
              ></el-slider>
            </li>
            <li>
              <span class="commitText">你的评价是</span>
              <el-rate
                v-model="sumCommitPar"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
            </li>
          </ul>
          <!-- 定义一个输入框，允许用户自己输入对我的评价内容 -->
          <div class="commitInput" >
            <div class="leftEye" :class="manyiClass"></div>
             <div class="rigthEye" :class="localClass"></div>
             <textarea class="inputBox" v-model="commitText"></textarea>
          </div>
        </div>
        <el-button class="commitButton">提交评论</el-button>
      </div>
    </el-card>
    <el-card class="exhibitInfo">
      <!-- tab选项卡 -->
      <div class="tabBox">
        <!-- 描述界面 -->
        <div
          @click="switchTar(false)"
          class="discriptionBox"
          :class="{ actived: !actived }"
        >
          <span>项目具体描述</span>
        </div>
        <!-- 展示区域 -->
        <div
          @click="switchTar(true)"
          class="exhibitBox"
          :class="{ actived: actived }"
        >
          <span>作者作品介绍</span>
        </div>
      </div>
      <!-- 描述的内容区 -->
      <div class="demo-collapse">
        <el-collapse accordion v-show="!actived">
          <el-collapse-item
            v-for="(item, index) in profileData"
            :key="item.id"
            :title="item.title"
            :name="item.id"
          >
            <div
              class="title"
              :style="computImgSrc(index)"
              v-html="item.description"
            ></div>
          </el-collapse-item>
        </el-collapse>
        <!-- 作者介绍区 -->
        <div class="authorIntroc" v-show="actived">
          <div class="authroImg">
          <img :src="require('@/assets/imgs/author.webp')" alt="" />
          <div class="info">
            <!-- 我的信息 -->
            <p><span>姓名:</span>青也</p>
            <p><span>qq:</span>25636333693</p>
            <p><span>wx:</span>保密</p>
            <p><span>梦想</span>:搞钱</p>
          </div>
        </div>
         <div class="myDiscrep">
            <!-- 我的介绍 -->
            <p>
              一名新进的前端萌新，在网上看到了前端的招聘视频，发现前端的妙处所在， 大三在校学生，本项目是根据中职通的朱雀老师的课程完成的一个后端课程和学员管理系统，适合作为vue3的练手项目，本人最擅长写bug，修改bug，在校软件工程专业，学习了Python，java，jsp的hello word的输出方法 "
            </p>
          </div>
          <pull :activeName="activeName"></pull>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup>
//导入store
import store from "@/store";
import { computed, ref } from "vue";
//导入瀑布流组件
import pull from "@/components/utility/pull.vue"

//导入获取作品数据的函数
import reqProfileDara from "@/reqApi/reqProfileData";
const actived = ref(false)
//定义一个变量表示当前是否是点击的
const activeName = computed(()=>{
  if(actived.value){
    return 'second'
  }else{
    return 'first'
  }
})

//获取用户头像
const userImgUrl = computed(() => {
  return store.getters.userImgSrc;
});

//用一个变量接收用户的所有信息
const userInfo = computed(() => {
  return store.state.userInfo.userInfo;
});

//定义一个变量接受文章信息
const profileData = ref([]);

//定义一个对我评价的变量
const commitObj = ref([
  { title: "界面美观度", data: 0 },
  { title: "功能完善度", data: 0 },
  { title: "你的满意度", data: 0 },
]);
const colorArr = ["#c31432", "#ee9ca7", "#2193b0", "#38ef7d"];
//定义一个根据当前平均进度返回一个评价信息
const pargarmText = ["还没学", "才入门", "掌握一些", "可以搞项目了"];

//定义一个数组根据当前别人对我的评价
const otherCommit = [
  "菜鸡一个",
  "项目不错,但是不如我",
  "看你的项目我自己也想搞一个了",
  "非常nice的一个项目耶",
  "想要一个一模一样的",
];
//记录总的进度
let sumarPargarm = ref(0);
//记录总的别人评论的总进度
let sumCommitPar = ref(0);
//接收一个当前的一个进度数
//因为这个方法需要循环很多次,我们只需要拿前十次的就是
let parGaerm = 0;
//定义一个记录数值的数组
let parNumber = [];
//定义一个方法计算进度条的颜色
const pargarmColor = (pargarmNumber) => {
  if (parGaerm < 10) {
    parNumber.push(pargarmNumber);
    parGaerm++;
  }
  if (parGaerm == 9) {
    parNumber.forEach((element) => {
      sumarPargarm.value += element;
    });
    sumarPargarm.value = sumarPargarm.value / 200;
  }
  let index = Math.floor(pargarmNumber / 25);
  // console.log(pargarmNumber)
  return colorArr[index];
};
//指定一个返回进度条文本信息的方法
const format = (percentage) => {
  let index = Math.floor(percentage / 25);
  return pargarmText[index];
};
//别人评论的class
const manyiClass = ref("");
const localClass = ref("")
const commitText = computed(() => {
  let index = Math.floor(sumCommitPar.value / (5 / 4));
  return otherCommit[index];
});

//计算返回每个的imgSrc
const computImgSrc = (index) => {
  return {
    background: `url(${profileData.value[index].coverImg}) center center/cover no-repeat`,
  };
};
//点击或者拖动滑块触发的函数
const changeCommitSumPar = () => {
  sumCommitPar.value = 0;
  //累加
  commitObj.value.forEach(({ data }) => {
    sumCommitPar.value = sumCommitPar.value + data;
  });
  sumCommitPar.value = (sumCommitPar.value / 60).toFixed(2) - 0;
  if(sumCommitPar.value < 1.5){
    manyiClass.value ='bumanyi left';

    localClass.value = "bumanyi right"
  }else{
     manyiClass.value ='manyi'
     localClass.value = "manyi"
  }
};

//切换点击的tar
const switchTar = (activedStatus) => {
  actived.value = activedStatus;
};
//请求数据
reqProfileDara().then((res) => {
  profileData.value = res.data;
});
</script>
<style lang="scss" scoped>
.PensonCenter {
  width: 100%;
  display: flex;
  justify-content: space-around;
  .authorInfo {
    width: 40%;
     height: 100%;
    .authorInfoBox {
      display: flex;
      justify-content: center;
      align-items: center;
      .userInfoBox {
        margin-left: 10px;
        color: #ccc;
      }
    }
    .techTitle {
      margin-bottom: 20px;
      font-weight: 700;
      color: #2193b0;
      margin-left: 10px;
    }
    .myCommitBox {
      margin-top: 10px;
      margin-bottom: 10px;
      span {
        vertical-align: 3px;
      }
      .pargramText {
        float: right;
      }
    }
    li {
      display: flex;
      height: 40px;
      align-items: center;
      :deep(.el-progress) {
        flex-grow: 1;
        margin-left: 10px;
      }
      :deep(.el-slider) {
        width: 0;
        flex-grow: 1;
        margin-left: 20px;
      }
      .commitText {
        vertical-align: -3px;
      }
    }
  }
  .commitInput,.rigthEye,.leftEye{
    border: none;
    outline: none;
    position: relative;
    width: 200px;
    border: 1px solid #ccc;
    height: 120px;
    line-height: 30px;
    margin-top: 20px;
    border-radius: 15px;
    background: #e9e4f0;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.35);
    border-radius: 46% 54% 48% 52% / 45% 46% 54% 55%;
    transition: 1s linear .2s;
  }
  .commitInput{
    overflow: hidden;
  }
  .manyi{
    background: #a8ff78;
  }
  .bumanyi{
    background: red;
  }
  .right{
     border-radius: 100% 0% 100% 0% / 100% 0% 100% 0% !important;
  }
  .left{
     border-radius: 0% 100% 0% 100% / 5% 100% 0% 95% !important;
  }
  .rigthEye,.leftEye{
    position: absolute;
    width: 50px;
    height: 20px;
    border-radius: 44% 56% 54% 46% / 49% 53% 47% 51% ;
    left: 120px;
    top: 20px;
  }
  .leftEye{
    border-radius: 57% 43% 45% 55% / 49% 53% 47% 51% ;
    left:20px
  }
  .inputBox{
    width: 120px;
    position: absolute;
    left: 40px;
    top: 10px;
    height: 90px;
    border: none;
    outline: none;
    background: transparent;
    color: black;
  }
}
.commitButton{
  margin-left: 50px;
  margin-top: 20px;
}
.exhibitInfo {
  width: 55%;
  justify-content: space-between;
  .tabBox {
    width: 100%;
    height: 80px;
    line-height: 80px;
    display: flex;
    justify-content: space-around;
    position: relative;
    overflow: hidden;
    .exhibitBox:hover {
      animation: anima_jelly 2s linear infinite 0.5s;
    }
    .discriptionBox:hover {
      animation: anima_jelly 2s linear infinite 0.5s;
    }
    //添加一个类名(点击的时候触发)
    .actived {
      background: linear-gradient(to right, #a8ff78, #78ffd6) !important;
    }
    .discriptionBox,
    .exhibitBox {
      width: 35%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      padding: 0px 20px;
      background: linear-gradient(to right, #d3cce3, #e9e4f0);
      color: #2193b0;
      border-radius: 20px;
      cursor: pointer;
      box-shadow: 24px 12px 20px 7px rgba(0, 0, 0, 0.1);
    }
  }
}
.demo-collapse {
  margin-top: 30px;
  .title {
    width: 100%;
    height: 400px;
    padding: 20px;
    line-height: 20px;
    margin-top: 20px;
    border-radius: 12px;
    color: #ccc;
  }
  .myDiscrep{
    margin-top: 40px;
    text-indent: 20px;
    height: 80px;
    margin-bottom: 20px;
    p{
      line-height: 28px;
      height: 28px;
      color: #d7d2cc;
    }

  }
}
.authroImg {
  width: 400px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  margin-top: 20px;
  border-radius: 50%;
  padding: 10px;
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    padding: 5px;
    border: 1px solid #d3cce3;
  }
  .info{
    display: flex;
    height: 200px;
    flex-direction: column;
    justify-content: center;
    margin-top: 30px;
    p{
      color: #ccc;
      flex-grow: 1;
    }
    span{
      color: #d3cce3;
    }
  }
}
:deep(.el-collapse-item__header) {
  height: 60px;
  font-size: 18px;
  background: linear-gradient(to bottom, #70e1f5, #ffd194);
  border-radius: 12px;
  color: #000c40;
  margin-bottom: 10px;
  &:hover {
    animation: focus-in-expand-fwd 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
  }
}
// 定义动画
@keyframes shadow-drop-center {
  0% {
    box-shadow: 0 0 0 0 transparent;
  }
  100% {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.35);
  }
}

// 点击动画
@keyframes focus-in-expand-fwd {
  0% {
    letter-spacing: -0.5em;
    -webkit-transform: translateZ(-800px);
    transform: translateZ(-800px);
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}
//推出的动画
@-webkit-keyframes blur-out-expand-fwd {
  0% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-filter: blur(0.01);
    filter: blur(0.01);
  }
  100% {
    letter-spacing: 1em;
    -webkit-transform: translateZ(300px);
    transform: translateZ(300px);
    -webkit-filter: blur(12px) opacity(0%);
    filter: blur(12px) opacity(0%);
  }
}
@keyframes blur-out-expand-fwd {
  0% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-filter: blur(0.01);
    filter: blur(0.01);
  }
  100% {
    letter-spacing: 1em;
    -webkit-transform: translateZ(300px);
    transform: translateZ(300px);
    -webkit-filter: blur(12px) opacity(0%);
    filter: blur(12px) opacity(0%);
  }
}
</style>