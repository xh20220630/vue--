<template>
  <div class="Login">
    <!-- 使用element-puls搭建一个前端登录页面 -->
    <div class="loginContent">
      <div class="titleBox">
        <div class="title">
          <svg-icon icon="link"> </svg-icon>
          <span>LOGIN</span>
        </div>
        <div class="hiddenBox"></div>
      </div>
      <ul class="more" v-show="!emergeHelpBox" @click="openHelpBox()">
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <el-form
        ref="rulesForm"
        :model="login"
        label-width="120px"
        label-position="left"
        :rules="rules"
      >
        <el-form-item class="username" label="username" prop="username">
          <div class="svg">
            <svg-icon icon="user" class="user-icon"></svg-icon>
          </div>
          <el-input v-model="login.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item class="password" label="password" prop="password">
          <div class="svg"><svg-icon icon="password"></svg-icon></div>
          <el-input
            placeholder="密码"
            v-model="login.password"
            :type="isShowPassword"
          ></el-input>
          <div class="svg eye" @click="openShow">
            <svg-icon :icon="isShoweye"></svg-icon>
          </div>
        </el-form-item>
      </el-form>
      <el-button round @click="Login" class="btn" type="primary"
        >GET STARTED</el-button
      >
      <!-- <div class="link">
        <router-link to="/register">点击注册</router-link>
      </div> -->
      <!-- 需要帮助区域 -->
      <div class="helpBOx" :class="{ emergeHelpBox: emergeHelpBox }">
        <div class="close" @click="closeHelpBox()">
          <div class="closeIcon"></div>
          <p>Need Help?</p>
        </div>
        <div class="forget">Forget Password?</div>
        <div class="connect">Contact Support</div>
        <div class="register">
          <router-link to="/register">CREATE ACCOUNT</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script  setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
// import {setLocalStorage} from "@/Storage"
//引入store
import useStore from "@/store";
//引入登录
// import reqLogin from "@/reqApi/login"
//data
const rulesForm = ref(null);
const login = ref({
  username: "",
  password: "",
});
const router = useRouter();
// 定义校验规则
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
      message: "密码必须包含数字和字母,长度为6-10位",
      trigger: "blur",
      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/,
    },
  ],
});
//是否展示密码(默认不展示)
const isShow = ref(false);

const isShowPassword = computed(() => (isShow.value ? "input" : "password"));

const isShoweye = computed(() => (isShow.value ? "eye-open" : "eye"));

//是否显示需要帮助的盒子默认不显示
const emergeHelpBox = ref(false);
//method
const Login = async () => {
  const statu = await rulesForm.value.validate().catch((value) => {
    //向后端发起请求
    ElMessage({
      showClose: true,
      message: "输入格式有误",
      type: "warning",
      grouping: true,
    });
    return;
  });
  if (statu) {
    //调用store中的登录请求方法
    useStore.dispatch("userInfo/LoginFn", login.value);
    //  const {data:resData} = await reqLogin(login.value);
    //  console.log(resData)
    //   if(resData.statu == 400){
    //     setLocalStorage('login',resData.data)
    //     ElMessage({
    //     showClose: true,
    //     message: resData.msg,
    //     type: "success",
    //     grouping:true
    //   });
    //   router.push("/index");
    // }else{
    //   ElMessage({
    //     showClose: true,
    //     message: resData.msg,
    //     type: "error",
    //     grouping:true
    //   });
    //   // router.push("/index");
    // }
  }
};

const openShow = () => {
  isShow.value = !isShow.value;
};
const openHelpBox = () => {
  emergeHelpBox.value = true;
};
const closeHelpBox = ()=>{
   emergeHelpBox.value = false;
}
</script>

<style lang="scss" scoped>
.Login {
  width: 100%;
  height: 100%;
  position: absolute;
  .loginContent {
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
    .emergeHelpBox {
        right: -250px !important;
        height: 220px !important;
        opacity: 1 !important;
      }
    .helpBOx {
      position: absolute;
      top: 65px;
      width: 200px;
      height: 0px;
      background: rgba(255, 255, 255, 0.6);
      right: -50px;
      padding: 20px;
      transition: 1s;
      opacity: 0;
      overflow: hidden;
      .close {
        display: flex;
        height: 40px;
        align-content: center;
        justify-content: space-between;
        border-bottom: 2px solid white;
        .closeIcon {
          width: 25px;
          height: 25px;
          position: relative;
          cursor: pointer;
        }
        &::after {
          content: "";
          width: 25px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 10px;
          transform: translateY(8px) rotateZ(45deg);
          position: absolute;
        }
        &:hover::after {
          background: rgb(101, 8, 22);
        }
        &::before {
          content: "";
          width: 25px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 10px;
          transform: translateY(8px) rotateZ(-45deg);
          position: absolute;
        }
        &:hover::before {
          background: rgb(101, 8, 22);
        }
        p {
          font-weight: 700;
        }
      }
      .forget,
      .register,
      .connect {
        width: 100%;
        height: 35px;
        line-height: 35px;
        text-align: center;
        border: 1px solid rgb(213, 27, 55);
        border-radius: 50px;
        margin-top: 20px;
        color: rgb(213, 27, 55);
        font-weight: 700;
        cursor: pointer;
      }
      .register {
        background: rgb(101, 8, 22);
        color: #fff;
      }
      .forget:hover {
        background: rgb(213, 27, 55);
        color: #fff;
      }
      .register:hover {
        background: rgb(213, 27, 55);
      }
      .connect:hover {
        background: rgb(213, 27, 55);
        color: #fff;
      }
    }
    :deep(.el-form-item) {
      display: block;
      padding-left: 20px;
      padding-right: 20px;
      &:nth-child(1) {
        margin-top: 50px;
      }
      .el-form-item__label {
        color: #ccc;
      }
    }
    .link {
      margin-top: 20px;
      a {
        color: white;
        margin-right: -27px;
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
    }
    ul {
      width: 23px;
      height: 8px;
      float: right;
      display: flex;
      transform: translateX(-20px);
      justify-content: space-between;
      cursor: pointer;
      margin-top: 20px;
      li {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        border: 1px solid rgb(213, 27, 55);
      }
    }
    .hiddenBox {
      top: 0;
      right: 0;
      position: absolute;
      width: 88px;
      height: 0px;
      border-top: 40px solid transparent;
      border-left: 100px white solid;
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
      &:hover {
        background: rgb(213, 27, 55);
      }
    }
  }
}
</style>