<template>
  <div class="leftContain">
    <search></search>
    <guide></guide>
    <fullContain></fullContain>
    <div class="userIMg">
      <!-- <img :src="imgSrc" alt=""> -->
      <div v-if="redCirlceShow" class="redCirlce"></div>
      <el-dropdown trigger="click">
        <el-avatar :src="imgSrc" class="userIcon" shape="square" />
        <!-- 生成消息的小红点 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="routerLink.routerHome"
              >返回首页</el-dropdown-item
            >
            <el-dropdown-item @click="openMessageBox()" divided>
              <el-icon><Message /></el-icon>消息
              <div v-if="redCirlceShow" class="redCirlce message"></div>
            </el-dropdown-item>
            <el-dropdown-item divided @click="routerLink.routerLogin"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- 消息弹窗 -->
  <el-dialog custom-class="MessageBox" v-model="dialogVisible" title="消息列表" :top="'100px'" width="600px">
    <ul v-if="redCirlceShow" class="messageList">
      <li v-for="(item,index) in messageList.result" :key="index">
        <div class="content">
        <span class="messageTitle"> 发起人:{{item.requestName}}</span>
        <p>{{returnMesageContent(item)}}</p>
       </div>
       <div class="opter">
          <el-button @click="deleteInfo(item._id)">删除</el-button>
          <el-button @click="deleteStudent(item)">确认执行</el-button>
        </div>
      </li>
    </ul>
    <div v-else class="defalut">当前没有用户给你发送数据</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>
<script setup>
import fullContain from "./AllScreen.vue";
import search from "./search.vue";
import guide from "./guide.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import servers from "@/axios/server";
import { Message } from "@element-plus/icons-vue";
import {rootDeletStudent} from "@/reqApi/reqStudent/reqDeleteStudent"
import {deleteMessage} from "@/reqApi/reqMessage"
import {getLocalStorage} from "@/Storage/index"
import {reqShowMessage} from "@/reqApi/reqMessage"
import { async } from "@kangc/v-md-editor";
import { ElMessage } from "element-plus";

const store = useStore();
const router = useRouter();
const dialogVisible = ref(false);
//接受消息的列表
const messageList = ref({
  result:[]
});
//定义一个变量监听变化，来达到响应的目的
const isExit = ref(false);
//消息的内容
const returnMesageContent = (messageObj)=>{
  //删除学生的信息
  let deleteMessage = "";
  messageObj.StudentName.forEach((element,index) => {
    //需要获取每一个需要删除学生的姓名
      const delelteName = element;
    if(index == messageObj.StudentName.length -1){
        deleteMessage = element+deleteMessage;
    }else{
      deleteMessage = deleteMessage+element+",";
    }
  });
    if(messageObj.messageType == "delete"){
      deleteMessage = "当前用户请求删除"+deleteMessage
    }else{
      deleteMessage = messageObj.contentText 
    }
    return deleteMessage;
}
const routerLink = { 
  routerHome() {
    router.push("/");
  },
  routerLogin() {
    store.dispatch("userInfo/exitLoginFn");
    // isExit.value = true;
    // router.push('/login')
  },
};
watch(store.state.isExit,(newValue)=>{
  reqShowMessageFn();
  console.log('1111');
})

//定义一个发起请求的方法
const reqShowMessageFn =async ()=>{
  if(!store.state.userInfo.userInfo.username){
    return;
  }
   const userName = store.state.userInfo.userInfo.username;
    const res = await reqShowMessage(userName);
    messageList.value.result = res.data.result || [];
}
onMounted(()=>{
  reqShowMessageFn();
})
//管理员删除学生的方法
const deleteStudent =async (item)=>{
  //获取当前管理员的用户名
  let username = store.state.userInfo.userInfo.username;
  //获取学员的学员的电话数组
  let telephone = item.telephoneArr;
  //获取当前消息的id
  let id = item._id;
  let res = await rootDeletStudent({
    username,
    telephone
  });
  if(res.data.status == 400){
   deleteInfo(id);
    // store.dispatch("userInfo/requestMessage");
   
  }else{
    ElMessage.success("删除失败");
  }
}


//删除消息的方法
const deleteInfo =async (id)=>{
  //向后端请求删除
 await deleteMessage(id);
  //请求显示数据
  reqShowMessageFn();
}
//小圆点是否展示
const redCirlceShow = computed(() => {
    if(messageList.value.result.length == 0){
      //代表没有数据
      return false;
    }else{
      return true;
    }
});
const imgSrc = computed(() => store.getters.userImgSrc);

const openMessageBox = ()=>{
  //打开消息弹窗
  dialogVisible.value = true;
}
</script>
<style lang="scss" scoped>
:deep(.MessageBox){
  height: 300px !important;
  overflow: auto;
  .messageList{
    margin-top: -50px;
     .opter{
      display: flex;
      margin-top: 5px;
    }
    li{
      margin-bottom: 10px;
    }
  .content{
    height: 50px;
    display: flex;
    flex-direction: column;
    margin-right: 0;
    justify-content: space-around;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    p{
      color: #ccc;
      line-height: 20px;
      font-size:12px;
      text-indent: 10px;
    }
    .messageTitle{
      color: #12c2e9;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      margin-top: -10px;
    }
  }
  }
}

.redCirlce {
  z-index: 9;
  width: 14px;
  height: 14px;
  top: -7px;
  left: -7px;
  background: red;
  border-radius: 50%;
  position: absolute;
}
.message {
  position: unset;
  margin-left: 2px;
}

.leftContain {
  display: flex;
  // width: 400px;
  justify-content: space-around;
  height: 100%;
  position: relative;
  top: -70px;
  float: right;
  align-content: center;
  line-height: 70px;
  div {
    margin-right: 20px;
  }
  .userIMg {
    margin-top: 13px;
    position: relative;
    .userIcon {
      cursor: pointer;
    }
  }
}
</style>