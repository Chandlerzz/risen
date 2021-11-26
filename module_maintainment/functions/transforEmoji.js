// 将表情转为字符
export const utf16toEntities = function (str) {
  console.log(str)
  if (str === undefined) return str
  var patt=/[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
    str = str.replace(patt, function(char){
            var H, L, code;
            if (char.length===2) {
                H = char.charCodeAt(0); // 取出高位
                L = char.charCodeAt(1); // 取出低位
                code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
                return "&#" + code + ";";
            } else {
                return char;
            }
        });
    return str;
}

// 将字符转为表情
export const uncodeUtf16 = function (str) {
  if (str === undefined) return str
  var reg = /\&#.*?;/g;
　　var result = str.replace(reg,function(char){
    　　var H,L,code;
    　　　　if(char.length == 9 ){
    　　　　　　code = parseInt(char.match(/[0-9]+/g));
    　　　　　　H = Math.floor((code-0x10000) / 0x400)+0xD800;
    　　　　　　L = (code - 0x10000) % 0x400 + 0xDC00;
    　　　　　　return unescape("%u"+H.toString(16)+"%u"+L.toString(16));
    　　　　}else{
    　　　　　　return char;
    　　　　}
    　　});
　　return result;
}
