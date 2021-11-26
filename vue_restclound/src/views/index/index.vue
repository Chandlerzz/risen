<template>
    <div>
        <div style="width:100%;height:100%; background-color: #42b983">
              <div id="login_container" class="main">
                  hello
              </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {getCode} from '@/utils/dd'
import * as dd from 'dingtalk-jsapi'
import validate from "@/utils/validate";
import {  getToken,getUserInfo } from '@/api/user';
import Cookies from "@/utils/cookies";
export default {
    name: "Index",

    data(){
        return{

        }
    },
    // computed
    computed:{
        ...mapState([
          'ding_talk_name','current_uri'
        ]),
        userName: function() {
            let userName= ""
            if (this.ding_talk_name.user_info != undefined){
                userName = this.ding_talk_name.user_info.nick
            }
            else{
                userName = Cookies.getCookie("userName")
            }
            return userName;
        },
    },
    methods:{
        ...mapActions([
          'getDingTalkUserName','getCurrentUri'
        ]),
        async getUserInfo(code){
            const token =  await getToken()
            const userInfo = await getUserInfo(token.access_token,code)
            Cookies.setCookie("userName",userInfo.name)
            Cookies.setTimStamp()
            this.$router.replace("/factory")
        }
    },
    async created(){
        const that = this
        if(dd.env.platform ==='notInDingTalk'){
            await validate.validate(that);
        }else{
            getCode(code => {
                // 登录处理
                this.getUserInfo(code)

            })
        }
    },
}
</script>

<style lang="less" scoped>
</style>
