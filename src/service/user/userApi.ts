import axios from "axios"
import hyRequest from ".."
import backRequest from "../index2"

// export const loginUser: any = (params: any) => {
//   return axios.post("/cloudApi/user/login", params);
// };

// 登录接口
export const loginUser: any = (params: any) => {
  return hyRequest.post({
    url: "api/user/login",
    data: params
  })
}

// 检验token
export const checkLoginUserToken: any = (token: string) => {
  return hyRequest.post({
    url: "/api/user/verify",
    data: {
      token
    }
  })
}

// 获取登录用户信息
export const getLoginUserInfo: any = () => {
  return hyRequest.get({
    url: "/api/user/info"
  })
}

// export const registerUser: any = (params: any) => {
//   return axios.post("/cloudApi/user/register", params)
// }

// 用户注册
export const registerUser: any = (params: any) => {
  return hyRequest.post({
    url: "/api/user/register",
    data: params
  })
}

// 获取验证码
export const getVerifyCode: any = (phone: any) => {
  return hyRequest.post({
    url: "/api/user/verify-code",
    data: {
      phone
    }
  })
}

// 给用户设置积分
export const sendUserCoin: any = (params: any) => {
  return backRequest.post({
    url: "/api/customer/send-coin",
    data: {
      coin: params.coin,
      users: params.users
    }
  })
}

// 获取用户使用量
export const getUserUsage: any = (params: any) => {
  return hyRequest.get({
    url: "/api/usage/list"
  })
}
