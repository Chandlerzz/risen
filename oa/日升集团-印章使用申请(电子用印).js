//日升集团-印章使用申请(电子用印)
// 字段ID : field28061
// 数据库字段名称 : sfsydzyy
// 字段ID : field29692
// 数据库字段名称 : yjzgs
// 字段ID : field29574
// 数据库字段名称 : yzmc

// 当是否使用电子用印点击否的时候，清除明细表中的内容
function deal(){
  var sfsydzyy = "field28061";
  var yjzgs = "field29692";
  var yzmc = "field29574";
  var yzlb = "field30109";
  var yzlbV = WfForm.getFieldValue(yzlb);
  var sfsydzyyV = WfForm.getFieldValue(sfsydzyy);
  var detail1_count = 1;
  debugger
  if(sfsydzyyV === "0" || yzlbV .indexOf("7") === 0 ){
    
     detail1_count = WfForm.getDetailRowCount("detail_1");
     var count = 0
     for(var i = 0;i<detail1_count;i++){
        var value = WfForm.getFieldValue(yjzgs+"_"+i);
        if(value !== ""){
          count = count + 1
        }
        value = WfForm.getFieldValue(yzmc+"_"+i);
        if(value !== ""){
          count = count + 1
        }
     }
     if (count < detail1_count*2){
       alert("请填写明细表中用/借章公司和印章名称")
       return false
     }
     
     
   }
   return true
}

  WfForm.registerCheckEvent(WfForm.OPER_SUBMIT,function(callback){
    var flag = deal()
    if(flag === false){
      return
    }
    // 印章类别
    const yzlb="field30109"

    // 印章所属公司
    const zszgs="field29572"
    
    const yzlbs = WfForm.getFieldValue(yzlb);

    const zszgss = WfForm.getFieldValue(zszgs);

    let Str =yzlbs.split(",");

    // 印章类别总和 
    let  newyzlb  =''
    Str.forEach(function(index) {
        if(index=='0'){newyzlb=newyzlb+'公章/'}
        if(index=='1'){newyzlb=newyzlb+'法人章/'}
        if(index=='2'){newyzlb=newyzlb+'财务专用章/'}
        if(index=='3'){newyzlb=newyzlb+'报关专用章/'}
        if(index=='4'){newyzlb=newyzlb+'项目专用章/'}
        if(index=='5'){newyzlb=newyzlb+'项目公司章/'}
        if(index=='6'){newyzlb=newyzlb+'工会章/'}
        if(index=='7'){newyzlb=newyzlb+'党总支章/'}
    });
   
    let information ='印章类别为：'+newyzlb.substring(0,newyzlb.length-1)+"<br>所属公司为: "+zszgss
    WfForm.showConfirm(information,function(){
        callback();
    },function(){
       
    },{
        title:"信息确认",       //弹确认框的title，仅PC端有效
        okText:"确定",          //自定义确认按钮名称
        cancelText:"取消"     //自定义取消按钮名称
    });
    
//   
    })