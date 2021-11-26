// cookie.js

function setCookie(name,value,timer=1){//默认将被保存 1 天
    var Days = timer;
    var exp  = new Date();
    exp.setTime(exp.getTime() + Days*60*60*1000);
    document.cookie = name+"="+escape(value)
}

function setTimStamp(timer =1){
    var Days = timer;
    var exp = Date.now();
    const timeStamp = exp+Days*24*60*60*1000;
    // const timeStamp = Date.parse(exp);
    document.cookie = "timeStamp="+timeStamp;


}
//name 需要获取cookie的key

function getCookie(name){
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null){
        return unescape(arr[2])
    }else{
        return null
    }
}

// 需要删除cookie的key
function clearCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie=name +"="+cval+";expires="+exp.toGMTString();
}

export default {
    setCookie,
    getCookie,
    clearCookie,
    setTimStamp,
}
