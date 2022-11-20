<template>
  <div class="courseAdd">
    <el-card class="topContent">
      <h4>添加课程</h4>
    </el-card>
    <el-card class="formContent">
      <el-form ref="formRef" :model="courseMessage" label-width="120px" :rules="courseFormRules">
        <el-form-item label="课程名称" prop="courseName">
          <el-input
            class="courseName"
            v-model="courseMessage.courseName"
          />
        </el-form-item>
        <el-form-item label="Activity zone" prop="courseKind"> 
          <el-select
            v-model="courseMessage.courseKind"
            placeholder="请选择课程类别"
            :filterable="isInput" 
            :allow-create="isInput"
          >
            <el-option v-for="item in couresArr" :key="item" :label="item" :value="item"></el-option>
            <el-option @click="inputKind" label="更多选项" value="更多选项" />
          </el-select>
        </el-form-item>
        <el-form-item label="课程数量" prop="courseNumber">
          <el-input-number
            v-model="courseMessage.courseNumber"
            :min="1"
            :max="24"
            controls-position="right"
          />
        </el-form-item>
        <div class="lineBox">
          <el-form-item label="课程原价" prop="courseOrginPrice">
            <el-input v-model.number="courseMessage.courseOrginPrice" />
          </el-form-item>
          <el-form-item label="课程售价" prop="couseSale">
            <el-input v-model.number="courseMessage.couseSale" />
          </el-form-item>
          <el-form-item label="课程最低价" prop="courseLowPrice">
            <el-input v-model.number="courseMessage.courseLowPrice" />
          </el-form-item>
        </div>
        <el-form-item label="是否售卖">
          <el-switch
            v-model="courseMessage.couseIsSale"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
          />
        </el-form-item>
        <el-form-item label="课程描述" prop="courseDistcription">
          <el-input
            v-model="courseMessage.courseDistcription"
            :rows="3"
            type="textarea"
            placeholder="请输入课程的描述信息"
          />
        </el-form-item>
        <el-form-item label="课程班期" prop="courseClass">
          <el-input
            class="courseClass"
            v-model="courseMessage.courseClass"
          />
        </el-form-item>
            <el-form-item class="fileItem" label="封面图片" prop="courseCover">
              <div>
                <input type="file" @change="upload()" ref="fileRef">
                <input type="button" @click="buttonUpload()" class="fileButton" value="上传文件">
              </div>
                <div class="imgBox" v-loading="loading">
                   <el-empty v-if="!fileImgSrc" :image-size="150" />
                  <img v-else :src="fileImgSrc" alt="">
                </div>
                <span class="advice"
                  >建议:
                  课程封面大小建议上传1125*633,格式为.jpg,.png,.webq</span
                >
            </el-form-item>
           <el-form-item>
      <el-button type="primary" @click="submitForm()"
        >添加课程</el-button
      >
      <el-button @click="resetForm()">重置表单</el-button>
    </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from "vue";
import {ElMessage} from "element-plus"
import reqcouserAdd from "@/reqApi/reqCourse/reqCourseAdd"
import reqCourseKind from "@/reqApi/reqStudent/reqCouresArr"
import { async } from "@kangc/v-md-editor";

const courseMessage = ref({
  //课程名称
  courseName: "",
  //课程类别
  courseKind: "",
  //课程班期
  courseClass: [],
  //课程数量
  courseNumber: 0,
  //课程封面
  courseCover: "",
  //课程描述
  courseDistcription: "",
  //课程原价
  courseOrginPrice: "",
  //最低价
  courseLowPrice: "",
  //售卖价
  couseSale: "",
  //是否售卖
  couseIsSale:true
});
const couresArr = ref([])
//请求课程类别
const courseKindArrFn =async ()=>{
  const res = await reqCourseKind();
  couresArr.value = res.courseObj.coursekind;
}
courseKindArrFn()
//表单规则
const courseFormRules = ref({
    courseName: [
    {
      required: true,
      message: "课程名为必填项",
      trigger: "blur",
    },
  ],
  //课程类别
  courseKind: [
    {
      required: true,
      message: "课程类别为必填项",
      trigger: "blur",
    },
  ],
  //课程班期
  courseClass: [
    {
      required: true,
      message: "课程班期为必填项",
      trigger: "blur",
    },
  ],
  //课程数量
  courseNumber: [
    {
      required: true,
      message: "课程数量为必填项",
      trigger: "blur",
    },
    {
      type:"number",
      message:"课程数量必须是数字类型",
    }
  ],
  //课程描述
  courseDistcription:  [
    {
      required: true,
      message: "课程描述为必填项",
      trigger: "blur",
    },
  ],
  //课程原价
  courseOrginPrice:  [
    {
      required: true,
      message: "课程原价为必填项",
      trigger: "blur",
    },
    {
      type:"number",
      message:"课程数量必须是数字类型",
    }
  ],
  //最低价
  courseLowPrice:  [
    {
      required: true,
      message: "课程最低价为必填项",
      trigger: "blur",
    },
     {
      type:"number",
      message:"课程数量必须是数字类型",
    }
  ],
  //售卖价
  couseSale: [
    {
      required: true,
      message: "课程售价为必填项",
      trigger: "blur",
    },
     {
      type:"number",
      message:"课程数量必须是数字类型",
    }
  ],
  //是否售卖
  couseIsSale:true
})
//课程封面
const fileRef = ref({});

const fileList = ref([]);
//是否输入
const isInput = ref(false);

//接收文件信息
const fileValue = ref({})

const getCourseEdit = ()=>{
  console.log('upload')
}
//表单对象
const formRef = ref({});

//文件图片路径
const fileImgSrc = ref('');

//默认不加载
const loading = ref(false);
const upload = function(){
  //加载
  loading.value = true;
  const file = fileRef.value.files[0];
  if(!file){
    //没传，重新变为空
    fileImgSrc.value = "";
    loading.value = false;
    return
  }
  fileValue.value = file
  const fileReader = new FileReader();
  fileReader.onload = (temp)=>{
      setTimeout(()=>{
        fileImgSrc.value = temp.target.result;
        loading.value = false;
      },800)
  } 
  fileReader.readAsDataURL(file);
}
//引用file里面的upload方法
const buttonUpload = ()=>{
  fileRef.value.click()
}
const resetForm = ()=>{
  //清空
   if(!formRef.value) return;
   //对图片也清空
   fileImgSrc.value = "";
    formRef.value.resetFields()
}
//提交表单
const submitForm = async ()=>{
   if(!formRef.value) return;
 await formRef.value.validate(async (valid,fields)=>{
    //第一个参数为验证的结果，第二个为验证的规则
    if(valid){
      //向后端提交数据

      //生成formdata对象
      let formdata = new FormData();
      //添加数据
      //课程的基本信息
      formdata.append("courseMessage",JSON.stringify({...courseMessage.value}));
      //课程的封面
      formdata.append('filed',fileValue.value);

      //发送请求
      let res = await reqcouserAdd(formdata);
      if(res.data.status == 200){
        //代表成功了
        ElMessage.success(res.data.msg);
        resetForm();
      }else{
        //失败了
        ElMessage.error(res.data.msg);
      }
      console.log(res);
    }else{
      ElMessage.error("提交失败,可能缺少必填项");
    }
  })
}
const inputKind = ()=>{
  //允许输入
  isInput.value = true;
  //清空input里的值
  courseMessage.value.courseKind = "";
}
</script>
<style lang="scss" scoped>
:deep(.fileItem){
    .el-form-item__content{
      display: block;
    }
  }
.formContent {
  margin-top: 20px;
  .courseName {
    width: 320px;
  }
  .advice{
    margin-left: -20px;
  }
  input{
    display: none;
  }
  .fileButton{
    display: block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    border: none;
    border-radius: 5px;
    background: #2980b9;
    color: white;
    cursor: pointer;
  }
  .imgBox{
    display: flex;
    justify-content: space-around;
    width: 300px;
    height: 300px;
    border:1px solid #ccc;
    padding: 20px;
    margin-top: 10px;
    img{
      width: 100%;
    }
}
  .courseClass{
    width: 200px;
  }
}
.lineBox {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
:deep(.el-textarea__inner) {
  width: 220px;
}

</style>