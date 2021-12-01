    <template>
  <div id="app" class="WhiteScroll">
        <keep-alive :include="arr">
          <router-view></router-view>
        </keep-alive>
        <remote-script src="https://g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js"></remote-script>
      </div>
    </template>
    <script>
      export default {
        name: 'App',
        data() {
          return {
            arr: ['Index', 'List']
          }
        },
        watch: {
          // 监听router
          $route: function(to, from) {
            if (from.meta.keepAlive) {
              this.arr.includes(from.name) || this.arr.push(from.name)
            } else {
              var name = from.name
              if (this.arr.includes(name)) {
                var index = this.arr.findIndex(function(item) {
                  return item === name
                })
                this.arr.splice(index, 1)
              }
            }
            if (to) {
              switch (to.name) {
                  // 需要缓存的页面
                case 'Index':
                case 'List':
                  this.arr.includes(to.name) || this.arr.push(to.name)
                  break
                default:
                  break
              }
            }
            console.log(`从${from.name}去${to.name},缓存页面有： ${this.arr}`)
          }
        }
      }
    </script>

<style lang="scss">
  @import "./styles/public";
  #app {
    height: 100%;
  }
  /*谷歌、safari、qq浏览器、360浏览器滚动条样式 -- 白色样式*/
  .WhiteScroll{
      &, & .el-table__body-wrapper{
          /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
          &::-webkit-scrollbar
          {
              width: 8px; height: 8px;
          }
          /*定义滚动条轨道 内阴影+圆角*/
          &::-webkit-scrollbar-track
          {
              border-radius: 10px;
              background-color: #f1f1f1;
          }
          /*定义滑块 内阴影+圆角*/
          &::-webkit-scrollbar-thumb
          {
              border-radius: 10px;
              background-color: #ddd;
          }
          /*滑块效果*/
          &::-webkit-scrollbar-thumb:hover
          {
              border-radius: 5px;
          }
          /*滚动条交汇处*/
          &::-webkit-scrollbar-corner{
              background-color: #f1f1f1;
          }
      }
  }

</style>
