<template>
  <div>
    <el-card><h2>患者id为{{id}}的潜在患者</h2></el-card>
    <el-table style="width: 100%"  :header-cell-style="{ textAlign: 'center'}" :cell-style="{ textAlign: 'center'}"  stripe border :data="potentialPatients">
      <el-table-column prop="contactName" label="姓名"></el-table-column>
      <el-table-column prop="areaCode" label="地区">
        <template v-slot="scope">
          <span v-if="scope.row.areaCode === '10001'">蜀山区</span>
          <span v-else-if="scope.row.areaCode === '10002'">庐阳区</span>
          <span v-else-if="scope.row.areaCode === '10003'">包河区</span>
          <span v-else>瑶海区</span>
        </template>
      </el-table-column>
      <el-table-column prop="contactAddress" label="住址"></el-table-column>
      <el-table-column prop="contactTel" label="联系方式"></el-table-column>
      <el-table-column prop="contactAge" label="年龄">
        <template v-slot="scope">
          <span>{{scope.row.contactAge}}岁</span>
        </template>
      </el-table-column>
      <el-table-column prop="contactSex" label="性别">
        <template v-slot="scope">
          <span v-if="scope.row.contactSex === 1">男</span>
          <span  v-else-if="scope.row.contactSex === 0">女</span>
        </template>
      </el-table-column>
      <el-table-column prop="potentialPatientProbability" label="感染概率"></el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  data(){
    return{
      id:'',
      batch:0,
      potentialPatients:[]
    }
  },
  methods:{
    loadPotentialContacts() {
      this.$http.get('/infer',{ params:{ patient_id: this.id, batch: this.batch }}).then((res)=>{
        this.potentialPatients = res.data.filter(obj => obj.potentialPatientProbability > 0.6)
      })
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.batch = this.$route.query.batch;
    this.loadPotentialContacts()
  }
}
</script>

<style scoped>

</style>
