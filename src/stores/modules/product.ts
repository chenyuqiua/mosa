import { defineStore } from "pinia"

interface IProductType {
  productList: object
}

const useProductStore = defineStore("product", {
  state: (): IProductType => ({
    productList: {}
  }),
  actions: {
    // @ts-ignore
    setProductListAction(params: any) {
      console.log("setProductList", params)
      this.productList = params
      // commit("setProductList", params);
    }
  }
})

export default useProductStore
