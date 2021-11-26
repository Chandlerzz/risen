<template>
  <div style="width:100%;height:100%; background-color: #42b983">
    <div id="login_container" class="main"></div>
    <remote-script src="https://g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js"></remote-script>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import * as dd from 'dingtalk-jsapi'
// import { getCode } from '@/utils/dd'
// import Cookies from "@/utils/cookies"
export default {
  name: "Login",
  computed: {
    ...mapGetters([
     'current_uri'
    ]),
    ...mapState([
      'ding_talk_name','current_uri'
    ]),
  },
  methods:{
    ...mapActions([
      'getDingTalkUserName','getCurrentUri'
    ]),



  },
  mounted() {
    const appId = process.env.VUE_APP_APP_ID;
    const redirect_uri = process.env.VUE_APP_REDIRECT_URI//"workshop"//+this.current_uri;
    if(dd.env.platform === "notInDingTalk"){
      let goto = encodeURIComponent("https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid="+appId+"&response_type=code&scope=snsapi_login&state=STATE&redirect_uri="+redirect_uri);
      /* eslint-disable */
      setTimeout(function(){
        const obj = DDLogin({
          /* eslint-disable */
          id: "login_container",
          goto: goto,
          style: "border:none;background-color:#42b983;",
          width: "365",
          height: "400"
        });
      },1000)

      const hanndleMessage = function(event) {
        const origin = event.origin;
        if (origin == "https://login.dingtalk.com") {
          //判断是否来自ddLogin扫码事件。
          var loginTmpCode = event.data; //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
          window.location.href = "https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid="+appId+"&response_type=code&scope=snsapi_login&state=STATE&redirect_uri="+redirect_uri+"&loginTmpCode=" + loginTmpCode;
        }
      };
      if (typeof window.addEventListener != "undefined") {
        window.addEventListener("message", hanndleMessage, false);
      } else if (typeof window.attachEvent != "undefined") {
        window.attachEvent("onmessage", hanndleMessage);
      }
    }
    else{
      getCode(code => {
        // 登录处理
        Cookies.setCookie("code",code)
        Cookies.setCookie("userName",code)
      })
    }
  }

};
</script>

<style scoped>
.main{
  text-align: center; /*让div内部文字居中*/
  /*background-color: #fff;*/
  border-radius: 20px;
  /*width: 300px;*/
  /*height: 350px;*/
  /*margin: auto;*/
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

</style>
