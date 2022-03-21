//日升集团-销售合同审批
//需求 合同是否签字 为否是清除个人签名和手机号

// 字段ID : field31367
// 数据库字段名称 : htsfqz

// 字段ID : field27953
// 数据库字段名称 : grqm

// 字段ID : field27954
// 数据库字段名称 : grqmsjh

function deal(){
        debugger
        var htsfqz = "field31367";
        var grqm = "field27953";
        var grqmsjh = "field27954";
        var htsfqzV = WfForm.getFieldValue(htsfqz);
        if(htsfqzV=== "1"){
            WfForm.changeFieldValue(grqm,{value:""});
                WfForm.changeFieldValue(grqmsjh,{value:""});
        }
}

//---------------------------------
//是否电子用印 为否是 需要提交时清除 用印公司 印章名称-浏览按钮
字段ID : field26999
数据库字段名称 : sfdzyy

字段ID : field26995
数据库字段名称 : yygs

字段ID : field28021
数据库字段名称 : yzmcllan


function deal1(){
    var sfdzyy = "field26999";
    var yygs = "field26995";
    var yzmcllan = "field28021";
    _deal1(sfdzyy,yygs,yzmcllan)
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

