
// 转正（试用/考察）申请流程（试用）

// 当试用期时间不等于 3 和 6 个月时，提示用户试用期时间应该是3 和 6 个月 请和人事确认试用期时间

// 字段ID : field28921
// 数据库字段名称 : syksrq

// 字段ID : field28922
// 数据库字段名称 : syjsrq
function deal(callback){
        var flag = false;
        var syksrq = "field28921";
        var syjsrq = "field28922";
       
        var syksrqV = WfForm.getFieldValue(syksrq);
        var syjsrqV = WfForm.getFieldValue(syjsrq);
        var syksrqL = syksrqV.split("-");
        var syjsrqL = syjsrqV.split("-");
        var span = (syjsrqL[0] - syksrqL[0])*12+(syjsrqL[1] - syksrqL[1]); 
        if (span!==3 && span !==6) {
            var information = "试用期时间应该是3 和 6 个月, 请和人事确认试用期时间";
            WfForm.showConfirm(information,function(){
                callback()
                    
                },function(){

                },{
                    title:"信息确认",       //弹确认框的title，仅PC端有效
                    okText:"确定",          //自定义确认按钮名称
                    cancelText:"取消"     //自定义取消按钮名称
                }
            );
        }else{
                callback()
        }     
}


WfForm.registerCheckEvent(WfForm.OPER_SUBMIT,function(callback){
    deal(callback)
})

function test(dt){
     var syksrq = "field28921";
     var syjsrq = "field28922";

     WfForm.changeFieldValue(syjsrq,{value:dt});
}

