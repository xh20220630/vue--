<template>
  <div class="StudentManage">
    <el-card class="topContent">
      <h4>学员管理</h4>
    </el-card>
    <!-- 选择器区域 -->
    <el-card>
      <div class="findContent">
        <screenStudent ref="screenStudentRef" @reqStudentArr = "reqStudentArrFn" :studentOptions = "studentOptions"></screenStudent>
        <div class="opter">
          <el-dropdown>
           <el-icon
            class="anima_jelly"
            style="color: #ccc; cursor: pointer"
            :size="30"
            @click="deleteStudent()"
            ><DeleteFilled
          /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="deleteSpecial()">删除指定学生</el-dropdown-item>
                <el-dropdown-item @click="deleteAll()">选择需要删除的学生</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-icon
            class="anima_jelly"
            style="color: #ccc; cursor: pointer"
            :size="30"
            @click="openAddStudent()"
            ><CirclePlus
          /></el-icon>
        </div>
      </div>
    </el-card>
    <!-- 表格区域 -->
    <div class="tabContent">
      <el-table
        v-loading="loading"
        :data="studentArr"
        style="width: 100%"
        size="large"
        ref="tableRef"
        :max-height="maxHeight.value"
      >
       <el-table-column type="selection" width="55" v-if="isDelete" />
        <el-table-column
          align="center"
          prop="coursekind"
          label="课程类别"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="courseName"
          label="课程名称"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="className"
          label="课程班期"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="telephone"
          label="
        电话号码"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="orgin"
          label="学员来源"
          width="300"
        >
        </el-table-column>
        <el-table-column align="center" label="是否启用" width="300">
          <template v-slot:default="{ row }">
            <el-switch
              @change="trunOn(row)"
              v-model="row.isTurnOn"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="updataPeople"
          label="更新人"
          width="300"
        >
        </el-table-column>
        <el-table-column align="center" label="更新时间" width="300">
          <template v-slot:default="{ row }">
            {{ formatTime(row.updataTime) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300" align="center">
          <template v-slot:default="{ row }">
            <el-button @click="selectClass(row)" type="primary" plain
              >选择班期</el-button
            >
            <el-button @click="openEditStudent(row.studentInfo)" type="primary"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="studentOptions.courpage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="studentOptions.pageNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="studentOptions.total"
      >
      </el-pagination>
    </div>
    <showStudent
      :reqStudentArrFn="reqStudentArrFn"
      ref="showStudentRef"
    ></showStudent>
    <addStudent ref="addStudentRef" @addReqStundentFn = "reqStudentArrFn"  ></addStudent>
    <!-- 对话框 -->
    <el-dialog
      v-model="centerDialogVisible"
      title="选择班期"
      width="30%"
      destroy-on-close
      top="400px"
    >
      <!-- 课程名称 -->
      <div class="couseName">
        {{ dialogContent.courseName }}
      </div>
      <el-select
        v-model="classoption.className"
        :placeholder="dialogContent.className"
        size="large"
      >
        <el-option
          v-for="item in dialogContent.classSelectOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="reqUpdataClass()"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import showStudent from "./compents/showStudent.vue";
//导入添加学生的组件
import addStudent from "./compents/addStudent.vue";
//导入筛选学生的组件
import screenStudent from "./compents/screenStudent.vue";
import { computed, ref ,onActivated,onDeactivated} from "vue";
// 导入请求学生信息额函数
import reqStuManage from "@/reqApi/reqStudent/reqStuManage";
//导入请求课程信息的函数
import reqCouresArr from "@/reqApi/reqStudent/reqCouresArr";
//导入请求改变班期的函数
import updataClass from "@/reqApi/reqStudent/reqUpdataClass";
//导入请求是否启用的函数
import reqUpdataTrun from "@/reqApi/reqStudent/reqInEnable";
//导入请求删除学生信息的函数
import {reqDeleteStudent} from "@/reqApi/reqStudent/reqDeleteStudent"
//导入root用户删除学生信息的函数
import {rootDeletStudent} from "@/reqApi/reqStudent/reqDeleteStudent"
//导入格式化时间的函数
import formatTime from "@/assets/js/formatTime";
//导入自动计算高度的函数
import computedHeight from "@/assets/js/computeHeight";
//导入router对象
import { useRouter } from "vue-router";
import {useStore} from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";
//导入图标
import { DeleteFilled, CirclePlus } from "@element-plus/icons-vue";
import { async } from "@kangc/v-md-editor";
//导入编辑学生信息组件
//创建一个对象接受学生信息请求参数
const studentOptions = ref({
  //课程类别
  coursekind: "",
  //课程名称
  courseName: "",
  //班期名称
  className: "",
  //当前的页码
  courpage: 1,
  //需要返回的码数
  pageNum: 10,
  //全部的页数
  total: 0,
});
// //创建一个接受课程学习的对象
// const couresArr = ref({
//   courseName: [],
//   coursekind: [],
// });
//创建一个对象接受班期信息请求参数
const classoption = ref({
  telephone: "",
  className: "",
});


//创建一个接受学生的数组
const studentArr = ref([]);

//控制班期选项能否使用
const disabled = ref(true);

//控制是否需要加载动画
const loading = ref(true);

//控制对话框是否弹出的变量
const centerDialogVisible = ref(false);

//控制是否删除的变量
const isDelete = ref(false);

//对话框里面的内容
const dialogContent = ref({
  courseName: "",
  classSelectOptions: [],
  className: "",
});
const tableRef = ref({});
const addStudentRef = ref({});
const screenStudentRef = ref({});
//当前页面tab的最大高度
let maxHeight = ref(0);

//创建route对象
const router = useRouter();
const store = useStore();
//调用方法
maxHeight.value = computedHeight(380, onActivated,onDeactivated);

//创建编辑学生的ref
const showStudentRef = ref({});

//打开编辑学生组件的方法
const openEditStudent = (info) => {
  showStudentRef.value.changeDrawer(info);
};

//路由离开的清空数据
onDeactivated(() => {
  studentOptions.value = {
    //课程类别
    coursekind: "",
    //课程名称
    courseName: "",
    //班期名称
    className: "",
    //当前的页码
    courpage: 1,
    //需要返回的码数
    pageNum: 10,
    //全部的页数
    total: 0,
  };
});
//进去之后请求数据
onActivated(()=>{
  reqStudentArrFn();
})


const reqStudentArrFn = async (res) => {
  if(res){
    studentOptions.value.coursekind = res.coursekind;
  studentOptions.value.courseName = res.courseName;
  studentOptions.value.className = res.className;
  }
  loading.value = true;
  setTimeout(async () => {
    const res = await reqStuManage(studentOptions.value);
    studentArr.value = res.data.studentDataArr;
    studentOptions.value.total = res.data.total;
    loading.value = false;
  }, 500);
};

//请求课程是否启用的方法
const trunOn = async (row) => {
  const res = await reqUpdataTrun(row);
  if (res.data.status == 400) {
    ElMessage.success(res.data.msg);
    reqStudentArrFn();
  } else {
    ElMessage.warning("启动失败");
  }
};

//请求删除学生的方法
const deleteStudent = () => {
    //获取当前用户选择的行
  let selectRow = tableRef.value.getSelectionRows();
  if(selectRow.length==0){
    ElMessage.warning("当前没有选择数据");
    return;
  }
  //获取用户选择的学生名字
  let selectNameArr = [];
  //获取用户选择的学生的电话号码
  let selectTelArr = [];
  //获取当前用户是否是管理员
  const userStatus = store.state.userInfo.userInfo.admin;
  console.log(userStatus);
  selectRow.forEach((value)=>{
    selectNameArr.push(value.studentInfo.studentName);
    selectTelArr.push(value.telephone);
  })
  //合成一个字符串
  let titleName = "";
  selectNameArr.forEach((studentName,index)=>{
    if(index == selectNameArr.length - 1){
      titleName += studentName;
    }else{
       titleName = titleName + studentName+",";
    }
  })
  console.log(selectNameArr);
  ElMessageBox.confirm(
    `当前内容比较危险，需要向最高管理员提交删除申请，确定需要删除${titleName}吗?`,
    "警告",
    {
      confirmButtonText: "确定申请",
      cancelButtonText: "取消删除",
      customStyle:"width:400px",
      closeOnClickModal:false,
      type: "warning",
    }
  )
    .then(async () => {
      const object = {
      deleteStudentName:selectNameArr,
      telephone:selectTelArr,
      username:store.state.userInfo.userInfo.username
     };
      //向后端发起请求
     reqDeleteFn(userStatus,object);
      
    })
    .catch(() => {
      ElMessage.success("取消成功");
      //清空用户选择的行
      tableRef.value.clearSelection();
    });
};
reqStudentArrFn();

//删除用户的方法
const reqDeleteFn =async (userStatus,data)=>{
    if(userStatus){
      //代表是管理员
      //就不需要需要删除人的姓名了
      data.deleteStudentName = "";
      const res =await rootDeletStudent(data);
      console.log(res);
      ElMessage.success("你当前是最高管理员,删除成功");
      reqStudentArrFn();
    }else{
      //不是管理员
      const res = await reqDeleteStudent(data);
      console.log(res);
      ElMessage.success("申请成功,请等待批准");
      tableRef.value.clearSelection();
      disabled.value = false;
    }
}
//页数发生改变的时候触发
const handleSizeChange = (pageNum) => {
  //重新发起请求
  studentOptions.value.pageNum = pageNum;
  reqStudentArrFn();
};

//当前页发生变化时
const handleCurrentChange = (curPageNum) => {
  //重新发起请求
  studentOptions.value.courpage = curPageNum;
  reqStudentArrFn();
};

const courseClassChange = () => {
  reqStudentArrFn();
};

//选择班期
const selectClass = (row) => {
  //需要弹出对话框
  centerDialogVisible.value = true;
  classoption.value.telephone = row.telephone;
  dialogContent.value.courseName = row.courseName;
  dialogContent.value.classSelectOptions = screenStudentRef.value.returnClassArr(row.courseName);
  dialogContent.value.className = row.className;
  console.log(dialogContent.value);
};

//关闭弹窗的方法
const closeDialog = () => {
  centerDialogVisible.value = false;
  ElMessage.success("关闭成功");
  //清空数据
  dialogContent.value = {};
  classoption.value = {};
};
//像后端发起改变班期的请求
const reqUpdataClass = async () => {
  const res = await updataClass(classoption.value);
  if (res.data.status == 400) {
    //调用关闭弹窗的方法
    closeDialog();
    reqStudentArrFn();
  } else {
    ElMessage.warning(res.data.msg);
  }
};

//删除指定学生的方法
const deleteSpecial = ()=>{
  if(isDelete.value){
     //清空用户选择的行
  tableRef.value.clearSelection();
  }
  isDelete.value = false;
}


//选中删除学生的方法
const deleteAll = ()=>{
  ElMessage.success("请勾选需要删除的学生");
  isDelete.value = true;
}

//添加学生

//打开添加学生的组件
const openAddStudent = ()=>{
  addStudentRef.value.openDrawer();
}
</script>
<style lang="scss" scoped>
:deep(.el-card) {
  margin-top: 20px;
}
:deep(.el-dialog__body) {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.opter {
  display: flex;
  justify-content: space-around;
  width: 200px;
}
:deep(.el-table--fit ){
  z-index: 0 !important;
}
</style>