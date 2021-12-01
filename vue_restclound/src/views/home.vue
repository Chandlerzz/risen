<!-- home -->
<template>
  <div class="index-page"
      >
      <el-row>1</el-row>
      <el-row>
          <el-col :span="12">
<el-menu 
        :default-active="activeIndex" 
        :show-timeout="200" 
        class="el-menu-demo" 
        mode="vertical" 
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        
        @select="handleSelect" 
    >
        <el-menu-item index="4"> 
            <router-link class="nav-link" to="/report">
                维修管理
            </router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link class="nav-link" to="/statistics">
                统计分析 
            </router-link>
        </el-menu-item>
            <el-menu-item index="3">
        <router-link class="nav-link" to="/user">
                用户管理 
        </router-link>
            </el-menu-item>
    </el-menu>
          </el-col>
          <el-col :span="12">
	<div class="text-center" style="margin-top: 20px;">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
	</div>
          </el-col>
      </el-row>
    
  </div>
</template>
<script>
import Navbar from '@/layouts/navbar/index'
export default {
  name: "Home",
  computed:{
    Navbar,
  },
  data(){
      return{
          activeIndex: '',
      }
  },
  methods: {
      handleSelect(key, keyPath) {
          console.log(key, keyPath);
      }
  },
  created(){
       this.activeIndex =  this.$route.meta.no+""
  }
}
</script>
  <style  scoped>
    .nav-link{
        display:block;
    }
</style>
