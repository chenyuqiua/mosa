import axios from "axios";
export const getProductList: any = (params: any) => {
  return axios.get("/cloudApi/product/list", params);
};
export const getWxUserList: any = (data: any) => {
  return axios.post("/cloudApi/userModel/info", data);
};
export const updateUser: any = (data: any) => {
  return axios.put("/cloudApi/userModel/update", data);
};
export const openAiList: any = (data: any) => {
  return axios.post("/cloudApi/openAiRecord/list", data);
};
