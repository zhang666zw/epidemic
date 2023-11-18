<template>
  <div>
    <el-card>
      <h2>区域感染者信息</h2>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 30px">
        <el-form-item label="查询日期">
          <el-select v-model="formInline.day" placeholder="查询天数">
            <el-option label="7月28日" value="1"></el-option>
            <el-option label="7月29日" value="2"></el-option>
            <el-option label="7月30日" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="传播区域">
          <el-select v-model="formInline.region" placeholder="传播区域">
            <el-option label="蜀山区" value="10001"></el-option>
            <el-option label="庐阳区" value="10002"></el-option>
            <el-option label="包河区" value="10003"></el-option>
            <el-option label="瑶海区" value="10004"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showRecord()">查询</el-button>
<!--          style="position: relative;left: 730px"-->
          <el-button type="primary" @click="findChain()">传播链推测</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <Table @custom-event="showRecord()" ref='show'></Table>
  </div>
</template>


<script>
import Table from "./PatientsTable.vue";
export default {
  components: { Table },
  data() {
    return {
      formInline: {
        day: '1',
        region: '10001'
      },
      batch: 0,
    }
  },
  methods: {
    showRecord() {
      if (this.formInline.day === '1'){
        this.batch = 1
      }else if (this.formInline.day === '2'){
        this.batch = 2
      }else {
        this.batch = 3
      }
      this.$refs.show.showPatients(this.formInline.day,this.formInline.region)
    },
    findChain(){
      this.$router.push({
        name: 'chain',
        query: { date: this.formInline.day , areaCode: this.formInline.region,batch:this.batch }
      })
    },

  },
  mounted() {
    this.showRecord();
  }
}
</script>


<style scoped>
</style>
