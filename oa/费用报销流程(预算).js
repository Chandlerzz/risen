function deal(){
  var from = "field33208"
  var to = "field33209"
  var concat =[]
  var detail1_count = WfForm.getDetailRowCount("detail_1");
  debugger
  for(var i = 0;i<detail1_count;i++){
     var value = WfForm.getFieldValue(from+"_"+i)
    if(!concat.includes(value)){
      concat.push(value)
    }  
 }
var result = WfForm.changeFieldValue(to,{value:concat.toString()})
}

WfForm.registerCheckEvent(WfForm.OPER_SUBMIT,function(callback){
    deal()
  callback()
})
