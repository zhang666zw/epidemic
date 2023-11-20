<template>
  <div>
    <el-card>
      <h2>区域感染者信息</h2>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 30px">
        <el-form-item label="查询日期">
          <el-date-picker
            v-model="formInline.day"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
<!--          <el-select v-model="formInline.day" placeholder="查询天数">-->
<!--            <el-option label="7月28日" value="1"></el-option>-->
<!--            <el-option label="7月29日" value="2"></el-option>-->
<!--            <el-option label="7月30日" value="3"></el-option>-->
<!--          </el-select>-->
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
      formInline:{ day: '2023-07-28', region: '10005'},
      tag: 0
    }
  },
  components:{ Table },
  methods: {
    showRecord() {
      console.log(this.formInline.day)
      if (this.formInline.day === "2023-07-28"){
        this.tag = 1;
      }else if (this.formInline.day ==="2023-07-29"){
        this.tag = 2;
      }else if (this.formInline.day ==="2023-07-30"){
        this.tag = 3
      }

      this.$refs.show.loadData(this.tag,this.formInline.region)
    },

  },
  mounted() {
    this.showRecord()
  }
}
</script>

<style scoped>
</style>
