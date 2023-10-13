<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#112f50"
      text-color="#fff"
      :default-active=active
      active-text-color="#ffd04b"
      :collapse-transition="false"
      router :collapse="isCollapse">
      <el-menu-item >
        <span slot="title">传染病预警与关联分析系統</span>
      </el-menu-item>
      <el-menu-item index="/messageInput">
        <i class="el-icon-upload2"></i>
        <span slot="title">信息输入模块</span>
      </el-menu-item>
      <el-submenu index="/reasoning">
        <template slot="title">
          <i class="el-icon-magic-stick"></i>
          <span>推理模块</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/reasoning/patients">
            <i class="el-icon-user-solid"></i>
            <span slot="title">感染者模块</span>
          </el-menu-item>
          <el-menu-item index="/reasoning/potentialPatients" disabled="disabled">
            <i class="el-icon-user"></i>
            <span slot="title">潜在患者模块</span>
          </el-menu-item>
          <el-menu-item index="/reasoning/areaInfo">
            <i class="el-icon-menu"></i>
            <span slot="title">区域感染信息</span>
          </el-menu-item>
          <el-menu-item index="/reasoning/trendPrediction">
            <i class="el-icon-s-data"></i>
            <span slot="title">感染趋势预测</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/association">
        <template slot="title">
          <i class="el-icon-attract"></i>
          <span>关联模块</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/association/patients">
            <i class="el-icon-share"></i>
            <span slot="title">传播链模块</span>
          </el-menu-item>
          <el-menu-item index="/association/keyPerson" disabled="disabled">
            <i class="el-icon-s-custom"></i>
            <span slot="title">重点对象模块</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props:['isCollapse'],
  data(){
    return{
      active:'',
    }
  },
  created() {
    // console.log('menu',this.$route);
    if(this.$route.meta.activeMenu){
      this.active = this.$route.meta.activeMenu
    }else {
      this.active = this.$route.path
    }
  },
  watch:{
    $route(to,from){
      // console.log('watch----to',to);
      let {meta,path} = to;
      if(meta.activeMenu){
        this.active = meta.activeMenu
      }else {
        this.active = path
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu{
  border-right: 0;

  /deep/ .is-active {
    background: #1e78bf !important;
    color: #fff !important;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
