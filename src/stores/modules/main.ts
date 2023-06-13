import { defineStore } from "pinia"

import {
  createGenerateLink,
  createMark,
  createOrder,
  getAnalysisRes,
  getStockPrice,
  queryOrderStatus,
  selectOrderInfo
} from "@/service/main/main"
import { message } from "ant-design-vue"
import { localCache } from "@/utils/cache"

interface IMainType {
  name: string
  createOracleInfo: any
  createLinkInfo: any
  currentOrderInfo: any
  getRes: any
  aRes: any
  orderPayState: any
}

const useMainStore = defineStore("main", {
  state: (): IMainType => ({
    name: "abc",
    createOracleInfo: {},
    createLinkInfo: {},
    currentOrderInfo: {},
    getRes: {},
    aRes: {},
    orderPayState: {}
  }),
  actions: {
    async fetchCreateOrderAction(params: any) {
      const res = await createOrder(params)
      console.log("currentOracle: ", res)
      this.createOracleInfo = res.data
    },
    async fetchCreateGenerateLinkAction(params: any) {
      const res = await createGenerateLink(params)
      console.log("currentLink: ", res)
      this.createLinkInfo = res.data
    },
    async fetchSelectOrderInfoAction(params: any) {
      const res = await selectOrderInfo(params)
      console.log("currentOrderInfo", res.data)
      this.currentOrderInfo = res.data
    },
    async fetchGetStockPriceAction(stock: string) {
      const res = await getStockPrice(stock)
      console.log("getRes", res.data)
      if (res.err !== 0) {
        message.error(res.msg)
      } else {
        this.getRes = res.data
      }
    },
    async fetchGetAnalysisAction(stock: string) {
      const res = await getAnalysisRes(stock)
      if (res.err === 0) {
        this.aRes = res.data
        localCache.setCache("mark", res.data.symbol)
        console.log(res.data.symbol)
      }
    },
    async fetchCreateMark(params: any) {
      console.log(params)
      const res = await createMark(params)
      console.log(res.data)
      if (res.err !== 0) {
        message.error(res.msg)
      }
    },
    async fetchQueryOrderStatus(params: any) {
      const res = await queryOrderStatus(params)
      console.log("orderPayState", res)
      this.orderPayState = res.data
    }
  }
})

export default useMainStore
