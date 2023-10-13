<template>
  <div>
    <el-card>
      <h2>区域感染者信息</h2>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 30px">
        <el-form-item label="查询日期">
          <el-select v-model="formInline.day" placeholder="查询天数">
            <el-option label="7月28日" value="2023-7-28"></el-option>
            <el-option label="7月29日" value="2023-7-29"></el-option>
            <el-option label="7月30日" value="2023-7-30"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="传播区域">
          <el-select v-model="formInline.region" placeholder="传播区域">
            <el-option label="蜀山区" value="10001"></el-option>
            <el-option label="庐阳区" value="10002"></el-option>
            <el-option label="包河区" value="10003"></el-option>
            <el-option label="瑶海区" value="10004"></el-option>
            <el-option label="合肥市" value="10005"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showRecord()">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <Table  @custom-event="showRecord()" ref='show' ></Table >
  </div>
</template>


<script>
import Table from "./PatientsTable.vue";
export default{
  data(){
    return{
      formInline:{ day: '2023-7-28', region: '10005'},
    }
  },
  components:{ Table },
  methods: {
    showRecord() {
      this.$refs.show.loadData(this.formInline.day,this.formInline.region)
      // console.log(this.formInline.day)
    }
  },
  mounted() {
    this.showRecord()
  }
}
</script>

<style scoped>

</style>
