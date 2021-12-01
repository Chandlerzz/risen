<template>
    <div class="mainPage-outter-panel">
        <div class="mainPage-panel">
            <el-scrollbar class="scrollbar" wrap-class="scrollbar-wrapper">
                <div class="mainPage-pane">
                    <slot/>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss" >
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .mainPage-outter-panel{
        padding: 20px;
        height:100%;

    }
    .mainPage-panel {
        height: 100%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        border: 1px solid #ebeef5;
        background-color: #fff;
        /*border-radius: 10px;*/
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        box-sizing: border-box;
    }

    .mainPage-pane {
        padding: 20px 60px;
    }

    .scrollbar {
        height: 100%;
    }

</style>
