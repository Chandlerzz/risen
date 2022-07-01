function deal(){
  var from1 = "field31905"  //1
  var to1 = "field33352"  //3
  var from = "field33208" //2
  var to = "field33209"  //4
  var concat1 =[]
  var concat =[]
  var detail1_count = WfForm.getDetailRowCount("detail_1");
  debugger
  for(var i = 0;i<detail1_count;i++){
     var value = WfForm.getFieldValue(from+"_"+i)
    if(!concat.includes(value)){
      concat.push(value)
    }  
  }
  for(var i = 0;i<detail1_count;i++){
     var value = WfForm.getFieldValue(from1+"_"+i)
    if(!concat1.includes(value)){
      concat1.push(value)
    }  
 }
  WfForm.changeFieldValue(to,{value:concat.toString()})
  WfForm.changeFieldValue(to1,{value:concat1.toString()})
}

WfForm.registerCheckEvent(WfForm.OPER_SAVE+","+WfForm.OPER_SUBMIT,function(callback){
    deal()
  callback()
})
