<template>
  <section class="main-panel">
    <transition name="fade-transform" mode="out-in">
      <MainPage :key="key" v-if="type === 'mainPage'">
        <keep-alive>
          <router-view />
        </keep-alive>
      </MainPage>
      <DetailPage :key="key" v-else>
        <keep-alive>
          <router-view />
        </keep-alive>
      </DetailPage>
    </transition>
  </section>
</template>

<script>
import MainPage from "./mainPage";
import DetailPage from "./detailPage";

export default {
  name: "AppMain",
  components: {
    MainPage,
    DetailPage
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    },
    type() {
     console.log(this)
      return this.$route.meta.layoutType === undefined ||
        this.$route.meta.layoutType === "page"
        ? "detailPage"
        : "mainPage";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main-panel {
  height: calc(100vh - 50px);
  min-height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f8f8f8;
}
</style>
