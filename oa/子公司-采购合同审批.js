// 需求
// 子公司-采购合同审批
// 合同类别（htlb）
// 资本类（O）合同类别选择资本类的时候，非资本类（fzbl）、行政办公类（xzbgl）、外包服务（wbfw）、金融类（jrl）字段设
// 置为空值
// 非资本类(1)合同类别选择非资本类的时候，资本类（zbl）、固定资产（gdzc）、金融类（jrl）字段设置为空值
// 金融类(2)合同类别选择金融类的时候，非资本类（fzbl）、行政办公类（xzbgl）、外包服务（wbfw）、资本类（zbl）、固定资
// 产（gdzc）字段设置为空值

// 分析
// 提交类流程，当流程提交的时候判断合同类别
// 合同类别
// 字段ID : field29419
// 数据库字段名称 : htlb

// 非资本类:
// 字段ID : field29421
// 数据库字段名称 : fzbl
// 字段ID : field29424
// 数据库字段名称 : xzbgl
// 字段ID : field28743
// 数据库字段名称 : wbfw

// 资本类：
// 字段ID : field29420
// 数据库字段名称 : zbl
// 字段ID : field27950
// 数据库字段名称 : gdzc

// 金融类
// 字段ID : field29422
// 数据库字段名称 : jrl

//----------------------------------------
//需求 合同是否签字 为否是清除个人签名和手机号
// 字段ID : field31359
// 数据库字段名称 : htsfqz

// 字段信息
// 字段ID : field29427
// 数据库字段名称 : grqm
// 字段信息

// 字段ID : field29428
// 数据库字段名称 : sjh

function deal(){
        var htsfqz = "field31359";
        var grqm = "field29427";
        var sjh = "field29428";
        var htsfqzV = WfForm.getFieldValue(htsfqz);
        if(htsfqzV === "1"){
            WfForm.changeFieldValue(grqm,{value:""});
                WfForm.changeFieldValue(sjh,{value:""});
        }
        console.log(htsfqzV);
}
function test(){
    var grqm = "field29427";
    var sjh = "field29428";
    var result1 = WfForm.getFieldValue(grqm);
    var result2 = WfForm.getFieldValue(sjh);
}

//---------------------------------
//是否电子用印 为否是 需要提交时清除 用印公司 印章名称-浏览按钮
// 字段ID : field29425
// 数据库字段名称 : sfsydzyy

// 字段ID : field29432
// 数据库字段名称 : yygsfzgs

// 字段ID : field29426
// 数据库字段名称 : yzmcllan

function deal1(){
    var sfsydzyy = "field29425";
    var yygsfzgs = "field29432";
    var yzmcllan = "field29426";
    _deal1(sfsydzyy,yygsfzgs,yzmcllan)
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
    var htlb = "field29419";
    // 非资本类:
    var fzbl = "field29421";
    var xzbgl = "field29424";
    var wbfw = "field28743";
    // 资本类：
    var zbl = "field29420";
    var gdzc = "field27950";
    // 金融类
    var jrl = "field29422";
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
    deal();
    deal1();
    callback();
 })