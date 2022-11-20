<template>
  <div class="StudentImport">
    <el-card class="topContent"> 学员管理 </el-card>
    <el-card class="tabContent">
      <div class="upload">
        <div class="title" @click="openContent()">
          <span class="jiantou" :class="{ redeg: !isOpen }"></span>导入说明
        </div>
        <div class="content" :style="ContentHeight">
          <ul>
            <li>1.导入前请先下载对应的文件,严格按照模板的规则进行数据输入</li>
            <li>2.只支持excel文件,文件大小要求在2M以内</li>
            <li>3.在本页导入学员,学员会进去学员管理模块</li>
          </ul>
        </div>
      </div>
      <div class="uploadButton">
        <a href="http://localhost:6002/import/download">下载模板</a>
         <el-input disabled v-model="fileName" placeholder="请选择文件" />
        <el-upload
          style="position:relative"
          v-model="fileList"
          class="upload-demo"
          :limit="3"
          accept=".xlsx,xls,lx"
          :on-change="selectFile"
          :auto-upload="false"
          :show-file-list="false"
        >
        <el-button v-if="!isUpload" type="primary">上传文件</el-button>
        <el-button v-else @click.stop="reqUploadFile()" type="primary">点击上传</el-button>
        <div class="deleteIcon anima_jelly" @click.stop="deleteFile()">
          <el-icon><DeleteFilled /></el-icon>
        </div>
        </el-upload>
      </div>
      <showImport ref="showImportRef"></showImport>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from "vue";
import serves from "@/axios/server"
import showImport from "./importCompents/showImprot.vue"
import {DeleteFilled} from "@element-plus/icons-vue"
import requploadExcel from "@/reqApi/reqImport/requploadExcel"
import { async } from "@kangc/v-md-editor";
import { ElMessage } from "element-plus";
 
const ContentHeight = ref({
  height: 150 + "px",
});
const isOpen = ref(true);
const fileName = ref("");
const fileList = ref({});
const showImportRef= ref({});
//定义一个变量表示当前是上传文件还是向后端发起请求
const isUpload = ref(false);
const openContent = () => {
  if (isOpen.value) {
    ContentHeight.value.height = 0 + "px";
  } else {
    ContentHeight.value.height = 150 + "px";
  }
  isOpen.value = !isOpen.value;
};


//选择文件触发的函数
const selectFile = (uploadFile)=>{
  isUpload.value = true;
  fileName.value = uploadFile.name;
  fileList.value = uploadFile.raw;
  console.log(uploadFile);
}

//清空文件
const deleteFile = ()=>{
  fileName.value = "";
  fileList.value = {};
  isUpload.value = false;
}
//向后端发起请求
const reqUploadFile =async ()=>{
    const formData = new FormData();
    console.log(fileList.value);
    formData.append("file",fileList.value);
    const res = await requploadExcel(formData);
    if(res.data.status == 400){
      ElMessage.success(res.data.title);
      showImportRef.value.reqImportFn();
      deleteFile();
    }else{
      ElMessage.error("导入学员失败");
    }
    
}
</script>
<style lang="scss" scoped>
.tabContent {
  padding: 20px;
}
a{
  width: 80px;
  height: 40px;
  line-height: 40px;
  background: #409eff;
  border: 1px solid #ccc;
  font-size: 14px;
  color: white;
  text-align: center;
  border-radius: 10px;
}
.upload {
  background: #0082c8;
  border-radius: 5px;
}
.title {
  padding: 0px 20px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #e9e4f0;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  cursor: pointer;
  .jiantou {
    width: 10px;
    display: inline-block;
    height: 10px;
    background: transparent;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    transform-origin: center center;
    transform: rotateZ(45deg);
    transition: 0.2s linear;
    margin-right: 10px;
  }
  .redeg {
    transform: rotateZ(-45deg);
  }
}
.content {
  padding: 0px 20px;
  overflow: hidden;
  transition: 0.5s linear;
  ul {
    transform: translateY(20px);
    color: black;
    font-size: 12px;
    li {
      height: 30px;
      line-height: 30px;
      margin-bottom: 10px;
    }
  }
}
.uploadButton{
  margin-top: 20px;
  display: flex;
  align-items: center;
  :deep(.el-input){
    width: 260px;
    margin-left: 40px;
  }
}
.deleteIcon{
  position: absolute;
  left: -30px;
}
</style>