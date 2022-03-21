// 转正（试用/考察）申请流程
// 1.当核定职级大于等于39时，360评价必填（分子公司）
// 2.当核定职级大于等于40时，360评价必填（集团）
// 3.当核定职级小于39时，360评价不能填（分子公司）
// 4.当核定职级小于40时，360评价不能填（集团）
// todo 进来首先把360评介禁止掉，等
// 集团只有一个，其余都是分子公司 集团的id=8
//公司分部页面id    field24265
// 核定职级         field24294
// 360 评价        field24277
//disabled the input and remove the value
let degree = 39;
let status = true;
const companyIdField = "field24265";
const checkedDegreeField = "field24294";
const commentField = "field24277";

const companyId = WfForm.getFieldValue(companyIdField);
enable_disable(status)
if (companyId === "8"){
    degree = 40

}

$("#"+checkedDegreeField).focusout(function(){
    let checked_degree = WfForm.getFieldValue(checkedDegreeField);
    if(checked_degree === ""){
        checked_degree = 0
    }else {
        checked_degree = parseInt(checked_degree)
    }
    if (checked_degree >= degree){
        status = false
    } else {
        status = true
    }
    enable_disable(status);
})
 WfForm.registerCheckEvent(WfForm.OPER_SAVE+","+WfForm.OPER_SUBMIT,function(callback){
     let checked_degree = WfForm.getFieldValue(checkedDegreeField);
     let comment = WfForm.getFieldValue(commentField);
     if(checked_degree === ""){
        checked_degree = 0
    }else {
        checked_degree = parseInt(checked_degree)
    }
     if (checked_degree>=degree && comment ===""){
         alert("请填写您的360评价结果")
         return 
     }
     callback()
 })
//diable input
function enable_disable(status) {
    if(status === true){
        $("#"+commentField).val("");
    }
    $("#"+commentField).prop('disabled', status);

}