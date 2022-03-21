function deal(){
    var gryhk = "field28490"
    var gryhkV = WfForm.getFieldValue(gryhk)
    if (gryhkV.length === 15 || gryhkV.length === 16 || gryhkV.length === 19){
        return 0
    }else{
        alert("银行卡号的位数为19位，信用卡的位数位16位，存折的卡号位数为15位。您的卡号位数不正确，请核对后重新填写")
        return 1
    }
}


WfForm.registerCheckEvent(WfForm.OPER_SUBMIT,function(callback){
    if(deal()){
        return
    }
})