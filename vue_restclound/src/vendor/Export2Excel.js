/* eslint-disable */
require('script-loader!file-saver');
import XLSX from 'xlsx'
import moment from "moment"
import {DictKeyToValue} from '../dicts'

function generateArray(table){
    var out = [];
    var rows = table.querySelectorAll('tr');
    var ranges = [];
    for ( var R = 0 ; R < rows.length ; ++ R ) {
        var outRow = [];
        var row = rows[ R ];
        var columns = row.querySelectorAll('td');
        for ( var C = 0 ; C < columns.length ; ++ C ) {
            var cell = columns[ C ];
            var colspan = cell.getAttribute('colspan');
            var rowspan = cell.getAttribute('rowspan');
            var cellValue = cell.innerText;
            if ( cellValue !== "" && cellValue == + cellValue ) cellValue = + cellValue;

            //Skip ranges
            ranges.forEach(function (range){
                if ( R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c ){
                    for ( var i = 0 ; i <= range.e.c - range.s.c ; ++ i ) outRow.push(null);
                }
            });

            //Handle Row Span
            if ( rowspan || colspan ){
                rowspan = rowspan || 1;
                colspan = colspan || 1;
                ranges.push({
                    s: {
                        r: R,
                        c: outRow.length
                    },
                    e: {
                        r: R + rowspan - 1,
                        c: outRow.length + colspan - 1
                    }
                });
            }
            ;

            //Handle Value
            outRow.push(cellValue !== "" ? cellValue : null);

            //Handle Colspan
            if ( colspan )
                for ( var k = 0 ; k < colspan - 1 ; ++ k ) outRow.push(null);
        }
        out.push(outRow);
    }
    return [ out, ranges ];
};

function datenum(v, date1904){
    if ( date1904 ) v += 1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts){
    var ws = {};
    var range = {
        s: {
            c: 10000000,
            r: 10000000
        },
        e: {
            c: 0,
            r: 0
        }
    };
    for ( var R = 0 ; R != data.length ; ++ R ) {
        for ( var C = 0 ; C != data[ R ].length ; ++ C ) {
            if ( range.s.r > R ) range.s.r = R;
            if ( range.s.c > C ) range.s.c = C;
            if ( range.e.r < R ) range.e.r = R;
            if ( range.e.c < C ) range.e.c = C;
            var cell = {
                v: data[ R ][ C ]
            };
            if ( cell.v == null ) continue;
            var cell_ref = XLSX.utils.encode_cell({
                c: C,
                r: R
            });

            if ( typeof cell.v === 'number' ) cell.t = 'n';
            else if ( typeof cell.v === 'boolean' ) cell.t = 'b';
            else if ( cell.v instanceof Date ){
                cell.t = 'n';
                cell.z = XLSX.SSF._table[ 14 ];
                cell.v = datenum(cell.v);
            } else cell.t = 's';

            ws[ cell_ref ] = cell;
        }
    }
    if ( range.s.c < 10000000 ) ws[ '!ref' ] = XLSX.utils.encode_range(range);
    return ws;
}

function Workbook(){
    if ( ! (this instanceof Workbook) ) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
}

function s2ab(s){
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for ( var i = 0 ; i != s.length ; ++ i ) view[ i ] = s.charCodeAt(i) & 0xFF;
    return buf;
}

export function export_table_to_excel(id){
    var theTable = document.getElementById(id);
    var oo = generateArray(theTable);
    var ranges = oo[ 1 ];

    /* original data */
    var data = oo[ 0 ];
    var ws_name = "SheetJS";

    var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data);

    /* add ranges to worksheet */
    // ws['!cols'] = ['apple', 'banan'];
    ws[ '!merges' ] = ranges;

    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ ws_name ] = ws;

    var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
    });

    saveAs(new Blob([ s2ab(wbout) ], {
        type: "application/octet-stream"
    }), "test.xlsx")
}

export function export_json_to_excel({
                                         header,
                                         data,
                                         filename,
                                         autoWidth = true,
                                         bookType = 'xlsx'
                                     } = {}){
    /* original data */
    filename = filename || 'excel-list'
    data = [ ...data ]
    data.unshift(header);
    var ws_name = "SheetJS";
    var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data);
    if ( autoWidth ){
        /*设置worksheet每列的最大宽度*/
        const colWidth = data.map(row => row.map(val => {
            /*先判断是否为null/undefined*/
            if ( val == null ){
                return {
                    'wch': 10
                };
            }
            /*再判断是否为中文*/
            else if ( val.toString().charCodeAt(0) > 255 ){
                return {
                    'wch': val.toString().length * 2
                };
            } else {
                return {
                    'wch': val.toString().length
                };
            }
        }))
        /*以第一行为初始值*/
        let result = colWidth[ 0 ];
        for ( let i = 1 ; i < colWidth.length ; i ++ ) {
            for ( let j = 0 ; j < colWidth[ i ].length ; j ++ ) {
                if ( result[ j ][ 'wch' ] < colWidth[ i ][ j ][ 'wch' ] ){
                    result[ j ][ 'wch' ] = colWidth[ i ][ j ][ 'wch' ];
                }
            }
        }
        ws[ '!cols' ] = result;
    }

    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ ws_name ] = ws;

    var wbout = XLSX.write(wb, {
        bookType: bookType,
        bookSST: false,
        type: 'binary'
    });
    saveAs(new Blob([ s2ab(wbout) ], {
        type: "application/octet-stream"
    }), `${filename}.${bookType}`);
}

// 培训课程问卷导出
export function surveyExportExcel({
    lesson,
    surveyfullUps,
    surveyRadios,
    surveyCheckBoxes,
    surveyRadioBoxes,
    filename,
    autoWidth = true,
    bookType = 'xlsx',
} = {}) {
/* original data */
    let item1Section={
        programName:lesson.Program.name?lesson.Program.name:"",
        lessonName:lesson.name?lesson.name:"",
        time:lesson.startAt&&lesson.endAt?moment(lesson.startAt).format("YYYY-MM-DD HH:mm:ss")+"~"+moment(lesson.endAt).format("YYYY-MM-DD HH:mm:ss"): "",
        teacherName:lesson.Teachers&&lesson.Teachers.length>0?lesson.Teachers.map((item)=>item.name).join(","):"",
        assistantName:lesson.Assistants&&lesson.Assistants.length>0?lesson.Assistants.map(item=>item.name).join(","):""
    }
    let lessonData =["项目名称:",item1Section.programName,"课程名称:",item1Section.lessonName,
                     "培训时间:",item1Section.time,"讲师姓名:",item1Section.teacherName ,"助教:",item1Section.assistantName];
    let data=[];
    data.push(lessonData);
    /**空一行 */
    data.push([])
    /**组装第二组数据 */
    if(surveyRadios && surveyRadios.length>0)
    {
        let item2Head=["评论内容","平均分","有效填写人数"]
        let options=JSON.parse(surveyRadios[0].Squestion.options)
        let optionsLength=options.length;
        for(let option of options)
        {
            item2Head.push(option.label);
        }
        data.push(item2Head);
        /**第二组数据head组装完成 */
        /**第二组第三、四组数据体 */
        var avScoreHighest=[];
        var avScoreLowest=[];
        var aspects=[];
        let lessonTotal=0;
        let peopleNumber=1
        for(let i=0;i<surveyRadios.length;i++) {
            options=JSON.parse(surveyRadios[i].Squestion.options)
            let item =[
                surveyRadios[i].Squestion.description,
                surveyRadios[i].avScore?surveyRadios[i].avScore.toFixed(2):"",
                surveyRadios[i].peopleNum?surveyRadios[i].peopleNum:""
            ]
            for(let option of JSON.parse(surveyRadios[i].Squestion.options))
            {
                item.push(surveyRadios[i][option.key])
            }
            data.push(item)
            /**合并得分 开始 */

            let aspectFlag=false;
            // 非空数组时
            if(aspects.length) {
                for(let aspect of aspects)
                {
                    if(aspect.id==surveyRadios[i].Aspect.id) {
                        // 总分计算
                        let fullScore = parseInt(options[options.length - 1].key)
                        aspectFlag=true;
                        aspect.squestions.push(surveyRadios[i]);
                        aspect.total=aspect.total+surveyRadios[i].total
                        aspect.avScore=(aspect.total/(surveyRadios[i].peopleNum)).toFixed(2)
                        aspect.fullScore += fullScore
                    }
                }
            }
            // 空数组时
            if(!aspectFlag) {
                // 总分计算
                let fullScore = parseInt(options[options.length - 1].key)

                let aspect={
                    id:surveyRadios[i].Aspect.id,
                    squestions:[],
                    avScore:surveyRadios[i].avScore.toFixed(2),
                    name:surveyRadios[i].Aspect.name,
                    total:surveyRadios[i].total,
                    fullScore: fullScore
                }
                peopleNumber=surveyRadios[i].peopleNum
                aspect.squestions.push(surveyRadios[i]);
                aspects.push(aspect);
            }
            /**合并得分 结束 */
            /**最高分 最低分数据 开始 */
            /**赋初始值 */
            if(i==0)
            {
                avScoreLowest.push(surveyRadios[i]);
                avScoreHighest.push(surveyRadios[i]);
                continue;
            }
            /**最高平均分 */
            if(surveyRadios[i].avScore>avScoreHighest[0].avScore)
            {
                avScoreHighest=[];
                avScoreHighest.push(surveyRadios[i]);
            }else if(surveyRadios[i].avScore==avScoreHighest[0].avScore)
            {
                avScoreHighest.push(surveyRadios[i]);
            }
            /**最低平均分 */
            if(surveyRadios[i].avScore<avScoreLowest[0].avScore)
            {
                avScoreLowest=[];
                avScoreLowest.push(surveyRadios[i]);
            }else if(surveyRadios[i].avScore==avScoreLowest[0].avScore)
            {
                avScoreLowest.push(surveyRadios[i]);
            }

            /**最高分 最低分数据 结束 */

        }
        /**push准备好的数据 */
        data.push(["单项最低","描述","得分"]);
        for(let i=0;i< avScoreLowest.length;i++)
        {
            let item =[
                i+1,
                avScoreLowest[i].Squestion.description,
                avScoreLowest[i].avScore?avScoreLowest[i].avScore.toFixed(2):"",
            ]
            data.push(item)
        }

        data.push(["单项最高","描述","得分"]);
        for(let i=0;i< avScoreHighest.length;i++)
        {
            let item =[
                i+1,
                avScoreHighest[i].Squestion.description,
                avScoreHighest[i].avScore?avScoreHighest[i].avScore.toFixed(2):"",
            ]
            data.push(item)
        }
        /**空一行 */
        data.push([])

        for(let aspect of aspects)
        {
            lessonTotal+=aspect.total
        }
        lessonTotal = (lessonTotal/peopleNumber).toFixed(2);

        data.push(["整体得分",lessonTotal])
        /**空一行 */
        data.push([])
        data.push(["合并得分","名称","总分","得分","占比","备注"]);
        for(let i=0;i<aspects.length;i++)
        {
            let percent = ((aspects[i].total/peopleNumber)/aspects[i].fullScore)*100
            let item =[
                i+1,
                aspects[i].name,
                aspects[i].fullScore,
                aspects[i].avScore,
                percent.toFixed(2)+"%"
            ]
            data.push(item);
        }

    }

    if(surveyfullUps && surveyfullUps.length>0)
    {
        /**主观题（填空） */
        data.push([]);//空一行
        data.push(["题目内容","回答"])
        for(let fullup of surveyfullUps)
        {
            if(fullup.Squestion&&fullup.Squestion.isExport==DictKeyToValue("isExport","Export")&&fullup.status==DictKeyToValue("sitemStatus","Answer"))
            {
                const item = [
                    fullup.Squestion.description?fullup.Squestion.description:"",
                    fullup.answer
                ]
                data.push(item)
            }
        }
    }

    /**
     * 放入多选题
     */
    if (surveyCheckBoxes && surveyCheckBoxes.length > 0) {
        data.push([]);//空一行
        let checkBoxTitle = ['题目内容(多选)'] // 标题行
        let checkBoxOne = [] // 选项行
        surveyCheckBoxes.forEach((item, index) => {
            let options = item.Squestion.options// 所有候选项
            options = options.replace(/"/g, '')
            options = options.substr(1, options.length - 2).split(',')
            let selectedTime = item.selectedTime.split(',') // 各选项选中人次数组
            options.forEach((option, j) => {
                checkBoxTitle.splice(checkBoxTitle.length, 0, '勾选项', '选择人次')
                // 如果是第一遍，添加问题文本
                if (j === 0) checkBoxOne.splice(checkBoxOne.length, 0, item.Squestion.description)
                // 添加候选项内容和勾选人次
                checkBoxOne.splice(checkBoxOne.length, 0, option, selectedTime[j])
            })
        })
        data.push(checkBoxTitle)
        data.push(checkBoxOne)
    }

    /**
     * 放入单选题
     */
    if (surveyRadioBoxes && surveyRadioBoxes.length > 0) {
        data.push([]);//空一行
        let radioBoxTitle = ['题目内容(单选)'] // 标题行
        let radioBoxOne = [] // 选项行
        surveyRadioBoxes.forEach((item, index) => {
            let options = item.Squestion.options// 所有候选项
            options = options.replace(/"/g, '')
            options = options.substr(1, options.length - 2).split(',')
            let selectedTime = item.selectedTime.split(',') // 各选项选中人次数组
            options.forEach((option, j) => {
                radioBoxTitle.splice(radioBoxTitle.length, 0, '勾选项', '选择人次')
                // 如果是第一遍，添加问题文本
                if (j === 0) radioBoxOne.splice(radioBoxOne.length, 0, item.Squestion.description)
                // 添加候选项内容和勾选人次
                radioBoxOne.splice(radioBoxOne.length, 0, option, selectedTime[j])
            })
        })
        data.push(radioBoxTitle)
        data.push(radioBoxOne)
    }

     /* original data */
     filename = filename || 'excel-list'
     var ws_name = "SheetJS";
     var wb = new Workbook(),
         ws = sheet_from_array_of_arrays(data);

     if ( autoWidth ){
         /*设置worksheet每列的最大宽度*/
         const colWidth = data.map(row => row.map(val => {
             /*先判断是否为null/undefined*/
             if ( val == null ){
                 return {
                     'wch': 10
                 };
             }
             /*再判断是否为中文*/
             else if ( val.toString().charCodeAt(0) > 255 ){
                 return {
                     'wch': val.toString().length * 2
                 };
             } else {
                 return {
                     'wch': val.toString().length
                 };
             }
         }))
         /*以第一行为初始值*/
         let result = colWidth[ 0 ];
         for ( let i = 1 ; i < colWidth.length ; i ++ ) {
             for ( let j = 0 ; j < colWidth[ i ].length ; j ++ ) {
                 // 如果result的长度小于colWidth[ i ],则补充result
                 if (result.length <= j) {
                     result[j] = {wch: 10}
                 }
                 if (result[ j ][ 'wch' ] < colWidth[ i ][ j ][ 'wch' ] ){
                     result[ j ][ 'wch' ] = colWidth[ i ][ j ][ 'wch' ];
                 }
             }
         }
         ws[ '!cols' ] = result;
     }

     /* add worksheet to workbook */
     wb.SheetNames.push(ws_name);
     wb.Sheets[ ws_name ] = ws;

     var wbout = XLSX.write(wb, {
         bookType: bookType,
         bookSST: false,
         type: 'binary'
     });
     saveAs(new Blob([ s2ab(wbout) ], {
         type: "application/octet-stream"
     }), `${filename}.${bookType}`);
}

// 导出所有讲师课程信息
export function exportAllTeacherLesson(rows) {
    let data = []
    let bookType = 'xlsx'
    let filename = '讲师报表导出'
    // 1.放入标题行
    data.push(['讲师姓名', '单位名称', '讲师等级', '联系方式', '在讲课程', '课程对象', '课程人数', '课程满意度'])
    // 遍历数据，并放入data
    for (let index in rows) {
        let row = rows[index]
        data.push([
            row.teacher.name,
            row.teacher.company,
            row.teacher.level,
            row.teacher.tel,
            row.lesson.name,
            row.lesson.object,
            row.lesson.num,
            row.lesson.score,
        ])
    }
    // 配置excel属性，并导出数据
    /* original data */
    filename = filename || 'excel-list'
    var ws_name = "SheetJS";
    var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data);
    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ ws_name ] = ws;
    var wbout = XLSX.write(wb, {
        bookType: bookType,
        bookSST: false,
        type: 'binary'
    });
    saveAs(new Blob([ s2ab(wbout) ], {
        type: "application/octet-stream"
    }), `${filename}.${bookType}`);
}

export function exportData(filename,data){
    let bookType = 'xlsx'
    // 配置excel属性，并导出数据
    /* original data */
    filename = filename || 'excel-list'
    var ws_name = "SheetJS";
    var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data);
    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ ws_name ] = ws;
    var wbout = XLSX.write(wb, {
        bookType: bookType,
        bookSST: false,
        type: 'binary'
    });
    saveAs(new Blob([ s2ab(wbout) ], {
        type: "application/octet-stream"
    }), `${filename}.${bookType}`);

}

// parameter is array
export function exportDataSheets(filename,data){
    var wb = new Workbook()
    // 配置excel属性，并导出数据
    /* original data */
    let bookType = 'xlsx'
    filename = filename || 'excel-list'
    data.forEach(item => {
        var ws_name = item.ws_name;
        var ws = sheet_from_array_of_arrays(item.data);
        /* add worksheet to workbook */
        wb.SheetNames.push(ws_name);
        wb.Sheets[ ws_name ] = ws;
    })
    var wbout = XLSX.write(wb, {
        bookType: bookType,
        bookSST: false,
        type: 'binary'
    });
    saveAs(new Blob([ s2ab(wbout) ], {
        type: "application/octet-stream"
    }), `${filename}.${bookType}`);
}
