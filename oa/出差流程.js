var xcfj_M = "field19392";
var xzfj_M = "field19560";
var xcfj_D = "field19558_";
var xzfj_D = "field19559_";
var cfdgjlx = "field19409_";
var mddgjlx = "field19410_";
var rzcs = "field19388_";
var needHotel = "field19393";
var cclx = "field19391";
var hzywm = "field19556";
function addname (){
    const person = $("[data-fieldmark^=field19555]");
    const department = $("[data-fieldmark^=field26390]");
    const personName = $("a",person).text();
    const personId = $("input",person).val();
    const departmentName = $("a",department).text();
    const departmentId = $("input",department).val();
    const personField = "field26391";
    const departmentField = "field26392";
    const person1 = $("[data-fieldmark^=field26391]")
    for(let i=0;i<person1.length;i++){
        WfForm.changeFieldValue(personField+"_"+i, {
            value: personId,
            specialobj:[
                {id:personId,
                name:personName
                }
            ]
        });
        WfForm.changeFieldValue(departmentField+"_"+i, {
            value: departmentId,
            specialobj:[
                {id:departmentId,
                name:departmentName
                }
            ]
        });
    }
}
function checkTime(){
    const count = $("[data-fieldmark^=field19519]").length
    const startDate = "field19519_"
    const startTime = "field19520_"
    const endDate ="field25300_"
    const endTime = "field19521_"
    if(count===0){
        return true
    }
    for (let i = 0; i < count; i++) { 
        var startDateValue = WfForm.getFieldValue(startDate+i)
        var endDateValue = WfForm.getFieldValue(endDate+i)
        var startTimeValue = WfForm.getFieldValue(startTime+i)
        var endTimeValue = WfForm.getFieldValue(endTime+i)

        if(startDateValue===""||endDateValue==="" || startTimeValue==="" || endTimeValue==="")
        {
	        return	true
        }

    }
    if( endDateValue<startDateValue ){
        alert("请检查您的日期，开始日期必须大于等于日期")
        return  false
    }else if(endDateValue === startDateValue){
        if( endTimeValue< startTimeValue ){
        alert("请检查您的时间，开始时间必须大于等于结束时间")
        return false
        }
    }else if(endDateValue > startDateValue){
        return true
    }
    

}
setInterval(function(){
    addname()
},1000)
$().ready(function(){
    WfForm.bindFieldChangeEvent(needHotel, function(obj,id,value){
        var needHotel_v = value;
        if (needHotel_v == '1') {
            $("#HotelDetailRow").hide();
            WfForm.delDetailRow("detail_6", "all");
        } else {
            $("#HotelDetailRow").show();
        }
        });
    WfForm.registerCheckEvent(WfForm.OPER_SAVE+","+WfForm.OPER_SUBMIT,function(callback){
        var xcFlag = false;
        var xzFlag = false;
        var returnFlag = true;
        addname();
        returnFlag = checkTime();
        var hh = WfForm.getDetailAllRowIndexStr("detail_1");
        var detailMarkList = hh.split(",");
        for ( var i = 0; i < detailMarkList.length; i++) {           
            var cfdgjlx_v =  WfForm.getFieldValue(cfdgjlx+i);
            var mddgjlx_v =  WfForm.getFieldValue(mddgjlx+i);
            var xcfj_v =  WfForm.getFieldValue(xcfj_D+i);
            if((cfdgjlx_v != mddgjlx_v) && xcfj_v == '0'){
                returnFlag = false;
            }
            if(!xcFlag){
                var xcfj_D_v = WfForm.getFieldValue(xcfj_D+i);
                if(xcfj_D_v == '0'){
                    xcFlag = true;
                }
            }
            if(!xzFlag){
                var xzfj_D_v =  WfForm.getFieldValue(xzfj_D+i);
                if(xzfj_D_v == '0'){
                    xzFlag = true;
                }
            }
        }
        if(xcFlag){
            WfForm.changeFieldValue(xcfj_M, {value:'0'}); 
        }else{
            WfForm.changeFieldValue(xcfj_M, {value:'1'}); 
        }
        if(xzFlag){
            WfForm.changeFieldValue(xzfj_M, {value:'0'}); 
        }else{
            WfForm.changeFieldValue(xzfj_M, {value:'1'}); 
        }
        if(!returnFlag){
            alert("国内到国外的飞机不能携程订票！");
        }
        var cclx_v = WfForm.getFieldValue(cclx);
        var hzywm_v = WfForm.getFieldValue(hzywm);
        if(cclx_v == 'I' && (hzywm_v == null || hzywm_v == '')){
            returnFlag = false;
            alert("国际出差必须填写护照名！");
        }
        var indexnum5 = ( WfForm.getDetailAllRowIndexStr("detail_6").split(",")[0]) * 1.0;
        var rzcs_v = WfForm.getFieldValue(rzcs+indexnum5);
        if ((rzcs_v == null || rzcs_v == '') && WfForm.getFieldValue(needHotel) == '0') {
            returnFlag = false;
            alert("预定酒店后必须填写酒店信息!");
        }
        // if(!startEndTimeCheck("field19693", "field19694", null)){
        //     returnFlag = false;
        //     alert("出差开始日期不能晚于出差结束日期");
        // }
        // if(!startEndTimeCheck("field19520", "field19521", "detail_8")){
        //     returnFlag = false;
        //     alert("出差开始时间不能晚于出差结束时间");
        // }
        
        if(returnFlag){
            callback();
        }
    });
});

