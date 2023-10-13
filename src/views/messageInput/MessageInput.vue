<template>
  <div>
    <el-card>
      <h2>感染信息输入</h2>
<!--      <el-form :inline="true" :model="role" class="demo-form-inline" style="margin-top: 30px">-->
<!--        <el-form-item label="数据类型">-->
          <el-select :inline="true"  v-model="role" label="角色类型" style="margin-top: 30px">
            <el-option label="患者" value="1"></el-option>
            <el-option label="接触者" value="2"></el-option>
<!--            <el-option label="7月30日" value="2023-7-30"></el-option>-->
          </el-select>
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="showPrediction()">趋势预测</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
      role:"1",
    }
  }
}
</script>

<style scoped>

</style>
