
// 分子公司（基地）-销售合同审批

// 字段ID : field31366
// 数据库字段名称 : htsfqz

// 字段ID : field29053
// 数据库字段名称 : grqm

// 字段ID : field29054
// 数据库字段名称 : grqmsjh



function deal(){
        debugger
        var htsfqz = "field31366";
        var grqm = "field29053";
        var grqmsjh = "field29054";
        var htsfqzV = WfForm.getFieldValue(htsfqz);
        if(htsfqzV=== "1"){
            WfForm.changeFieldValue(grqm,{value:""});
                WfForm.changeFieldValue(grqmsjh,{value:""});
        }
}

function test(){
    var grqm = "field29053";
    var grqmsjh = "field29054";
    var result1 = WfForm.getFieldValue(grqm);
    var result2 = WfForm.getFieldValue(grqmsjh);
}

//---------------------------------
//是否电子用印 为否是 需要提交时清除 用印公司 印章名称-浏览按钮
// 字段ID : field29051
// 数据库字段名称 : sfdzyy

// 字段ID : field29433
// 数据库字段名称 : yygs

// 字段ID : field29055
// 数据库字段名称 : yzmcllan

function deal1(){
    var sfdzyy = "field29051";
    var yygs = "field29433";
    var yzmcllan = "field29055";
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