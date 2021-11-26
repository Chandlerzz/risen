var RollingBall = {
    template: `
    <div id="home" 
        style="width: 50px;height: 50px;position: fixed;border-radius:50%;text-align:center;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;background:white;"
        :style="position"
        @touchstart="bodyTouchStart"
        @touchmove="bodyTouchMove"
        @touchend="bodyTouchEnd"
        @click="bodyClick"
        >
         <span 
             style="height:100%;display:inline-block;vertical-align:middle;">    </span>
        <img 
        style="width: 24px;vertical-align:middle;margin:0px 4px 0px 0px;" 
        src="https://object.risen.com/public/resources/images/yyzx@3x.png">
    </div>
    `,
    props: {
        position: {
            field: String,
            default:"right:0px;top:100px;" 
            },
    },
    data(){
        return{
            _x_start_:null,
            y_start:null,
            _x_move:null,
            _y_move:null,
            _x_end:null,
            _y_end:null,
            left_start:null,
            top_start:null,
        }
    },
    methods:{
        bodyTouchStart(event){
            this._x_start=event.targetTouches[0].pageX;//起始点击位置
            this._y_start=event.targetTouches[0].pageY;//起始点击位置
            this.left_start=$("#home").css("left");//元素左边距
            this.top_start=$("#home").css("top");//元素上边距
        },
        bodyTouchMove(event){
            event.preventDefault();//取消事件的默认动作。
            this._x_move=event.targetTouches[0].pageX;//当前屏幕上所有触摸点的集合列表
            this._y_move=event.targetTouches[0].pageY;//当前屏幕上所有触摸点的集合列表
            //左边距=当前触摸点-鼠标起始点击位置+起始左边距
            $("#home").css("left",parseFloat(this._x_move)-parseFloat(this._x_start)+parseFloat(this.left_start)+"px");
            //上边距=当前触摸点-鼠标起始点击位置+起始上边距
            $("#home").css("top",parseFloat(this._y_move)-parseFloat(this._y_start)+parseFloat(this.top_start)+"px");
		},
        bodyTouchEnd(event){
            var divHeight = $("#home").outerHeight();
            var bodyAll=$(window).width()-divHeight;//屏幕宽的一半
            var bodyH=$(window).height();//屏幕高
            this._x_end=event.changedTouches[0].pageX;//松开位置
            this._y_end=event.changedTouches[0].pageY;//松开位置
            //当最终位置在屏幕左半部分
            if(this._x_end<divHeight){
                $("#home").css("left","0px");
            }else if(this._x_end>=$(window).width()-divHeight){//当最终位置在屏幕左半部分
                $("#home").css("left",bodyAll+"px");
            }
            //当元素顶部在屏幕外时
            if(parseFloat($("#home").css("top"))<0){
                //置于顶部
                $("#home").css("top",0);//置于顶部
            }
            //当元素底部在屏幕外时
            if(bodyH-this._y_end<parseFloat(divHeight)/2){
                //置于底部
                $("#home").css("top",bodyH-parseFloat(divHeight))
            }
        },
        bodyClick(event){
            // window.history.back();
            // window.history.back();
            window.location.href="https://esbtest.risen.com/dev/v1/jdy_mini_app"
        }
    },
};

