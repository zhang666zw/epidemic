<template>
  <div>
    <el-card>
      <h2>区域感染者信息</h2>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 30px">
        <el-form-item label="查询日期">
          <el-date-picker v-model="formInline.date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="传播区域">
          <el-cascader v-model="value" :options="options" :props="{ expandTrigger: 'hover' }"></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showRecord()">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <Table  @custom-event="showRecord()" ref='show'></Table >
  </div>
</template>

<script>
import Table from "./PatientsTable.vue";
export default{
  data(){
    return{
      formInline:{ date: '2023-07-28', region: '101010'},
      value: ['10','10','10'],
      options: [
        {
          value: '1',
          label: '安徽省',
          children:[{
            value:'00',label:'合肥市',children:[
              { value: '01', label: '蜀山区'},
              { value: '02', label: '庐阳区'},
              { value: '03', label: '包河区'},
              { value: '04', label: '瑶海区'},]
          }]
        },
        {
          value: '02',
          label: '江苏省',
          children: [{
            value: '01', label: '无锡市', children: [
              {value: '02', label: '澄江街道'},
              {value: '03', label: '南闸街道'},
              {value: '04', label: '云亭街道'},
              {value: '05', label: '城东街道'},
              {value: '06', label: '申港街道'},
              {value: '07', label: '利港街道'},
              {value: '08', label: '夏港街道'}]
          }]
        },
        {
          value: '10',
          label: '河南省',
          children:  [{
            value: '10', label: '郑州市', children: [
              {value: '10', label: '金水区'},
              {value: '11', label: '二七区'},
              {value: '12', label: '中原区'},
              {value: '13', label: '惠济区'},
              {value: '14', label: '上街区'},]
          }]
        }]
    }
  },
  components:{ Table },
  methods: {
    showRecord() {
      // console.log(this.formInline.day)
      this.formInline.region = this.value.toString().replaceAll(',','')
      this.$refs.show.loadData(this.formInline.date,this.formInline.region)
    },

  },
  mounted() {
    this.showRecord()
  }
}
</script>

<style scoped>

</style>
