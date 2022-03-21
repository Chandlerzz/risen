//日升电力-销售合同审批

// 字段ID : field30964
// 数据库字段名称 : sfhtqz

// 字段ID : field29771
// 数据库字段名称 : grqm

// 字段ID : field29772
// 数据库字段名称 : sjh

function deal(){
        debugger
        var sfhtqz = "field30964";
        var grqm = "field29771";
        var sjh = "field29772";
        var sfhtqzV = WfForm.getFieldValue(sfhtqz);
        if(sfhtqzV=== "1"){
            WfForm.changeFieldValue(grqm,{value:""});
                WfForm.changeFieldValue(sjh,{value:""});
        }
}

//---------------------------------
//是否电子用印 为否是 需要提交时清除 用印公司 印章名称-浏览按钮
// 字段ID : field29769
// 数据库字段名称 : sfsydzyy

// 字段ID : field29755
// 数据库字段名称 : yygs

// 字段ID : field29770
// 数据库字段名称 : yzmcllan


function deal1(){
    var sfsydzyy = "field29769";
    var yygs = "field29755";
    var yzmcllan = "field29770";
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

