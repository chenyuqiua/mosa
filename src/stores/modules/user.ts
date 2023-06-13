import { defineStore } from "pinia"

import {
  getLoginUserInfo,
  getUserUsage,
  getVerifyCode,
  loginUser,
  registerUser,
  sendUserCoin
} from "../../service/user/userApi"
import { message } from "ant-design-vue"
import { localCache } from "../../utils/cache"

interface IUserType {
  token: string
  userInfo: any
  registerRes: number
  codeRes: any
  usageInfo: any
}

const useUserStore = defineStore("user", {
  state: (): IUserType => ({
    token: "",
    userInfo: {},
    registerRes: -1,
    codeRes: "",
    usageInfo: {}
  }),
  actions: {
    // @ts-ignore
    getUserInfoAction() {
      let token = localCache.getCache("token")
      token = token ? JSON.parse(token) : ""
      return this.token || token
    },
    async fetchgetLoginUserInfo() {
      // 获取个人信息并保存
      const infoRes = await getLoginUserInfo()
      console.log("userInfo", infoRes.data)
      const userInfo = infoRes.data
      userInfo.total_charge_money = Math.round(userInfo.total_charge_money * 10) / 10
      console.log(userInfo)
      localCache.setCache("userInfo", userInfo)
      this.userInfo = userInfo
    },

    // @ts-ignore
    // 登录逻辑
    async loginUser(params): Promise<void> {
      return new Promise(async (resolve: any, reject: any) => {
        try {
          // 发送登录请求
          console.log("login params", params)
          const res: any = await loginUser(params)
          console.log("login res", res)

          // 登录结果处理
          if (res.err === 0) {
            // 成功逻辑
            // 获取token并保存
            const token = res.data.token
            console.log("login success", token)
            localCache.setCache("token", token)
            localCache.setCache("phone", params.phone)
            this.token = token

            // 获取个人信息并保存
            const infoRes = await getLoginUserInfo()
            console.log("userInfo", infoRes.data)
            const userInfo = infoRes.data
            userInfo.total_charge_money = Math.round(userInfo.total_charge_money * 10) / 10
            localCache.setCache("userInfo", userInfo)
            this.userInfo = userInfo
            message.success(res.msg)
          } else {
            // message.warning(res?.msg)
            message.warning("登录失败!")
          }
          resolve({ res })
        } catch (r: any) {
          console.log("r", r)
          message.error(JSON.stringify(r))
          reject(r)
        }
      })
    },
    async fetchGetVerifyCode(phone: any) {
      const res = await getVerifyCode(phone)
      this.codeRes = res.err
      console.log("getCode", res)
    },
    async fetchRegisterUser(params: any) {
      const res = await registerUser(params)
      console.log(res)
    },
    async fetchSendUserCoin(params: any) {
      const res = await sendUserCoin(params)
      console.log(res)
      // 修改完成刷新保存的userInfo
      this.fetchgetLoginUserInfo()
    },
    async fetchGetUserUsage() {
      const res = await getUserUsage()
      console.log("usageInfo", res.data)
      this.usageInfo = res.data
    }
  }
})

export default useUserStore
