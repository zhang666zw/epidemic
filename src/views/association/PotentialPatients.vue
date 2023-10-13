<template>
  <div>
    <el-card><h2>id为{{patient_id}}的患者关联的潜在患者</h2></el-card>
    <el-table style="width: 100%; " border :data="contacts" >
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
          <span v-else-if="scope.row.contactSex === 0">女</span>
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
        patient_id:'', batch: 0 , contacts:[]
      }
    },
    methods:{
      loadContacts() {
        this.$http.get('getPotentialPatients',{ params: { patient_id: this.patient_id, batch: this.batch }}).then((res)=> {
          this.contacts = res.data
        })
      }
    },

    created() {
      this.patient_id = this.$route.query.patient_id;
      this.batch = this.$route.query.batch;
      this.loadContacts()
    },
  }
</script>

<style scoped>

</style>
