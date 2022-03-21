//日升电力-采购合同审批

// 字段ID : field30959
// 数据库字段名称 : htsfqz

// 字段ID : field28022
// 数据库字段名称 : grqm

// 字段ID : field28023
// 数据库字段名称 : sjh

function deal(){
        debugger
        var htsfqz = "field30959";
        var grqm = "field28022";
        var sjh = "field28023";
        var htsfqzV = WfForm.getFieldValue(htsfqz);
        if(htsfqzV === "1"){
            WfForm.changeFieldValue(grqm,{value:""});
                WfForm.changeFieldValue(sjh,{value:""});
        }
        console.log(htsfqzV);
}

//---------------------------------
//是否电子用印 为否是 需要提交时清除 用印公司 印章名称-浏览按钮
// 字段ID : field27952
// 数据库字段名称 : sfsydzyy

// 字段ID : field26986
// 数据库字段名称 : yygs

// 字段ID : field28000
// 数据库字段名称 : yzmcllan

function deal1(){
    var sfsydzyy = "field27952";
    var yygs = "field26986";
    var yzmcllan = "field28000";
    _deal1(sfsydzyy,yygs,yzmcllan)
}

function _deal1(a,b,c){
    var aV = WfForm.getFieldValue(a);
    if(aV === "1"){
        WfForm.changeFieldValue(b,{value:""});
        WfForm.changeFieldValue(c,{value:""});
    }
}
WfForm.registerCheckEvent(WfForm.OPER_SUBMIT,function(callback){
    deal()
    deal1()
    callback()
})