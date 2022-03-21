setInterval(function(){
    const date = $("[data-fieldmark^=field25689]")[0].innerText
    const currentdate = new Date()
    Y = currentdate.getFullYear() + '-';
    M = (currentdate.getMonth()+1 < 10 ? '0'+(currentdate.getMonth()+1) : currentdate.getMonth()+1) + '-';
    D = currentdate.getDate();
    const currentdate1= Y+M+D 
    timeBetweenStart2End = DateMinus(currentdate1,date)
    if(timeBetweenStart2End>7 || timeBetweenStart2End<0 ){
        $("[data-fieldmark^=field25695]")[0].style.cssText="pointer-events:none"
    }
    else{
        $("[data-fieldmark^=field25695]")[0].style.cssText=""
        const aa = $("[data-fieldmark^=field25695]")[0].style.cssText
        const bb = $("[data-fieldmark^=field25695]")[0].style.cssText
    }

},1000)
//js 日期相减函数
function DateMinus(date1,date2){//date1:小日期  date2:大日期
  　　var sdate = new Date(date1);
  　　var now = new Date(date2);
  　　var days = now.getTime() - sdate.getTime();
  　　var day = parseInt(days / (1000 * 60 * 60 * 24)); 　　
  　　return day;
 }