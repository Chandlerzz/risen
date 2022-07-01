
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
            if(data.data)
            {
              debugger
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
})


