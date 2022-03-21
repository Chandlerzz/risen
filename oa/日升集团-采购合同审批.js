

// 需求
// 日升集团-采购合同审批
// 合同类别（htlb）
// 资本类（O）合同类别选择资本类的时候，非资本类（fzbl）、行政办公类（xzbgl）、外包服务（wbfw）、金融类（jrl）字段设
// 置为空值
// 非资本类(1)合同类别选择非资本类的时候，资本类（zbl）、固定资产（gdzc）、金融类（jrl）字段设置为空值
// 金融类(2)合同类别选择金融类的时候，非资本类（fzbl）、行政办公类（xzbgl）、外包服务（wbfw）、资本类（zbl）、固定资
// 产（gdzc）字段设置为空值

// 分析
// 提交类流程，当流程提交的时候判断合同类别
// 合同类别
// 字段ID : field27946
// 数据库字段名称 : htlb

// 非资本类:
// 字段ID : field27948
// 数据库字段名称 : fzbl
// 字段ID : field27951
// 数据库字段名称 : xzbgl
// 字段ID : field28743
// 数据库字段名称 : wbfw

// 资本类：
// 字段ID : field27947
// 数据库字段名称 : zbl
// 字段ID : field27950
// 数据库字段名称 : gdzc

// 金融类
// 字段ID : field27949
// 数据库字段名称 : jrl
//需求 合同是否签字 为否是清除个人签名和手机号
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
    // 合同类别
    var htlb = "field27946";
    // 非资本类:
    var fzbl = "field27948";
    var xzbgl = "field27951";
    var wbfw = "field28743";
    // 资本类：
    var zbl = "field27947";
    var gdzc = "field27950";
    // 金融类
    var jrl = "field27949";
    //合同类别的值
    var htlbV = WfForm.getFieldValue(htlb);
    if (htlbV === "0"){
         // 非资本类:
        WfForm.changeFieldValue(fzbl,{value:""});
        WfForm.changeFieldValue(xzbgl,{value:""});
        WfForm.changeFieldValue(wbfw,{value:""});
        // 金融类
        WfForm.changeFieldValue(jrl,{value:""});
    }
    if(htlbV ==="1"){
         // 资本类：
        WfForm.changeFieldValue(zbl,{value:""});
        WfForm.changeFieldValue(gdzc,{value:""});
        // 金融类
        WfForm.changeFieldValue(jrl,{value:""});
    }
    if(htlbV ==="2"){
        // 资本类：
        WfForm.changeFieldValue(zbl,{value:""});
        WfForm.changeFieldValue(gdzc,{value:""});
        // 非资本类:
        WfForm.changeFieldValue(fzbl,{value:""});
        WfForm.changeFieldValue(xzbgl,{value:""});
        WfForm.changeFieldValue(wbfw,{value:""});
    }
    deal()
    deal1()
    callback();
})
