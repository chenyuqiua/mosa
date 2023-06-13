<template>
  <div class="container">
    <div style="left: 50%; width: 200px; transform: translateX(-50%); position: absolute">
      <div style="margin-top: 80px; text-align: center">
        <img src="/static/img/Logo.png" style="height: 40px" />
      </div>
    </div>
    <div class="loginUser-container">
      <div class="loginUser-title">
        <!--        管理平台-->
      </div>

      <!--登录 -->
      <div v-if="isLogin">
        <a-form
          :model="state.formState"
          :label-col="state.layoutConfig.labelCol"
          :wrapper-col="state.layoutConfig.wrapperCol"
          :rules="state.formRule"
          ref="formRef"
          layout="vertical"
          autocomplete="off"
        >
          <a-form-item name="username" style="border-radius: 5px">
            <a-input
              class="base-input"
              v-model:value="state.formState.username"
              allowClear
              placeholder="请输入手机号码"
              :disabled="state.spinning"
            >
              <template #prefix>
                <user-outlined type="user" style="color: #fff" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password" style="border-radius: 5px">
            <a-input-password
              class="base-input"
              v-model:value="state.formState.password"
              :disabled="state.spinning"
              allowClear
              placeholder="请输入登录密码"
            >
              <template #prefix>
                <lock-outlined style="color: #fff" />
              </template>
            </a-input-password>
          </a-form-item>

          <!--        <a-form-item name="remember" :wrapper-col="state.wrapperCol">-->
          <!--          <a-checkbox-->
          <!--            v-model:checked="state.formState.remember"-->
          <!--            :disabled="state.spinning"-->
          <!--            >记住密码</a-checkbox-->
          <!--          >-->
          <!--        </a-form-item>-->

          <a-form-item :wrapper-col="state.submitWrapperCol" class="submit-box">
            <a-button
              type="primary"
              html-type="submit"
              @click="loginAction"
              :loading="state.spinning"
              style="
                width: 100%;
                height: 35px;
                font-weight: bolder;
                background: rgb(227, 104, 229);
                outline: none;
                border-color: rgb(227, 104, 229);
                margin-top: 10px;
                border-radius: 5px;
              "
              >login</a-button
            >
          </a-form-item>
        </a-form>
        <div class="description">
          <span class="description-prefix">还没账号？</span>
          <span @click="jumpRegister" class="description-after" :disabled="state.spinning"
            >去注册</span
          >
        </div>
        <div class="description">
          <span>
            <a-divider>其他登录方式</a-divider>
          </span>
        </div>
        <div class="description">
          <wechat-outlined style="cursor: pointer" />
        </div>
      </div>

      <!-- 注册 -->
      <div v-else>
        <a-form
          :model="state1.formState"
          :label-col="state1.layoutConfig.labelCol"
          :wrapper-col="state1.layoutConfig.wrapperCol"
          :rules="state1.formRule"
          ref="formRef1"
          layout="vertical"
          autocomplete="off"
        >
          <a-form-item label="账号" name="username">
            <a-input
              class="base-input"
              v-model:value="state1.formState.username"
              allowClear
              placeholder="请输入账号"
            />
          </a-form-item>

          <a-form-item label="密码" name="password">
            <a-input-password
              class="base-input"
              v-model:value="state1.formState.password"
              allowClear
              placeholder="请输入密码"
            />
          </a-form-item>

          <a-form-item label="密码" name="passwordBack">
            <a-input-password
              class="base-input"
              v-model:value="state1.formState.passwordBack"
              allowClear
              placeholder="请确认密码"
            />
          </a-form-item>

          <div class="code">
            <input class="code_input" v-model="code" type="text" placeholder="请输入验证码" />
            <button class="code_btn" ref="self" @click.stop="getCode">{{ send }}</button>
          </div>

          <a-form-item :wrapper-col="state.submitWrapperCol" class="submit-box">
            <a-button
              type="primary"
              html-type="submit"
              @click="registerAction"
              :loading="state.spinning"
              style="
                width: 100%;
                height: 35px;
                font-weight: bolder;
                background: rgb(227, 104, 229);
                outline: none;
                border-color: rgb(227, 104, 229);
                margin-top: 10px;
                border-radius: 5px;
              "
              >注册</a-button
            >
          </a-form-item>
        </a-form>
        <div class="description">
          <span class="description-prefix">有账号？</span>
          <span @click="jumpLogin" class="description-after">去登录</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue"
import { WechatOutlined, UserOutlined, LockOutlined } from "@ant-design/icons-vue"
import { useRouter } from "vue-router"
// import { useStore } from "vuex"
import { message } from "ant-design-vue"
import { loginUser, registerUser } from "../../service/user/userApi"
import type { Rule } from "ant-design-vue/es/form"

import type { FormInstance } from "ant-design-vue"
import useUserStore from "@/stores/modules/user"
import { storeToRefs } from "pinia"

interface FormStateType {
  username: string
  password: string
  remember: boolean
}
interface FormRuleType {
  username: Object
  password: Object
}
interface stateType {
  formState: FormStateType
  formRule: FormRuleType
  layoutConfig: any
  wrapperCol: any
  submitWrapperCol: any
  spinning: boolean
  backgroundImgUrl: string
}
// 路由
const router = useRouter()
//store
// const store = useStore()
const userStore = useUserStore()

const formRef = ref<FormInstance>()
const state: stateType = reactive({
  formState: {
    username: "",
    password: "",
    remember: false
  },
  spinning: false,
  formRule: {
    username: [{ required: true, message: "请输入手机号码！" }],
    password: [{ required: true, message: "请输入登录密码！" }]
  },
  layoutConfig: {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 24
    }
  },
  wrapperCol: { offset: 0, span: 24 },
  submitWrapperCol: { offset: 0, span: 24 },
  backgroundImgUrl: "http://www.yongma16.xyz/staticFile/common/img/background.png"
})
/**
 * 初始化表单内容
 */
const initForm = () => {
  // const userInfoItem: any = window.localStorage.getItem("userInfo");
  // interface userInfoType {
  //   username: string;
  //   password: string;
  //   remember: boolean;
  // }
  // const userInfo: userInfoType = userInfoItem
  //   ? JSON.parse(userInfoItem)
  //   : {
  //       username: "",
  //       password: "",
  //       remember: false,
  //     };
  // if (userInfo.username && userInfo.password) {
  //   state.formState.username = userInfo.username;
  //   state.formState.password = userInfo.password;
  //   state.formState.remember = userInfo.remember;
  // }
}
/**
 * 前往注册！
 */
let isLogin = ref(true)
const jumpRegister = () => {
  // 带 hash，结果是 /about#team
  // router.push({ path: "/register" })
  isLogin.value = false
}

/**
 * 前往home！
 */
const jumpHome = () => {
  // 带 hash，结果是 /about#team
  // router.push({ path: "/dashboard" })
  router.replace("/dashboard")
}
/**
 * 记住密码
 * @param params
 */
const rememberAction = (params: Object) => {
  window.localStorage.setItem("userInfo", JSON.stringify(params))
}
/**
 * 登录
 */
async function loginAction() {
  // 登录信息
  const loginInfo = {
    phone: state.formState.username,
    password: state.formState.password
  }

  // 登录成功跳转页面
  const res: any = await userStore.loginUser(loginInfo)
  if (res.res.err === 0) {
    jumpHome()
  }
}

onMounted(() => {
  //初始化
  initForm()
})

// -------注册相关
interface FormStateType1 {
  username: string
  password: string
  passwordBack: string
  remember: boolean
}
interface FormRuleType1 {
  username: Object
  password: Object
}
interface stateType1 {
  formState: FormStateType1
  formRule: FormRuleType1
  layoutConfig: any
  wrapperCol: any
  submitWrapperCol: any
  spinning: boolean
  backgroundImgUrl: string
}

async function validatePass(_rule: Rule, value: string) {
  if (value === "") {
    return Promise.reject("请确认密码！")
  } else if (value !== state1.formState.password) {
    return Promise.reject("密码不一致!")
  } else {
    return Promise.resolve()
  }
}

const formRef1 = ref<FormInstance>()
const state1: stateType1 = reactive({
  formState: {
    username: "",
    password: "",
    passwordBack: "",
    remember: false
  },
  spinning: false,
  formRule: {
    username: [{ required: true, message: "请输入账号！" }],
    password: [{ required: true, message: "请输入密码！" }],
    passwordBack: [{ required: true }, { validator: validatePass, trigger: "blur" }]
  },
  layoutConfig: {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 24
    }
  },
  wrapperCol: { offset: 0, span: 24 },
  submitWrapperCol: { offset: 0, span: 24 },
  backgroundImgUrl: "http://www.yongma16.xyz/staticFile/common/img/background.png"
})
function jumpLogin() {
  isLogin.value = true
}
const store = useUserStore()
/**
 * 注册
 */
let code = ref()
const registerAction = () => {
  if (!code.value) {
    message.warning("请输入验证码")
    return
  }

  if (formRef1.value) {
    formRef1.value.validate().then((res: any) => {
      // state.spinning = true
      const params = {
        phone: state1.formState.username,
        password: state1.formState.password,
        verify_code: code.value
      }

      registerUser(params)
        .then((res: any) => {
          if (res.err === 0) {
            message.success("register success")
            // jumpHome()
            isLogin.value = true
          } else {
            message.error(res.msg)
          }
        })
        .catch((r: any) => {
          state1.spinning = false
          message.error(JSON.stringify(r))
          throw Error(r)
        })
    })
  }
}

// 获取验证码
let self = ref()
let send = ref("获取验证码")
async function getCode() {
  // 无手机号退出
  if (!state1.formState.username) {
    message.warning("请输入手机号码")
    return
  }

  // 开启定时
  self.value.disabled = true
  var time = 60
  var timer = setInterval(fun, 1000)
  function fun() {
    time--
    if (time >= 0) {
      send.value = time + "s后重新获取"
    } else if (time < 0) {
      send.value = "获取验证码"
      self.value.disabled = false
      clearInterval(timer)
      time = 60
    }
  }

  // 发送网络请求
  await store.fetchGetVerifyCode(state1.formState.username)
  const { codeRes } = storeToRefs(store)
  console.log(codeRes.value)
  if (codeRes.value === 0) {
    message.success("success")
  } else {
    message.error("获取失败")
  }
}
</script>

<style lang="less" scoped>
.background {
  /*background-image: url("http://www.yongma16.xyz/staticFile/common/img/background.png");*/
  background-image: url("/static/img/登录页背景.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.container {
  /*background: #262626;*/
  background-clip: border-box;
  position: absolute;
  width: 100vw;
  height: 100vh;
  color: #fff;
  .background();
}
.loginUser-container {
  position: absolute;
  width: 400px;
  // height: 320px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.submit-box {
  text-align: center;
  width: 100%;
  margin: 0 auto;
}
.loginUser-container {
  background-color: rgba(3, 0, 7, 0.6);
  border-radius: 10px;
  padding: 0 20px;
  color: rgba(255, 255, 255, 1);
}
.loginUser-title {
  margin: 20px;
  width: 100%;
  text-align: center;
  font-weight: bolder;
  font-size: 16px;
}
.description {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  .description-after {
    color: rgb(227, 104, 229);
    cursor: pointer;
  }
}
.base-input {
  background: transparent;
  background-image: none !important;
  background-color: transparent !important;
  border-radius: 10px;
}
/deep/ input {
  background: transparent !important;
}

/deep/ .ant-input {
  background: transparent !important;
  color: #fff !important;
}

/deep/ input:-internal-autofill-selected {
  appearance: menulist-button;
  background-image: none !important;
  background-color: transparent !important;
  color: fieldtext !important;
}

/deep/ .ant-divider-horizontal.ant-divider-with-text {
  color: #fff !important;
}
/deep/ .ant-divider-horizontal.ant-divider-with-text {
  border-top-color: #fff !important;
}
/deep/ .ant-input:-webkit-autofill {
  box-shadow: 0 0 0 1000px transparent inset;
}
/deep/ .ant-input:hover,
input:focus {
  box-shadow: 0 0 0 1000px transparent inset;
}
/deep/ .ant-input-suffix {
  color: #fff !important;
}
/deep/ .ant-input-password-icon {
  color: #fff !important;
}
/deep/ .anticon.ant-input-clear-icon {
  color: #fff !important;
}

// 注册
// .container {
//   /*background: #262626;*/
//   background-clip: border-box;
//   position: absolute;
//   width: 100vw;
//   height: 100vh;
//   .background();
// }
.submit-box {
  text-align: center;
  width: 100%;
  margin: 0 auto;
}
.register-container {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 0 20px;
}
.register-title {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  font-weight: bolder;
  font-size: 16px;
}
.description {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  .description-after {
    color: #1890ff;
    cursor: pointer;
  }
}

.code {
  display: flex;
  justify-content: space-between;
  margin: 30px 0;

  .code_input {
    outline: none;
    border: none;
    color: #fff;
    // background-color: #fff !important;
    padding: 4px 11px;
    width: 200px;
    height: 32px;
    background: transparent;
    background-image: none !important;
    background-color: transparent !important;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
  }

  .code_btn {
    border-radius: 8px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
}

/deep/ .ant-form-item-required {
  color: #fff;
}

/deep/ .ant-col-8 label {
  color: #fff;
}
</style>
