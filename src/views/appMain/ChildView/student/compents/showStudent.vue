// 编辑学生信息组件
<template>
  <div class="showstudent">
    <el-drawer
      @open="openDrawer()"
      title="学生信息"
      v-model="drawer"
      size="60%"
      direction="rtl"
      :before-close="handleClose"
    >
      <!-- 控制当前是显示学生信息界面还是修改学生信息界面 -->
      <div class="table">
        <span :class="{ actived: showTable }" @click="showStudentInfo()"
          >查看学生信息 </span
        >/
        <span :class="{ actived: !showTable }" @click="showEidtStudentInfo()"
          >修改学生</span
        >
      </div>
      <div class="studentInfoShow" v-show="showTable">
        <el-row :gutter="20">
          <el-col :span="8"
            ><div><span>姓名:</span>{{ studentInfo.studentName }}</div>
          </el-col>
          <el-col :span="8"
            ><div><span>年龄:</span>{{ studentInfo.sage }}</div>
          </el-col>
          <el-col :span="8"
            ><div><span>电话号码</span>{{ studentInfo.telephone }}</div></el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8"
            ><div><span>性别:</span>{{ studentInfo.studentSex }}</div>
          </el-col>
          <el-col :span="8"
            ><div><span>qq号:</span>{{ studentInfo.QQnumber }}</div>
          </el-col>
          <el-col :span="8"
            ><div><span>微信号:</span>{{ studentInfo.weChat }}</div></el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8"
            ><div><span>学历:</span>{{ studentInfo.studentGrade }}</div>
          </el-col>
          <el-col :span="8"
            ><div><span>地址:</span>{{ studentInfo.studentAddress }}</div>
          </el-col>
          <el-col :span="8"
            ><div><span>身份证号:</span>{{ studentInfo.crad }}</div></el-col
          >
        </el-row>
      </div>
      <editEidtStudent
        ref="editStudentRef"
        :studentInfo="studentInfo"
        v-show="!showTable"
        :showTable="showTable"
      ></editEidtStudent>
      <div class="demo-drawer__footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button
          type="primary"
          @click="submitStudentInfo()"
          :loading="loading"
          >{{ loading ? "提交中 ..." : "确 定" }}</el-button
        >
      </div>
    </el-drawer>
  </div>
</template>
<script setup>
import { ElMessageBox, ElMessage } from "element-plus";
import { ref, defineExpose, watch ,defineProps} from "vue";

//导入学生编辑组件
import editEidtStudent from "./editStudent.vue";
//导入请求修改学生信息的函数
import reqUpdataStuMes from "@/reqApi/reqStudent/reqUpdataStuMes";
import { async } from "@kangc/v-md-editor";

const props = defineProps(["reqStudentArrFn"])
//定义一个控制抽屉打开的变量
const drawer = ref(false);
//定义一个加载的变量
const loading = ref(false);
//学生信息
const studentInfo = ref({});
//控制显示的tab（默认显示学生信息页）
const showTable = ref(true);
//编辑学生信息的ref
const editStudentRef = ref({});
//定义一个改变drawer的函数给父组件使用
const changeDrawer = (info) => {
  drawer.value = true;
  studentInfo.value = info;
};
defineExpose({
  changeDrawer,
});

//打开抽屉的时候会调用的函数
const openDrawer = () => {
  //默认回到显示学生信息的界面
  showTable.value = true;
};
//关闭抽屉的时候会调用的函数
const handleClose = () => {
  //message弹框
  // 第一个参数是弹框的主要信息，第二个参数是标题，第三个参数是一个options配置
  ElMessageBox.confirm("当前操作还未提交，确认关闭吗", "提示", {
    //确定按钮的文字信息
    confirmButtonText: "确认",
    //取消按钮的文字信息
    cancelButtonText: "取消",
    type: "info",
  })
    .then(() => {
      //确定执行的回调
      colseDrawer();
      //取消执行的回调
    })
    .catch(() => {
      ElMessage.success("取消成功");
    });
};
//定义一个关闭的方法
const colseDrawer = () => {
  drawer.value = false;
  showTable.value = true;
  //清空数据
  studentInfo.value = {};
  ElMessage.success("关闭成功");
};
//点击取消按妞的函数
const cancelForm = () => {
  colseDrawer();
};
//显示学生信息界面
const showStudentInfo = () => {
  if (showTable.value == false) {
    //说明是从显示学生信息到修改学生信息的
    ElMessageBox.confirm("当前操作还未保存，确认关闭吗", "提示", {
      //确定按钮的文字信息
      confirmButtonText: "确认",
      //取消按钮的文字信息
      cancelButtonText: "取消",
      type: "info",
    })
      .then(() => {
        //确定执行的回调
        showTable.value = true;
        //重置学生信息
        //当学生信息改变时才需要
        if (editStudentRef.value.changeStudent) {
          editStudentRef.value.cloneStudent();
        }
      })
      .catch(() => {
        showTable.value = false;
      });
  }
};
//显示编辑学生信息界面
const showEidtStudentInfo = () => {
  showTable.value = false;
};
//点击确定的函数
const submitStudentInfo = async () => {
  //向后端发起请求
  if(!regex()){
    ElMessageBox.warning("姓名是必填项");
    return
  }
  const res = await reqUpdataStuMes(editStudentRef.value.clonStudentInfo);
  if (res.data.status == 400) {
    //修改成功
    ElMessage.success(res.data.msg);
    loading.value = true;
    setTimeout(() => {
      props.reqStudentArrFn();
      loading.value = false;
      drawer.value = false;
    }, 1000);
  }else{
    ElMessage.warning(res.data.msg);
  }
  console.log(res);
};

//进行一些简单的校验
const regex = ()=>{
  //获取修改后的学生信息
  const studentInfo = editStudentRef.value.clonStudentInfo;
  if(studentInfo.studentName != ""){
    return true;
  }else{
    return false;
  }
}
</script>
<style lang="scss" scoped>
.table {
  span {
    margin-right: 5px;
    color: #8e9eab;
    cursor: pointer;
  }
  .actived {
    color: #12c2e9;
  }
}
:deep(.el-drawer__body) {
  color: #8e9eab;
  line-height: 40px;
  height: 40px;
  font-size: 14px;
  padding: 30px;
  span {
    margin-right: 10px;
  }
  .demo-drawer__footer {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>