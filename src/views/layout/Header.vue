<template>
  <div class="header" style="height: 50px;background-color: #3364CA;">
    <span style="color: white" v-if="!isCollapse" class="el-icon-s-fold" @click="changeMenu()"></span>
    <span style="color: white" v-else class="el-icon-s-unfold" @click="changeMenu()"></span>
    <span >
      <bread-crumb style="padding-left: 40px;margin-top: -18px;color: white"></bread-crumb>
    </span>



  </div>
</template>

<script>
import BreadCrumb from "./BreadCrumb.vue";
export default {
  props:['isCollapse'],
  components:{ BreadCrumb },
  methods:{
    changeMenu(){
      this.$emit('changeShow')
    }
  }
}
</script>


<style lang="less" scoped>
  .el-icon-s-fold{
    margin-top: 20px;
    padding-left: 10px;
    font-size: 20px;
  }
  .el-icon-s-unfold{
    margin-top: 20px;
    font-size: 20px;
  }
</style>
