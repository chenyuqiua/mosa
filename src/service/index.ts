import { localCache } from "@/utils/cache"
import { BASE_URL, TIME_OUT } from "./config"
import HYRequest from "./request"

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 添加拦截器
  interceptors: {
    requestSuccessFn: (config) => {
      let token = localCache.getCache("token")
      if (config.headers && token) {
        // @ts-ignore
        config.headers!.Authorization = "Bearer " + token
      }
      return config
    }
  }
})

export default hyRequest
