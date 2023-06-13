import { requestGpt } from "@/service/patGpt/patGpt"
import { defineStore } from "pinia"

interface IPatGptType {
  gptAnswer: object
}

const usePatGptStore = defineStore("patGpt", {
  state: (): IPatGptType => ({
    gptAnswer: {}
  }),
  actions: {
    // @ts-ignore
    async fetchRequestGpt(params: any) {
      const res = await requestGpt(params)
      console.log("gptData", res)
      this.gptAnswer = res
    }
  }
})

export default usePatGptStore
