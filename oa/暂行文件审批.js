  setInterval(function(){
    console.log(111)
    const duration = 31*24*60*60*1000
    const start = $("[data-fieldmark^=field25688] .text")[0].innerText
    const end = $("[data-fieldmark^=field25689] .text")[0].innerText
    const timeStampStart = Date.parse(start);
    const timeStampEnd = timeStampStart + duration;
    const allowedEnd = new Date(timeStampEnd)
    Y = allowedEnd.getFullYear() + '-';
    M = (allowedEnd.getMonth()+1 < 10 ? '0'+(allowedEnd.getMonth()+1) : allowedEnd.getMonth()+1) + '-';
    D = allowedEnd.getDate();
    const allowedEnd1= Y+M+D 
    WfForm.controlDateRange("field25689", start,allowedEnd1);
    timeBetweenStart2End = DateMinus(start,end)
    if(timeBetweenStart2End> 31 || timeBetweenStart2End<=0 ){
          $("[data-fieldmark^=field25689] .text")[0].innerText=""  
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