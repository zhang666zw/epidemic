<template>
  <div>
    <el-card>
      <h2>区域感染者信息</h2>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 30px">
        <el-form-item label="查询日期">
          <el-date-picker
            v-model="formInline.day" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="传播区域">
          <el-cascader v-model="value" :options="options"></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showRecord()">查询</el-button>
          <el-button type="primary" style="position: fixed; right: 100px" @click="findChain()">传播链推测</el-button>
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
        day: '2023-07-28',
        region: '10001'
      },
      batch: 0, tag:"",
      value: ['1000','1'],
      options: [
        {
          value: '1000', label: '合肥市',
          children:
            [ { value: '1', label: '蜀山区'},
              { value: '2', label: '庐阳区'},
              { value: '3', label: '包河区'},
              { value: '4', label: '瑶海区'},]
        },
        {
          value: '2', label: '江阴市',
          children:
            [
              { value: '2', label: '澄江街道'},
              { value: '3', label: '南闸街道'},
              { value: '4', label: '云亭街道'},
              { value: '5', label: '城东街道'},
              { value: '6', label: '申港街道'},
              { value: '7', label: '利港街道'},
              { value: '8', label: '夏港街道'}]
        },
        {
          value: '3', label: '郑州市',
          children:
            [
              { value: '2', label: '中原区'},
              { value: '3', label: '二七区'},
              { value: '4', label: '金水区'},
              { value: '5', label: '上街区'},
              { value: '6', label: '惠济区'}]
        }]
    }
  },
  methods: {
    showRecord() {
      if (this.formInline.day === '2023-07-28'){
        this.batch = 1
        this.tag = "1"
      }else if (this.formInline.day === '2023-07-29'){
        this.batch = 2
        this.tag = "2"
      }else if (this.formInline.day === '2023-07-30'){
        this.batch = 3
        this.tag = "3"
      }
      this.formInline.region = this.value.toString().replaceAll(',','')
      this.$refs.show.showPatients(this.tag,this.formInline.region)
    },
    findChain(){
      this.formInline.region = this.value.toString().replaceAll(',','')
      this.$router.push({
        name: 'chain',
        query: { date: this.tag , areaCode: this.formInline.region,batch:this.batch }
      })
    },
    handleChange(value) {
      console.log(value);
    }
  },
  mounted() {
    this.showRecord();
  }
}
</script>


<style scoped>
</style>
