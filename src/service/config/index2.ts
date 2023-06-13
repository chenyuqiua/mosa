let BASE_URL = " "
if (import.meta.env.PROD) {
  // 生产环境
  // BASE_URL = "http://114.116.81.173:8000/"
  BASE_URL = "http://117.62.201.69:8000/"
} else {
  // 非生产环境(开发/测试)
  // BASE_URL = "http://114.116.81.173:8000/"
  BASE_URL = "http://117.62.201.69:8000/"
}

export const TIME_OUT = 10000
export { BASE_URL }
