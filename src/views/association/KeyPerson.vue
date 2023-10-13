<template>
  <div>
    <el-card><h2>{{area}}重点筛查对象</h2></el-card>
    <el-table style="width: 100%"  :header-cell-style="{ textAlign: 'center'}" :cell-style="{ textAlign: 'center'}"  border :data="KeyPerson">
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
<!--      <el-table-column prop="batch" label="感染时间">-->
<!--        <template v-slot="scope">-->
<!--          <span v-if="scope.row.batch === '1'">2023-7-28</span>-->
<!--          <span v-else-if="scope.row.batch === '2'">2023-7-29</span>-->
<!--          <span v-else>2023-7-30</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      date:'', batch:0, areaCode:'',area:'',
      KeyPerson:[]
    }
  },

  methods:{
    loadKeyPerson(){
      this.$http.get('keyPersonFilter',{ params: { date: this.date, batch: this.batch, areaCode: this.areaCode }}).then((res)=> {
        this.KeyPerson = res.data
      })},
  },
  created() {
    this.date = this.$route.query.date;
    this.batch = this.$route.query.batch;
    this.areaCode = this.$route.query.areaCode;
    if(this.areaCode === '10001'){
      this.area = '蜀山区'
    }else if(this.areaCode === '10002'){
      this.area = '庐阳区'
    }else if(this.area === '10003'){
      this.area = '包河区'
    }else{
      this.area = '瑶海区'
    }
    this.loadKeyPerson()
  },}
</script>

<style scoped>

</style>
