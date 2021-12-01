<template>
  <div class="detailPage-outter-panel">
    <div class="detailPage-panel">
      <button
        type="button"
        style="z-index: 999;"
        @click="goBack"
        aria-label="Close"
        class="el-dialog__headerbtn"
      >
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </button>


      <el-scrollbar class="scrollbar" wrap-class="scrollbar-wrapper">
        <div class="detailPage-pane">
          <slot />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" >
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.detailPage-outter-panel {
  padding: 20px;
  height: 100%;
}
.detailPage-panel {
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  background-color: #fff;
  /*border-radius: 10px;*/
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  box-sizing: border-box;
}

.detailPage-pane {
  padding: 20px 60px;
}

.scrollbar {
  height: 100%;
}

</style>