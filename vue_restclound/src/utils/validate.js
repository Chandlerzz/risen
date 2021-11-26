import Cookies from "@/utils/cookies";
export default {

    async validate(that){
        const url = document.URL;
        const split_url_arr = url.split("?")
        const uri = split_url_arr[0].replace(/http:\/\/localhost:8010/,"")
        await that.getCurrentUri(uri);
        if (split_url_arr.length > 1) {
            await that.getDingTalkUserName();
            if (that.ding_talk_name.user_info != undefined) {
                await Cookies.setTimStamp()
                await Cookies.setCookie("userName", that.ding_talk_name.user_info.nick)
                that.$router.replace("/dashboard")
                return
            }
        }
        const name = Cookies.getCookie("userName") || ""
        const timeStamp = Cookies.getCookie("timeStamp") || ""
        if (name ==="" || timeStamp===""){
            that.$router.replace("/login")
            return
            
        }

        if(Date.now()>parseInt(timeStamp)){
            that.$router.replace("/login")
            return
        }
        that.$router.replace("/dashboard")
    }
}
