import gptRequest from "../patGpt"

export const requestGpt: any = (params: any) => {
  return gptRequest.post({
    url: "/openai/v1/chat/completions",
    data: params
  })
}
