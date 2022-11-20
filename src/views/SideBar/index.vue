<template>
  <div class="SideBar" id="six-meau" :class="{ hideWidth }">
    <!-- 用来展示用户头像和二级菜单项，普通菜单项 -->
    <div class="userImg">
      <!-- 借助elementUi优化一下 -->
      <el-avatar :src="userImgSrc" @click="selectUserImg" />
      <span class="userTitle">vue3-project</span>
    </div>
    <div class="meau">
      <two-menu></two-menu>
    </div>
  </div>
  <!-- 用户选择头像 -->
  <el-dialog v-model="isSelect" @open="showUserImg = userImgSrc" width="20%" title="更换头像"
   :before-close = "close"
   :close-on-click-modal="false">
    <el-upload
      :file-list = "fileUserImg"
      :show-file-list="false"
      ref="fileRef"
      :auto-upload="false"
      action=""
      accept=".jpg,.png,.webq"
      :http-request="successUpload"
    >
      <el-button class="uploadUserImg">上传本地图片</el-button>
    </el-upload>
    <div class="imgBox">
      <img :src="showUserImg" alt="用户头像">
    </div>
    <template #footer>
      <el-button @click="upload" type="primary">确定</el-button>
        <el-button @click="close" type="primary">取消</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
//获取state里面存储的用户头像信息
import { computed, ref , onMounted } from "vue";
import { useStore } from "vuex";
import server from "@/axios/server"
//导入菜单项和二级菜单项
import twoMenu from "./twoMenu.vue";
import menuItem from "./menuItem.vue";
import { async } from "@kangc/v-md-editor";
import { ElMessage } from "element-plus";
import {setLocalStorage} from "@/Storage"
//生成store对象
const store = useStore();
//控制是否更换头像的变量
const isSelect = ref(false);
//用户头像的文件信息
const fileUserImg = ref([]);
const fileRef = ref(null);
//利用compute使数据保持响应式
const userImgSrc = computed(() => store.getters.userImgSrc);
const showUserImg = ref(null);
const hideWidth = computed(() => !store.getters.getterIsOpend.status);

//点击头像弹出头像放大和头像的切换功能

const selectUserImg = () => {
  isSelect.value = true;
};

//关闭弹窗的回调
const close = ()=>{
  isSelect.value = false
  fileUserImg.value = [];
}

//图片上传成功执行的函数
const successUpload =async ({file})=>{
  //向后端发起请求
  const formData = new FormData();
  console.log(file);
  //通过用户名查找数据库
  const userName = store.state.userInfo.userInfo.username;
  console.log(userName);
  formData.append("file",file);
  formData.append("userName",userName)
 let {data} = await server.post('/profile/uploadUserImg',formData);
 if(data.status == "400"){
  ElMessage.success(data.msg);
  close();
  store.state.userInfo.userInfo.userImg = data.userImgSrc;
  //修改本地存储的值
  setLocalStorage("__userInfo__",{username: "xh123", userImg: data.userImgSrc, admin: true})
 }else{
  ElMessage.warning(data.msg);
 }
} 

const upload = ()=>{
    fileRef.value.submit();
}
</script>
<style lang="scss" scoped>
.SideBar {
  position: fixed;
  width: $sideBarWidth;
  height: 100%;
  background: #304156;
  color: #ffff;
  transition: $sideBarDuration;
  .userImg {
    display: flex;
    justify-content: space-evenly;
    width: 80%;
    text-align: center;
    margin-top: 20px;
    align-items: center;
  }
}
:deep(.el-avatar) {
  border: 2px solid white;
  &:hover{
    border-color: skyblue;
  }
  img {
    cursor: pointer;
  }
}
.uploadUserImg{
  transform: translateY(-10px);
}
.imgBox{
  position: relative;
  width: 250px;
  height: 250px;
   &::before{
    content: " ";
    display: inline-block;
    width: 90%;
    height:90%;
    border-radius: 50%;
    background: black;
    opacity: .5;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  img{
    width: 100%;
    height: 100%;
  }
}
.hideWidth {
  width: $hideSideBarWidth;
  .userTitle {
    display: none;
  }
}
</style>