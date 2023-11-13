<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item  v-for="item in navs" :key="item.path" :to="{ path: item.path}">{{item.meta.title}}</el-breadcrumb-item>
      <el-button style="position: relative;left: 1400px;bottom: 15px" type="primary" @click="logout()">退出</el-button>
    </el-breadcrumb>

  </div>
</template>

<script>
export default {
  data(){
    return{
    }
  },
  methods:{
    logout(){
      window.sessionStorage.clear();
      this.$router.push('/login')
    }
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
//div{
//  height: 50px;
//  line-height: 50px;
//  padding-left:20px ;
//}
</style>
