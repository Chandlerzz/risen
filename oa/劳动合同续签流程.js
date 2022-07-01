function deal()
{
  const htqdry= "field34978" 
  const XM = "field14970"
  const htqdryV = WfForm.getFieldValue(htqdry)
  WfForm.changeFieldValue(XM,{value:htqdryV})

}
WfForm.registerCheckEvent(WfForm.OPER_SUBMIT,function(callback){
  deal()
  callback()
})

