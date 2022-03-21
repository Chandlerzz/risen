//    1.【不占强分比例人数】=绩效等级明细表表中【是否占强分比例】选择【否】 //强分强制分布
//     2.【待评级人数】=绩效等级明细表表中【是否占强分比例】选择【是】
//     3.【不占强分比例人数】比例设定人数/设定修正人数/实际人数=【不占强分比例人数】
//     4.【S（系数1.3）实际人数】=绩效等级明细表表中【是否占强分比例】选择【是】，且【绩效等级】选择【S】
//     5.A+、A、B、C实际人数，同理
// 不占强分 field26831span
  let table = "";
  let total = "";
  let aa ="" ;
  let bb ="";
   let cc ="" ;
  let dd ="";
  const reTrue = />是</g;
  const reFalse = />否</g;
  const reA = />A</g;
  const reAPlus = />A\+</g;
  const reBC = />[BC]</g;
  const reS = />S</g;
  $("#field25169").focus(function(){aa = setInterval(function(){table = $("#oTable0").html();addValue(table)},300)});
  $("#field25169").blur(function(){setTimeout(function(){clearInterval(aa);console.log("aaaaa")},1000)});
  $("#field25170").focus(function(){bb = setInterval(function(){table = $("#oTable0").html();addValue(table)},300)});
  $("#field25170").blur(function(){setTimeout(function(){clearInterval(bb);console.log("aaaaa")},1000)});
    $("#field25171").focus(function(){cc = setInterval(function(){table = $("#oTable0").html();addValue(table)},300)});
  $("#field25171").blur(function(){setTimeout(function(){clearInterval(cc);console.log("aaaaa")},1000)});
    $("#field25172").focus(function(){dd = setInterval(function(){table = $("#oTable0").html();addValue(table)},300)});
  $("#field25172").blur(function(){setTimeout(function(){clearInterval(dd);console.log("aaaaa")},1000)});
 
  window.setInterval(function(){
    if(total === $(".excelMainTable").html()){
      
    }
    else{
      total = $(".excelMainTable").html();
      table = $("#oTable0").html();
      setTimeout(function(){table = $("#oTable0").html();addValue(table);},300)
      addValue(table)
    }
  },300);
  function getContent(){
  const html = $(".detail_data_row")
  let aa = ""
  for(var i=0;i<html.length;i++){
    const content = html[i].innerHTML;
    const flag = content.match(reFalse);

    if(flag === null){
      aa = aa+content
    }
  }
  return aa;
  }

function addValue(table){
  const arrayTrue = [...table.matchAll(reTrue)];
  $("#field25199").val(arrayTrue.length);
  console.log(arrayTrue.length)
  const arrayFalse = [...table.matchAll(reFalse)];
  $("#field26831").val(arrayFalse.length);
  $("#field26832").val(arrayFalse.length);
   $("#field26834").val(arrayFalse.length);
   $("#field26833").val(arrayFalse.length);
  debugger
  table = getContent();
  const arrayS = [...table.matchAll(reS)];
  $("#field25173").val(arrayS.length);
  const arrayAPlus = [...table.matchAll(reAPlus)];
  $("#field25174").val(arrayAPlus.length);
  const arrayA = [...table.matchAll(reA)];
  $("#field25175").val(arrayA.length);
  const arrayBC = [...table.matchAll(reBC)];
  $("#field25176").val(arrayBC.length);

 realNum =  parseInt($("#field25173").val());
 realNum1 = parseInt($("#field25174").val());
 realNum2 = parseInt($("#field25175").val());
 realNum3 = parseInt($("#field25176").val());
 setNum =  parseInt($("#field25169").val());
 setNum1 = parseInt($("#field25170").val());
 setNum2 = parseInt($("#field25171").val());
 setNum3 = parseInt($("#field25172").val());
if (setNum>=realNum){
  $("#field25208").val("") 
}else{
  $("#field25208").val("超出设定比例/人数")
}
if ((setNum+setNum1)>=(realNum+realNum1)){
  $("#field25209").val("") 
}else{
  $("#field25209").val("超出设定比例/人数") 
}
if ((setNum+setNum1+setNum2)>=(realNum+realNum1+realNum2)){
  $("#field25210").val("") 
  
}else{
  $("#field25210").val("超出设定比例/人数") 
}
if ((setNum+setNum1+setNum2+setNum3)>=(realNum+realNum1+realNum2+realNum3)){
  $("#field25211").val("") 
  
}else{
  $("#field25211").val("超出设定比例/人数") 
}
}

