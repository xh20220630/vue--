// 编辑学生信息的组件
<template>
  <div class="editStudent">
    <el-row :gutter="20">
      <el-col :span="8"
        ><div>
          <span
            >姓名:<el-input
              v-model="clonStudentInfo.studentName"
              :placeholder="clonStudentInfo.studentName"
            ></el-input
          ></span>
        </div>
      </el-col>
      <el-col :span="8"
        ><div><span>年龄:</span>
        <el-input
              v-model="clonStudentInfo.sage"
              :placeholder="clonStudentInfo.sage"
            ></el-input
          ></div>
      </el-col>
      <el-col :span="8"
        ><div>
          <span>电话号码</span>
          :<el-input type="number"
            v-model="clonStudentInfo.telephone"
            :placeholder="clonStudentInfo.telephone+''"
            disabled
          ></el-input></div
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"
        ><div>
          <span>性别:</span>
          <el-radio v-model="clonStudentInfo.studentSex" label="男"
            >男</el-radio
          >
          <el-radio v-model="clonStudentInfo.studentSex" label="女"
            >女</el-radio
          > <el-radio v-model="clonStudentInfo.studentSex" label=""
            >未知</el-radio
          >
        </div>
      </el-col>
      <el-col :span="8"
        ><div>
          <span>qq号:</span>
          <el-input
            v-model="clonStudentInfo.QQnumber"
            :placeholder="clonStudentInfo.QQnumber"
          ></el-input>
        </div>
      </el-col>
      <el-col :span="8"
        ><div>
          <span>微信号:</span>
          <el-input
            v-model="clonStudentInfo.weChat"
            :placeholder="clonStudentInfo.weChat"
          ></el-input></div
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"
        ><div>
          <span>学历:</span>
          <el-cascader
            v-model="clonStudentInfo.studentGrade"
            :options="studentGradeArr"
          ></el-cascader>
        </div>
      </el-col>
      <el-col :span="8"
        ><div><span>地址:</span>
         <el-cascader
            v-model="clonStudentInfo.studentAddress"
            :options="studentAddressArr"
          ></el-cascader>
        </div>
      </el-col>
      <el-col :span="8"
        ><div>
          <span>身份证号:</span>:<el-input
            v-model="clonStudentInfo.crad"
            :placeholder="clonStudentInfo.crad"
          ></el-input></div
      ></el-col>
    </el-row>
  </div>
</template>
<script setup>
//props接受父组件传递的参数
import { defineProps, nextTick, onMounted, ref, watch,defineExpose } from "vue";
//导入克隆的方法
import { clone } from "@/assets/js/cloen";
//导入学历数组和地址数组
import studentAddressArr from "@/assets/js/province";
import studentGradeArr from "@/assets/js/graduate";
import { isArray } from "@vue/shared";
const props = defineProps(["studentInfo","showTable"]);
onMounted(() => {
     cloneStudent();
});
//需要克隆一个学生对象
const clonStudentInfo = ref({});

//定义一个值判断当前的值是不是是否发生改变
const changeStudent = ref(false);

//需要监视props的变化
watch(props,(newValue)=>{
    if(!newValue.studentInfo){
        return;
    }
    cloneStudent();
});
//克隆的方法
const cloneStudent = ()=>{
    //克隆对象
  clone(props.studentInfo, clonStudentInfo.value);
  //地址需要处理一下,学历也是
  //获取当前学生的地址
  let studentAddress = clonStudentInfo.value.studentAddress;
  let graduate = clonStudentInfo.value.studentGrade;
  clonStudentInfo.value.studentGrade = [graduate];
  //不是数组才切割
  if(!isArray(studentAddress)){
     clonStudentInfo.value.studentAddress =   studentAddress.split('/');
  }
}
//导出对象
defineExpose({
    changeStudent,
    cloneStudent,
    clonStudentInfo
})
</script>
<style lang="scss" scoped>
:deep(.el-input){
    width: 180px;
}
</style>