
var cfrq = WfForm.convertFieldNameToId("cfrq", "detail_1");
var ddrq = WfForm.convertFieldNameToId("ddrq", "detail_1");
jQuery().ready(function(){
    WfForm.registerCheckEvent(WfForm.OPER_SAVE+","+WfForm.OPER_SUBMIT,function(callback){
	   var rowArr = WfForm.getDetailAllRowIndexStr("detail_1").split(",");
        for(var i=0; i<rowArr.length; i++){
          var cfrq_v = WfForm.getFieldValue(cfrq+"_"+rowArr[i]);
			  	var ddrq_v = WfForm.getFieldValue(ddrq+"_"+rowArr[i]);
			  	var date = new Date(cfrq_v);
			  	var date1 = new Date(ddrq_v);
			  	if(date.getTime()>date1.getTime()){
			  	   alert("明细第"+(i+1)+"行中的开始时间不能大于结束时间，请修改！"); 	
             return;	
			  	}
        }
        callback();//继续提交需调用callback，不调用代表阻断
    });
    
    	WfForm.bindFieldChangeEvent("field31434",function(obj,id,value){
			var fje = WfForm.getFieldValue("field28232");
				
				if(value-fje>0){
					alert("手动预估金额要小于等于系统预估金额，请重写填写")
					WfForm.changeFieldValue("field31434", {value:""}); 
				}
		}); 
});

function dofunc()
{
    var sfjd  = "field30248";//酒店
    var sfjp  = "field30249";//机票
    var sfjdV = WfForm.getFieldValue(sfjd);
    var sfjpV = WfForm.getFieldValue(sfjp);
	var jd_detail = "detail_6"
	var jp_detail = "detail_2"
	var jd_detail_count = WfForm.getDetailRowCount(jd_detail);
	var jp_detail_count = WfForm.getDetailRowCount(jp_detail);
	//是 0 否 1
	if(sfjdV === "0"){

		if(jd_detail_count ===0 ){
			WfForm.addDetailRow(jd_detail,{});
		}
	}else{
		if(jd_detail_count >  0){
			WfForm.delDetailRow(jd_detail, "all");
		}
		
	}
	if(sfjpV === "0"){
		if(jp_detail_count ===0 ){
			WfForm.addDetailRow(jp_detail,{});
		}
	}else{
		if(jp_detail_count >  0){
			WfForm.delDetailRow(jp_detail, "all");
		}
		
	}
}
setInterval(function(){
    dofunc()
},1000)
