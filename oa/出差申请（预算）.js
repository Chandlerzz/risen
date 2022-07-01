var cfrq = WfForm.convertFieldNameToId("cfrq", "detail_1");
var ddrq = WfForm.convertFieldNameToId("ddrq", "detail_1");
jQuery().ready(function(){
    WfForm.registerCheckEvent(WfForm.OPER_SAVE+","+WfForm.OPER_SUBMIT,function(callback){
	   var rowArr = WfForm.getDetailAllRowIndexStr("detail_1").split(",");
        for(var i=0; i<rowArr.length; i++){
          var cfrq_v = WfForm.getFieldValue(cfrq+"_"+rowArr[i]);
			  	var ddrq_v = WfForm.getFieldValue(ddrq+"_"+rowArr[i]);
			  	var date = new Date(cfrq_v);
			  	var date1 = new Date(ddrq_v);
			  	if(date.getTime()>date1.getTime()){
			  	   alert("明细第"+(i+1)+"行中的开始时间不能大于结束时间，请修改！"); 	
             return;	
			  	}
        }
        callback();//继续提交需调用callback，不调用代表阻断
    });
    
    	WfForm.bindFieldChangeEvent("field31434",function(obj,id,value){
			var fje = WfForm.getFieldValue("field28232");
				
				if(value-fje>0){
					alert("手动预估金额要小于等于系统预估金额，请重写填写")
					WfForm.changeFieldValue("field31434", {value:""}); 
				}
		}); 
});
function dofunc()
{
    var sfjd  = "field30248";//酒店
    var sfjp  = "field30249";//机票
    var sfjdV = WfForm.getFieldValue(sfjd);
    var sfjpV = WfForm.getFieldValue(sfjp);
	var jd_detail = "detail_6"
	var jp_detail = "detail_2"
	var jd_detail_count = WfForm.getDetailRowCount(jd_detail);
	var jp_detail_count = WfForm.getDetailRowCount(jp_detail);
	//是 0 否 1
	if(sfjdV === "0"){
		if(jd_detail_count ===0 ){
			WfForm.addDetailRow(jd_detail,{});
		}
	}else{
		if(jd_detail_count >  0){
			WfForm.delDetailRow(jd_detail, "all");
		}
		
	}
	if(sfjpV === "0"){
		if(jp_detail_count ===0 ){
			WfForm.addDetailRow(jp_detail,{});
		}
	}else{
		if(jp_detail_count >  0){
			WfForm.delDetailRow(jp_detail, "all");
		}
		
	}
}
function dofunc1(){
  var hz = "field28234"; //护照
	var hz_detail = "field30281";
  var hzV = WfForm.getFieldValue(hz);
  var detail_list_str = WfForm.getDetailAllRowIndexStr("detail_6");
  var detail_list = detail_list_str.split(",");
    for(item of detail_list){
      var value = WfForm.changeFieldValue(hz_detail+"_"+item,{value:hzV});
    }
}

setInterval(function(){
    dofunc()
},1000)
function deal(){
  var yggh = "field30287"  // 工号
  var ccksrqnew = "field28216" // 出差开始日期
  var ccjsrqnew = "field28217" // 出差结束日期
  var cckssj = "field28245"
  var ccjssj = "field28246"
  var ygghV = WfForm.getFieldValue(yggh)
  var ccksrqnewV = WfForm.getFieldValue(ccksrqnew)
  var ccjsrqnewV = WfForm.getFieldValue(ccjsrqnew)
  var cckssjV = WfForm.getFieldValue(cckssj)
  var ccjssjV = WfForm.getFieldValue(ccjssj)
  var orderOverlapExceptionList  = null;
  var params1 = {
      "header":{
          "code":"checkOrder",
          "moduleCode":"orderBiz",
          "empRule":"1",
          "empInfo":ygghV,
          "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEYlNzb19BY2Nlc3NUb2tlbiIsImF1ZCI6IldlYiIsImNsaWVudElkIjoiUDNGMjhCSUZLR0ZMMEFOWCIsImlzcyI6IkRiU3NvU2VydmVyIiwiZXhwIjoxNjU0NTQ0NjQ1LCJpYXQiOjE2NTA5NDEwNDV9.wwFMs_OYHh8moQXCXVBB_6gUkvdqtzwLkFz_pGK4w3Y",
          "clientId":"P3F28BIFKGFL0ANX"
      },
      "body":{
          "complianceOrder":{
              "orderCategory":"2",
              "tripWay":"4",
              "beginDate":ccksrqnewV,
              "endDate":ccjsrqnewV,
              "beginTime":cckssjV,
              "endTime":ccjssjV
          }
      }
  }
  debugger
  $.ajax({
          type: 'POST',
          // url: 'https://dhg.risen.com/test/api',
          url: 'https://api.risen.com/third/api/test',
          data:JSON.stringify(params1),
          contentType: "application/json; charset=utf-8",
          
          async: false,
          success: function (data, status) {
            debugger
            if(data.data)
            {
             
              orderOverlapExceptionList = data.data.orderOverlapExceptionList;
            }
              return;
          }
      });
  if(orderOverlapExceptionList)
  {
    alert("您的出差流程时间重合")
    return 1
  }
}
WfForm.registerCheckEvent(WfForm.OPER_SUBMIT,function(callback){
    if(deal()){
        return
    }
    dofunc1()
  callback()
})
