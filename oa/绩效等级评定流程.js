// 绩效等级评定流程
// 需求  1.是否占强人数统计,是的填入待评定级人数 否的填入不占强比例人数
//      2.带评定人的评定等级人数统计到对应等级实际人数框中
//      3.当前等级报错规则,当前等级至前面所有等级的实际人数需要小于等于设定修正人数
//      4.第四季度和年度只是字段不同逻辑相同


// --------------------------------------
// 绩效等级明细表
// ----------------------------------------
// 是否占强分比例
// 字段ID : field26830
// 数据库字段名称 : sfzqfbl
// 第四季度等级
// 字段ID : field31699
// 数据库字段名称 : dsjddj1
// 年度等级
// 字段ID : field31700
// 数据库字段名称 : nddj

function setAmmout(ammount,field){
    WfForm.changeFieldValue(field,{value:ammount});
}

function getSameDegreeAmmount(field,field1){
    //degree DG
     var DG = {
         svalue:0,
         aplusvalue:0,
         avalue:0,
         bcvalue:0
     }
    detail1_count = WfForm.getDetailRowCount("detail_1");

    for(var i = 0;i<detail1_count;i++){
        var value = WfForm.getFieldValue(field+"_"+i);
        var value1 = WfForm.getFieldValue(field1+"_"+i);
        //是:0 否:1
        if (value1 === "0"){
            //S:0 A+:1 A:2 BC:3 
            if(value === "0"){
                DG.svalue = DG.svalue + 1
            }
            else if(value === "1"){
                DG.aplusvalue = DG.aplusvalue + 1
            }
            else if(value === "2"){
                DG.avalue = DG.avalue + 1
            }
            else if(value === "3"){
                DG.bcvalue = DG.bcvalue + 1
            }
            else if(value === "4"){
                DG.bcvalue = DG.bcvalue + 1
            }
         }
       
           
    }
    return DG
}

function getZQ(field){
    // 占强 ZQ
     var ZQ = {
         tvalue:0,
         fvalue:0
     }
    detail1_count = WfForm.getDetailRowCount("detail_1");
    for(var i = 0;i<detail1_count;i++){
        var value = WfForm.getFieldValue(field+"_"+i);
        //是:0 否:1
        if(value === "0" ){
             ZQ.tvalue =ZQ.tvalue + 1 
        } 
        else if(value === "1"){
             ZQ.fvalue = ZQ.fvalue + 1
        }
    }
    return ZQ

}

function check(sumset, sumreal,fieldset,fieldreal,fielderr,start,end){
    sumset = sumset + parseInt(WfForm.getFieldValue(fieldset));
    sumreal = sumreal + parseInt(WfForm.getFieldValue(fieldreal));
   if(sumreal > sumset){
       setAmmout("超出设定比例/人数",fielderr)
       return 0
   }
    if (start === end){
        return 0
    }
    setAmmout("",fielderr)
    start = start + 1
    fieldset = fieldplusplus(fieldset)
    fieldreal = fieldplusplus(fieldreal)
    fielderr = fieldplusplus(fielderr)
    return check(sumset, sumreal, fieldset, fieldreal, fielderr, start, end)
}

function fieldsplit(field,start){
    lastindex = field.length
    rightvalue = field.substring(start,lastindex)
    if(isNaN(rightvalue)){
          start = start + 1
          return fieldsplit(field,start)
    }
    leftvalue = field.substring(0,start)
    return {
        rightvalue,
        leftvalue
    }
}

function fieldplusplus(field){
    var fieldsplitobj = fieldsplit(field,0)
    fieldsplitobj.rightvalue = parseInt(fieldsplitobj.rightvalue)+1
    var newfield = fieldsplitobj.leftvalue + fieldsplitobj.rightvalue
    return newfield
}

// ----------------------------
// 绩效等级汇总（第四季度）
// ----------------------------
// 不占强分比例人数	
// 字段ID : field26831
// 数据库字段名称 : bzqfblrs
// 待评级人数	
// 字段ID : field25199
// 数据库字段名称 : dpjrsbhmrdj

//设定修正人数1
// 字段ID : field25169
// 数据库字段名称 : sdxzrs1


// 实际人数1
// 字段ID : field25173
// 数据库字段名称 : sjrs1
// ---------------------------------------
// function	
// 绩效等级汇总（第四季度）
//----------------------------------------
function deal(){
    var bzqfblrs = "field26831" // 不占强分比例人数
    var dpjrsbhmrdj = "field25199"// 待评级人数
    var sdxzrs1 = "field25169" //设定修正人数1
    var sdxzrs2 = "field25170" //设定修正人数2
    var sdxzrs3 = "field25171" //设定修正人数3
    var sdxzrs4 = "field25172" //设定修正人数4
    var sjrs1 = "field25173" //实际人数1
    var sjrs2 = "field25174" //实际人数2
    var sjrs3 = "field25175" //实际人数3
    var sjrs4 = "field25176" //实际人数4
    var yc1 = "field25208"  //异常
    var sfzqfbl = "field26830" //是否占强分比例
    var dsjddj1 = "field31699" //第四季度等级
    var ZQ = getZQ(sfzqfbl)
    var DG = getSameDegreeAmmount(dsjddj1,sfzqfbl)
    setAmmout(ZQ.tvalue,dpjrsbhmrdj)
    setAmmout(ZQ.fvalue,bzqfblrs)
    setAmmout(DG.svalue,sjrs1)
    setAmmout(DG.aplusvalue,sjrs2)
    setAmmout(DG.avalue,sjrs3)
    setAmmout(DG.bcvalue,sjrs4)
    check(0,0,sdxzrs1,sjrs1,yc1,1,4)

}
// -------------------------------
// 绩效等级汇总（年度）
// -------------------------------
// 不占强分比例人数	
// 字段ID : field31665
// 数据库字段名称 : bzqfblrsnd
// 待评级人数	
// 字段ID : field31666
// 数据库字段名称 : dpjrs

//设定修正人数5
// 字段ID : field31675
// 数据库字段名称 : sdxzrs5

// 实际人数
// 实际人数5
// 字段ID : field31679
// 数据库字段名称 : sjrs5

function deal1(){
    var bzqfblrsnd = "field31665" // 不占强分比例人数
    var dpjrs = "field31666"// 待评级人数
    var sdxzrs5 = "field31675" //设定修正人数5
    var sdxzrs6 = "field25176" //设定修正人数6
    var sdxzrs7 = "field25177" //设定修正人数7
    var sdxzrs8 = "field25178" //设定修正人数8
    var sjrs5 = "field31679" //实际人数5
    var sjrs6 = "field31680" //实际人数6
    var sjrs7 = "field31681" //实际人数7
    var sjrs8 = "field31682" //实际人数8
    var yc5 = "field31683" //异常
    var sfzqfbl = "field26830" //是否占强分比例
    var nddj = "field31700" //年度等级
    var ZQ = getZQ(sfzqfbl)
    var DG = getSameDegreeAmmount(nddj,sfzqfbl)
    setAmmout(ZQ.tvalue,dpjrs)
    setAmmout(ZQ.fvalue,bzqfblrsnd)
    setAmmout(DG.svalue,sjrs5)
    setAmmout(DG.aplusvalue,sjrs6)
    setAmmout(DG.avalue,sjrs7)
    setAmmout(DG.bcvalue,sjrs8)
    check(0,0,sdxzrs5,sjrs5,yc5,1,4)
}


// --------------------------------------------
// main
//---------------------------------------------
window.setInterval(function(){
  deal()
  deal1()
},1000)