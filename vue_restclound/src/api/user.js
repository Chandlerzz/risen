// import qs from 'qs'
import request from '@/utils/request'
import CryptoJS from 'crypto-js/crypto-js'

//通过钉钉接口获取用户名，用于前端展示
export async function getDingTalkUserName() {
    const appSecret = process.env.VUE_APP_APP_SECRET;
    const appId = process.env.VUE_APP_APP_ID;
    const url = document.URL;
    const split_url_arr = url.split("?")
    if (split_url_arr.length > 1){
        const  temp_code = split_url_arr[1];
        const temp_auth_code = temp_code.substring(5,37)
        const timeStamp =Date.now();//生成的数字需要转成字符串
        const hash = CryptoJS.HmacSHA256(""+timeStamp,appSecret)
        const signature = hash.toString(CryptoJS.enc.Base64)
        const url_encode_signature = encodeURIComponent(signature)
        let url = ""
        if(process.env.NODE_ENV === "development"){
            url = process.env.VUE_APP_DING_TALK_API+'/sns/getuserinfo_bycode?accessKey='+appId+'&timestamp='+timeStamp+"&signature="+url_encode_signature
        } else {
            url = process.env.VUE_APP_DING_TALK_API+'/sns/getuserinfo_bycode?accessKey='+appId+'&timestamp='+timeStamp+"&signature="+url_encode_signature
        }
        const persistent_code_json = await request({
            url: url,
            method: 'post',
            data:{"tmp_auth_code": temp_auth_code},
            hideloading:true
        })
        const test = JSON.stringify(persistent_code_json);
        const test1 = JSON.parse(test);
        return test1;
    }
}

export async function getAccount() {
  let url="/api/query_account"
  if(process.env.NODE_ENV === 'production'){
      url = "/dev/app_102_module_maintainment/query_account"
  }
  return request({
    url: url,
    method: 'get',
    hideloading: true // 隐藏loading
  })
}

export async function createAndUpdateAccount(params) {
  let url="/api/create_and_update_account"
  if(process.env.NODE_ENV === 'production'){
      url = "/dev/app_102_module_maintainment/create_and_update_account"
  }
  return request({
    url: url,
    method: 'post',
    //data: qs.stringify(params),
    data:params,
    hideloading: true, // 隐藏loading
       headers:{
      'Content-Type':'application/json'
      }
  })
}


export function getToken() {
    return request(
        {
            url:"/gettoken?appkey=dinghttoqsozhudepyhh&appsecret=5ROrxbuRbCgfS8gfogMo0zFs1jvjCmShubAcYkijAAD3A4B9kvCv3934RKEGHmxH",
            method: 'get',
            hideloading: true // 隐藏loading
        }
    )
}
export function getUserInfo(accessToken,code){
    return request({
        url:"/user/getuserinfo?access_token="+accessToken+"&code="+code,
        method: 'get',
            hideloading: true
    })
}
