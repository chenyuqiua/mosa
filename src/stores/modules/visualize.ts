import { getUpIndexData, getVisualData, northWardData } from "@/service/visualize/visualizeApi"
import { defineStore } from "pinia"

interface IVisualStore {
  visualData: any
  northward: any
  upIndex: any
  gemBoard: any
  usIndex: any
  deepIndex: any
}

const useVisualStore = defineStore("visual", {
  state: (): IVisualStore => ({
    visualData: {},
    northward: {},
    upIndex: {},
    gemBoard: {},
    usIndex: {},
    deepIndex: {}
  }),
  actions: {
    async fetchGetVisualData(params: any) {
      const res = await getVisualData(params)
      console.log(res)
      this.visualData = res.data
    },
    async fetchNorthWardData(params: any) {
      const res = await northWardData(params)
      console.log(res.result)
      this.northward = res.result
    },
    async fetchGetUpIndexData(params: any) {
      const res = await getUpIndexData(params)
      console.log(res)
      switch (params.secid) {
        case "1.000001":
          this.upIndex = res.data
          break
        case "0.399006":
          this.gemBoard = res.data
          break
        case "105.NDAQ":
          this.usIndex = res.data
          break
        case "0.399001":
          this.deepIndex = res.data
          break
      }
    }
  }
})

export default useVisualStore
