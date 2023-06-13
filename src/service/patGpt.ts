import HYRequest from "./request"
import { localCache } from "@/utils/cache"

const gptRequest = new HYRequest({
  baseURL: "https://chat-chatgpt-kmfviptdmu.us-west-1.fcapp.run",
  timeout: 10000,
  // 添加拦截器
  interceptors: {
    requestSuccessFn: (config) => {
      let token = localCache.getCache("token")
      // @ts-ignore
      config.headers!.Authorization = "Bearer ST-3ijxg6GhKHDptXZ7"
      return config
    }
  }
})

export default gptRequest
