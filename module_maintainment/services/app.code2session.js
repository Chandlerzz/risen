import { get } from "../functions/api.js"
import regeneratorRuntime from "../functions/regenerator.js"

export default async function code2session(code) {
  let res = await get(`wechatMini/code2session`, {data:{
    code}})

  return res.data
  
}