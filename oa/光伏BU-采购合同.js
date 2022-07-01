// 是否电子用印选择是    双方电子章选择是    业务分类名称显示内外部签署
// 是否电子用印选择是   双方电子章选择否     业务分类名称显示电子用印
// 是否电子签名选择否    清除个人签名和手机号

function deal() {
  // 是否双方电子章
  var sfsfdzz = "field34586"
  // 是否电子用印
  var sfdzyy = "field34585"
  // 业务分类名称
  var ywflmc = "field34622"
  //是否电子签名
  var sfdzqm = "field34589"
  // 个人手机号
  var grsjh = "field34602"
  var grqm = "field34601"
  // 否 is "1" 是 is "0" 
  // 外部签署 2920512226108350553
  // 电子用印 2773743637157589073
  var sfsfdzzV = parseInt(WfForm.getFieldValue(sfsfdzz))
  var sfdzyyV = parseInt(WfForm.getFieldValue(sfdzyy))
  var sfdzqmV = parseInt(WfForm.getFieldValue(sfdzqm))
  if(!sfdzyyV)
  {
    WfForm.changeFieldValue(ywflmc, {value:'2773743637157589073'}); 
    if (!sfsfdzzV) {
      WfForm.changeFieldValue(ywflmc, {value:'2920512226108350553'}); 
    }
  }
  if(sfdzqmV)
  {
    WfForm.changeFieldValue(grsjh, {value:''}); 
    WfForm.changeFieldValue(grqm, {value:''}); 
  }
}
WfForm.registerCheckEvent(WfForm.OPER_SAVE,function(callback){
  deal()
  callback()
})


