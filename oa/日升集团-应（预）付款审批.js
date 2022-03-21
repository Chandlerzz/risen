// 当申请部门为非财务部门 付款公司只可以为东方日升新能源有限公司
function deal(){
  var sqbm = "field8611" //申请部门
  var fkgs = "field10437" //付款公司 
  var sqbmV = WfForm.getFieldValue(sqbm)
  const ids=[9,11,15,81,82,83,360,404,415,643,725,808,809,1024,1297,1298,1299,1300,1446,1480]
  const selection = $("[data-fieldmark^=field10437]")
  const arrow = $("[data-fieldmark^=field10437] span")
  if (ids.includes(parseInt(sqbmV))){
    selection[0].style.cssText=""
    arrow[0].setAttribute("class","ant-select-arrow icon-comps-downs")
    WfForm.changeFieldValue(fkgs,{value:""})
  }else{
    selection[0].style.cssText="pointer-events:none;"
    arrow[0].removeAttribute("class")
    WfForm.changeFieldValue(fkgs,{value:"0"})
  }
}
setInterval(function(){
  deal()
},300)