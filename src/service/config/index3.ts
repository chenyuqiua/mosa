let BASE_URL = " "
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = "https://"
} else {
  // 非生产环境(开发/测试)
  BASE_URL = "https://"
}

export const TIME_OUT = 10000
export { BASE_URL }
