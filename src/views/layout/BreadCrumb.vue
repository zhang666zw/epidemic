<template>
  <div>
    <el-breadcrumb  separator-class="el-icon-arrow-right" class="container">
      <el-breadcrumb-item v-for="item in navs" :key="item.path" :to="{ path: item.path}">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
<!--    <el-button size="medium" style="position: fixed; right: 100px;top:7px" type="primary" @click="logout()">退出</el-button>-->
  </div>
</template>

<script>
export default {
  data(){
    return{
    }
  },
  methods:{
    // logout(){
    //   window.sessionStorage.clear();
    //   this.$router.push('/login')
    // }
  },
  computed:{
    navs(){
      // console.log('路由信息',this.$route.matched);
      return this.$route.matched.filter(obj=>obj.path!=='')
    }
  },
  created() {
    // console.log(this.$route)
  }
}
</script>

<style lang="less" scoped>
  /deep/ .el-breadcrumb__inner {
    color: #fff ;
  }
  /deep/ .el-breadcrumb__inner.is-link{
    color: white;
  }
  /deep/ .el-icon-arrow-right:before{
    color: white;
  }
</style>
