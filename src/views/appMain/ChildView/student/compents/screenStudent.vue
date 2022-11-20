// 筛选学生的组件
<template>
  <!-- 课程类别 -->
        <el-select
          clearable
          @change="courseKindChange"
          v-model="screenOption.coursekind"
          placeholder="课程类别"
        >
          <el-option
            v-for="item in couresArr.coursekind"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
          <!-- 课程名称 -->
        </el-select>
        <el-select
          clearable
          v-model="screenOption.courseName"
          placeholder="课程名称"
          @focus="courseNameFocus"
          @change="courseChange"
        >
          <el-option
            v-for="item in couresArr.courseName"
            :key="item.courseName"
            :label="item.courseName"
            :value="item.courseName"
          >
          </el-option>
        </el-select>
        <!-- 课程班期 -->
        <el-select
          clearable
          :disabled="disabled"
          @change="courseClassChange"
          v-model="screenOption.className"
          placeholder="课程班期"
        >
          <el-option
            v-for="item in classArr"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
          <!-- 课程名称 -->
        </el-select>

</template>
<script setup>
//导入请求课程信息的函数
import reqCouresArr from "@/reqApi/reqStudent/reqCouresArr";
import { onMounted,defineProps,defineEmits,ref,defineExpose } from "vue";
//创建一个接受课程学习的对象
const couresArr = ref({
  courseName: [],
  coursekind: [],
});
//创建一个接受筛选课程的对象
const screenOption = ref({
   //课程类别
  coursekind: "",
  //课程名称
  courseName: "",
  //班期名称
  className: "",
})
const disabled = ref(true);
const props = defineProps(["studentOptions"]);
const emits = defineEmits(["reqStudentArr"]);
// 发起请求获取数据
const reqCouresArrFn = async () => {
  const res = await reqCouresArr();
  couresArr.value.courseName = res.courseObj.courseName;
  couresArr.value.coursekind = res.courseObj.coursekind;
};
onMounted(()=>{
    reqCouresArrFn();
})
//课程选项发生改变时触发
const courseKindChange = (couseKind) => {
  //判断课程名称是不是属于当前这个类的
  if (!judeInclude(screenOption.value.courseName, couseKind)) {
    //清空
    screenOption.value.courseName = "";
  }
  emits("reqStudentArr",screenOption.value);
  //重新请求
  reqCouresArrFn();
};

//书写一个判断当前的课程名和课程类别是否匹配的方法
const judeInclude = (couserName, CourseKind) => {
  //获取当前课程类别所对应的数据
  let falg = true;
  if (!couserName) {
    return;
  }
  couresArr.value.courseName.forEach((value) => {
    if (CourseKind == value.couseKind && couserName == value.courseName) {
      falg = false;
      //代表是包含的
      return true;
    }
  });
  if (!falg) {
    return true;
  } else {
    screenOption.value.className = "";
    disabled.value = true;
    return false;
  }
};

//课程名称获得焦点时触发
const courseNameFocus = () => {
  //获取当前的课程名称
  const coursekind = screenOption.value.coursekind;
  if (!coursekind) {
    return;
  }
  const newCurseArr = [];
  couresArr.value.courseName.forEach((value) => {
    if (coursekind == value.couseKind) {
      newCurseArr.push(value);
    }
  });
  couresArr.value.courseName = newCurseArr;
};
const classArr = ref([]);
//课程名称发生改变触发
const courseChange = () => {
  disabled.value = false;
 emits("reqStudentArr",screenOption.value);
 returnClassArr();
};
const returnClassArr = (courseName) => {
  //需要根据课程名称返回对应的班期
  if (!screenOption.value.courseName && !courseName) {
    //没有班期名称
    disabled.value = true;
    screenOption.value.className = "";
    return;
  }
  console.log(courseName);
  let returnClass = [];
  couresArr.value.courseName.forEach((value) => {
    //找到当前的课程名称对应的那个班期数组
    if (screenOption.value.courseName == value.courseName) {
      classArr.value = value.courseClass;
    }
    if (courseName == value.courseName) {
      returnClass = value.courseClass;
    }
  });
  return returnClass;
};
//班期选项发送改变时触发
const courseClassChange = () => {
 emits("reqStudentArr",screenOption.value);
};
//导出外面需要使用的对象
defineExpose({
    returnClassArr
})
</script>
<style lang="scss" scoped>
</style>