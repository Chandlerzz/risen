// 日升集团刻章制发申请表
// 将明细表印章授权人 统一加到 底部
// 字段ID : field30958
// 数据库字段名称 : yzsqr
// 字段ID : field31638
// 数据库字段名称 : yzsqrhz

function deal(){
  var yzsqr = "field30958";
  var yzsqrhz = "field31638";
  var detail1_count = 1;
 
  detail1_count = WfForm.getDetailRowCount("detail_1");
  var concat = []
  for(var i = 0;i<detail1_count;i++){
     var value = WfForm.getFieldValue(yzsqr+"_"+i);
     concat.push(value)
  }
  var concatSet = new Set(concat)
  concat = Array.from(concatSet)
  var concatString = concat.toString()
  debugger
  WfForm.changeFieldValue(yzsqrhz,{value:concatString});
}

WfForm.registerCheckEvent(WfForm.OPER_SUBMIT,function(callback){
    deal()
    callback()
})
