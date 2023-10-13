<template>
  <div>
    <el-card><h2>患者id为{{id}}的接触者</h2></el-card>
    <el-table style="width: 100%"  :header-cell-style="{ textAlign: 'center'}" :cell-style="{ textAlign: 'center'}"  border :data="patients">
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
    </el-table>
    <el-button size="medium" type="primary" icon="el-icon-search" @click="reasonPotentialPatients()">推理潜在患者</el-button>
  </div>
</template>

<script>
export default {
  //返回数据
  data() {
    return {
      batch: 0 , id: 0, patients: [],
    }
  },
  //方法
  methods: {
    loadData(id,batch) {
      this.$http.get('findContacts',{ params: { patient_id: id, batch: batch }}).then((res)=> {
        this.patients = res.data
      })
    },
    reasonPotentialPatients(){
      this.$router.push({
        name:'potentialPatients',
        query:{ id: this.id, batch: this.batch }
      })
    }
  },

  //生命周期函数

  created() {
    this.id = this.$route.query.id;
    this.batch = this.$route.query.batch;
    this.loadData(this.id,this.batch)

  },
}
</script>

<style scoped>

</style>
