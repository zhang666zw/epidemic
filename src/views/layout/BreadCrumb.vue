<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item  v-for="item in navs" :key="item.path" :to="{ path: item.path}">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data(){
    return{
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
