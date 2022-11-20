<template>
  <div class="addStudent">
    <!-- 添加学生信息的抽屉 -->
    <el-drawer
      v-model="addDrawer"
      title="添加学生信息"
      direction="ttb"
      :before-close="handleClose"
    >
      <el-form :model="studentInfo" :rules="formRules" ref="formRef">
       <div class="form-item">
        <screenStudent @reqStudentArr = "getCouseOption"></screenStudent>
       </div>
        <div class="form-item">
          <el-form-item label="学员姓名" prop="studentName">
            <el-input v-model="studentInfo.studentName"></el-input>
          </el-form-item>
          <el-form-item label="学员年龄" prop="sage">
            <el-input-number v-model="studentInfo.sage" :min="1" :max="100" />
          </el-form-item>
          <el-form-item label="电话号码" prop="telephone">
            <el-input v-model="studentInfo.telephone"></el-input>
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item label="性别" prop="studentSex">
            <el-radio-group v-model="studentInfo.studentSex">
              <el-radio label="男" size="large">男</el-radio>
              <el-radio label="女" size="large">女</el-radio>
              <el-radio label="" size="large">未知</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="qq号" prop="QQnumber">
            <el-input v-model="studentInfo.QQnumber"></el-input>
          </el-form-item>
          <el-form-item label="wx" prop="weChat">
            <el-input v-model="studentInfo.weChat"></el-input>
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item label="学历" prop="studentGrade">
            <el-cascader
              v-model="studentInfo.studentGrade"
              :options="studentGradeArr"
              :props="props"
            />
          </el-form-item>
          <el-form-item label="地址" prop="studentAddress">
            <el-cascader
              v-model="studentInfo.studentAddress"
              :options="provinceArr"
              :props="props"
            />
          </el-form-item>
          <el-form-item label="身份证号" prop="crad">
            <el-input v-model="studentInfo.crad"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="submitForm()" plain
          >添加学生</el-button
        >
        <el-button type="primary" @click="handleClose()" plain
          >取消添加</el-button
        >
      </template>
    </el-drawer>
  </div>
</template>
<script setup>
import { ref, defineExpose, reactive,defineProps, onMounted,defineEmits } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
//导入筛选学生信息组件
import screenStudent from "./screenStudent.vue"
//导入学历的数组
import studentGradeArr from "@/assets/js/graduate";
//导入城市的数组
import provinceArr from "@/assets/js/province";
//导入请求添加学生信息的方法
import addStudentFn from "@/reqApi/reqStudent/reqAddStudent";
import {useStore} from "vuex"
const addDrawer = ref(false);
const emits = defineEmits(["addReqStundentFn"]);
const store = useStore();
const studentInfo = ref({
  telephone: "",
  sage: 0,
  studentName: "",
  studentSex: "",
  studentAddress: [],
  QQnumber: "",
  weChat: "",
  studentGrade: [],
  crad: "",
});
const courseOption = ref({
})

const props = ref({ expandTrigger: "hover" });
const formRef = ref({});
//自定义表单规则
const formRules = reactive({
  studentName: [
    { required: true, message: "姓名是必填项", trigger: "blur" },
    { max: 5, message: "姓名不能超过5位", trigger: "blur" },
  ],
  sage: [
    {
      type: "number",
      message: "年龄必须是整数",
      trigger: "blur",
    },
  ],
  telephone: [
    {
      required: true,
      message: "电话号码是必填项",
      trigger: "blur",
    },
    {
      message: "电话号码必须是11位",
      pattern: /^\d{11}$/,
      trigger: "blur",
    },
  ],
  studentSex: [],
  studentAddress: [],
  weChat: [],
  studentGrade: [],
  crad: [],
  QQnumber: [],
});

//定义一个打开抽屉的函数，供外面使用
const openDrawer = () => {
  addDrawer.value = true;
};
//定义一个关闭抽屉的函数
const closeDrawer = (cb) => {
  addDrawer.value = false;
  //如果传入了cb就执行，没有就不执行
  studentInfo.value = ref({});
  cb && cb();
};

// handleClose 关闭抽屉之前的函数
const handleClose = () => {
  ElMessageBox.confirm("当前的内容还未添加完成,确定退出吗?")
    .then(() => {
      closeDrawer();
    })
    .catch(() => {
      // catch error
      closeDrawer(() => {
        ElMessage.success("取消添加成功");
      });
    });
};

//向后端发起请求
const submitForm =()=>{
  formRef.value.validate().then(async (res)=>{
    console.log(res);
    //只有进入这里面才表示表单效验成功
    if(res && isSubmit()){
      //发起请求
      //获取当前的用户
      const updataName = store.state.userInfo.userInfo.username;
      const {data} = await addStudentFn({
        studentInfo:studentInfo.value,
        updataPeople:updataName,
        courseOption:courseOption.value
      });
      if(data.status == 400){
        //代表成功
        ElMessage.success(data.msg);
         emits("addReqStundentFn",null);
        closeDrawer();
        //关闭盒子（同时发起请求）
      }else{
        //失败
        ElMessage.warning(data.msg);
      }
    }
  }).catch(err=>{
    if(err){
      //有错误就提示
      ElMessage.warning('缺少必填项');
    }
  })
 
}
//配置课程选项
const getCouseOption = (res)=>{
  courseOption.value = res;
}
//课程分类以及课程名称，班期名称都是必填项，缺一个都不行
const isSubmit = ()=>{
  let courseName = courseOption.value.courseName;
  let className = courseOption.value.className;
  let courseKind = courseOption.value.coursekind;
  if(!courseName || !className || !courseKind){
    //三个当中有一个没有
    return false;
  }
  return true;
}
//向外界导出
defineExpose({
  openDrawer,
});
</script>
<style lang="scss" scoped>
:deep(.el-select){
  width: 258px;
  margin-bottom: 20px;
}
:deep(.el-drawer) {
  height: 50% !important;
  width: 89%;
  left: auto;
  .form-item {
    display: flex;
    width: 70%;
    justify-content: space-around !important;
    align-items: center;
    .el-form-item {
      width: 258px;
    }
  }
}
</style>