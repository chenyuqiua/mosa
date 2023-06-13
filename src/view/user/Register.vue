<template>
  <a-spin tip="登录中..." :spinning="state.spinning">
    <!--    <div-->
    <!--      class="container"-->
    <!--      :style="{-->
    <!--        backgroundImage:url(state.backgroundImgUrl),-->
    <!--      }"-->
    <!--    >-->
    <div class="container">
      <div class="register-container">
        <div class="register-title">管理平台</div>
        <a-form
          :model="state.formState"
          :label-col="state.layoutConfig.labelCol"
          :wrapper-col="state.layoutConfig.wrapperCol"
          :rules="state.formRule"
          ref="formRef"
          layout="vertical"
          autocomplete="off"
        >
          <a-form-item label="账号" name="username">
            <a-input v-model:value="state.formState.username" allowClear placeholder="请输入账号" />
          </a-form-item>

          <a-form-item label="密码" name="password">
            <a-input-password
              v-model:value="state.formState.password"
              allowClear
              placeholder="请输入密码"
            />
          </a-form-item>

          <a-form-item label="密码" name="passwordBack">
            <a-input-password
              v-model:value="state.formState.passwordBack"
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
              style="width: 100%; font-weight: bolder"
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
  </a-spin>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { message } from "ant-design-vue"
import { registerUser } from "../../service/user/userApi"
import type { Rule } from "ant-design-vue/es/form"
import type { FormInstance } from "ant-design-vue"
import useUserStore from "@/stores/modules/user"
import { storeToRefs } from "pinia"
import useMainStore from "@/stores/modules/main"
// import { useStore } from "vuex"

interface FormStateType {
  username: string
  password: string
  passwordBack: string
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
const store = useUserStore()

const formRef = ref<FormInstance>()
const state: stateType = reactive({
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
/**
 * 前往登录！
 */
const jumpLogin = () => {
  // 带 hash，结果是 /about#team
  router.push({ path: "/login" })
}

async function validatePass(_rule: Rule, value: string) {
  if (value === "") {
    return Promise.reject("请确认密码！")
  } else if (value !== state.formState.password) {
    return Promise.reject("密码不一致!")
  } else {
    return Promise.resolve()
  }
}

/**
 * 前往home！
 */
const jumpHome = () => {
  // 带 hash，结果是 /about#team
  router.push({ path: "/" })
}
/**
 * 注册
 */
let code = ref()
const registerAction = () => {
  if (formRef.value) {
    formRef.value.validate().then((res: any) => {
      // state.spinning = true
      const params = {
        phone: state.formState.username,
        password: state.formState.password,
        verify_code: code.value
      }

      registerUser(params)
        .then((res: any) => {
          if (res.err === 0) {
            message.success("register success")
            jumpHome()
          } else {
            message.error(res.msg)
          }
        })
        .catch((r: any) => {
          state.spinning = false
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
  if (!state.formState.username) {
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
      // self.value.disabled = false
      clearInterval(timer)
      time = 60
    }
  }

  // 发送网络请求
  await store.fetchGetVerifyCode(state.formState.username)
  const { codeRes } = storeToRefs(store)
  console.log(codeRes.value)
  if (codeRes.value === 0) {
    message.success("success")
  } else {
    message.error("获取失败")
  }
}
</script>

<style lang="less">
.background {
  background-image: url("http://www.yongma16.xyz/staticFile/common/img/background.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.container {
  /*background: #262626;*/
  background-clip: border-box;
  position: absolute;
  width: 100vw;
  height: 100vh;
  .background();
}
.register-container {
  position: absolute;
  width: 400px;
  height: 440px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
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
  margin-bottom: 20px;

  .code_input {
    outline: none;
    border: none;
    background-color: #fff;
    padding: 4px 11px;
    width: 200px;
    height: 32px;
  }
}
</style>
