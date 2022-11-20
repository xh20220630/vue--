<template>
  <div class="Register">
    <!-- 使用element-puls搭建一个前端注册页面 -->
    <div class="registerContent">
      <div class="titleBox">
        <div class="title">
          <el-tooltip
            class="item"
            effect="dark"
            content="点击返回LOGIn"
            style="
               {
                color: #ccc;
              }
            "
            placement="top"
          >
            <router-link to="/login">
              <div class="returnLogin">
                <div></div>
                <div></div>
              </div>
            </router-link>
            <!-- //返回登录 -->
          </el-tooltip>
          <span>REGISTER</span>
        </div>
        <div class="hiddenBox"></div>
      </div>
      <el-form
        ref="rulesForm"
        :model="register"
        label-width="120px"
        label-position="left"
        :rules="rules"
      >
        <el-form-item class="username" label="用户名" prop="username">
          <div class="svg">
            <svg-icon icon="user" class="user-icon"></svg-icon>
          </div>
          <el-input v-model="register.username"></el-input>
        </el-form-item>
        <el-form-item class="password" label="密码" prop="password">
          <div class="svg"><svg-icon icon="password"></svg-icon></div>
          <el-input
            v-model="register.password"
            :type="isShowPassword"
          ></el-input>
          <div class="svg eye" @click="openShow">
            <svg-icon :icon="isShoweye"></svg-icon>
          </div>
        </el-form-item>
        <el-form-item class="password" label="确认密码" prop="confirPassword">
          <el-input
            v-model="register.confirPassword"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button round @click="registerSubmit" class="btn" type="primary"
        >注册</el-button
      >
    </div>
  </div>
</template>
<script  setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { getLocalStorage } from "@/Storage";
//引入store里user模块里的注册方法
import store from "@/store";
//引入向后端发起注册请求的方法
import reqReg from "@/reqApi/register";
//data
const rulesForm = ref(null);
const register = ref({
  username: "",
  password: "",
  confirPassword: "",
});
const router = useRouter();
// 定义校验规则
const confirCommanPassword = (rule, value, callback) => {
  //判断当前的两次输入的密码是否一致
  if (value !== register.value.password) {
    callback(new Error("两次的密码不一致"));
  } else {
    callback();
  }
};
const rules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
    {
      min: 1,
      max: 5,
      message: "请输入1-5长度的用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
    {
      mix: 6,
      max: 14,
      message: "密码必须包含数字和字母",
      trigger: "blur",
      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/,
    },
  ],
  confirPassword: [
    {
      validator: confirCommanPassword,
    },
  ],
});
//是否展示密码(默认不展示)
const isShow = ref(false);

const isShowPassword = computed(() => (isShow.value ? "input" : "password"));

const isShoweye = computed(() => (isShow.value ? "eye-open" : "eye"));

//method
const openShow = () => {
  isShow.value = !isShow.value;
};
const registerSubmit = async () => {
  const statu = await rulesForm.value.validate().catch((value) => {
    ElMessage({
      showClose: true,
      message: "格式错误",
      type: "warning",
      grouping: true,
    });
    return;
  });
  if (statu) {
    //  const storageVal = getLocalStorage('Login',{});
    //  console.log(storageVal)
    //发起注册请求
    store.dispatch("userInfo/registerFn", register.value);
    //   const {data:reqData} = await reqReg(register.value);
    //   console.log(reqData)
    //    if(reqData.status == 400){
    //     ElMessage({
    //     showClose: true,
    //     message:  reqData.msg,
    //     type: "success",
    //     grouping:true
    //   });
    //   router.push("/login");
    // }else{
    //   ElMessage({
    //     showClose: true,
    //     message: reqData.msg,
    //     type: "error",
    //     grouping:true
    //   });
    // }
  }
};
</script>
<style lang="scss" scoped>
.Register {
  width: 100%;
  height: 100%;
  position: absolute;
  .registerContent {
    width: 322px;
    position: relative;
    top: 50%;
    bottom: 0;
    right: 0;
    margin: auto;
    transform: translateY(-50%);
    background: #fff;
    height: 345px;
    border-radius: 10px;
    box-shadow: 0px 0px 12px 0px;
    :deep(.el-form-item) {
      display: block;
      padding-left: 20px;
      padding-right: 20px;
      &:nth-child(1) {
        margin-top: 20px;
      }
      .el-form-item__label {
        color: #ccc;
      }
    }
    .titleBox {
      width: 100%;
      height: 36px;
      background: linear-gradient(
        135deg,
        rgba(30, 29, 31, 1) 0%,
        rgba(223, 64, 90, 1) 100%
      );
      .hiddenBox {
        top: 0;
        right: 0;
        position: absolute;
        width: 88px;
        height: 0px;
        border-top: 40px solid transparent;
        border-left: 100px white solid;
      }
      .returnLogin {
        width: 40px;
        height: 40px;
        position: relative;
        cursor: pointer;
        &:hover > :nth-child(1) {
          border-color: rgb(101, 8, 22);
        }
        &:hover > :nth-child(2) {
          background: rgb(101, 8, 22);
        }
        div {
          position: absolute;
        }
        :nth-child(1) {
          top: 17px;
          width: 14px;
          height: 14px;
          border-left: 3px solid #ccc;
          border-bottom: 3px solid #ccc;
          transform: rotateZ(45deg) translateY(-50%);
        }
        :nth-child(2) {
          width: 20px;
          height: 4px;
          top: 19px;
          transform: translateY(-50%);
          left: 7px;
          background: #ccc;
        }
      }

      .title {
        width: 134px;
        margin-bottom: 20px;
        color: #ccc;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 15px;
        font-weight: 600;
        height: 38px;
        line-height: 36px;
      }
    }

    .password,
    .username {
      position: relative;
      vertical-align: middle;
      .svg {
        position: absolute;
        left: 80px;
        top: -27px;
        vertical-align: middle;
      }
      .eye {
        left: 250px;
        width: 20px;
        top: 5px;
        height: 20px;
      }
      :deep(.svg-icon) {
        // vertical-align: -14px;
        height: 20px;
      }
    }
    .btn {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 50px;
      line-height: 50px;
      border-radius: 10px;
      border-top-right-radius: none;
      border-top-left-radius: unset;
      border-top-right-radius: unset;
      background: rgb(101, 8, 22);
      font-size: 20px;
      font-weight: 500;
    }
  }
}
</style>