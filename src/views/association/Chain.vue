<template>
  <div class="chain">
    <el-card>
      <h2 style="display: inline-block">区域传播链</h2>
      <el-button style="position: relative; left: 900px" type="success" @click="showChains()">传播链可视化</el-button>
    </el-card>
<!--      <el-button type="primary" @click="findObject()">筛查重点对象</el-button>-->
    <el-table class="el-table" :header-cell-style="{ textAlign: 'center'}" :cell-style="{ textAlign: 'center'}" border :data="chains">
      <el-table-column prop="correlationChainCode" label="传播区域">
        <template v-slot="scope">
          <span v-if="scope.row.correlationChainCode === '10001'">蜀山区</span>
          <span v-else-if="scope.row.correlationChainCode === '10002'">庐阳区</span>
          <span v-else-if="scope.row.correlationChainCode === '10003'">包河区</span>
          <span v-else>瑶海区</span>
        </template>
      </el-table-column>
      <el-table-column prop="correlationChainId" label="传播链标识" ></el-table-column>
      <el-table-column prop="patientId1" label="患者甲ID"></el-table-column>
      <el-table-column prop="patientName1" label="患者甲姓名"></el-table-column>
      <el-table-column prop="patientId2" label="患者乙ID"></el-table-column>
      <el-table-column prop="patientName2" label="患者乙姓名"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200px">
        <template v-slot="scope">
          <el-button type="primary" size="medium" icon="el-icon-search" @click="loadPotentialContacts(scope.row.patientId1)">查看潜在患者</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      batch: 0, patients:[],
      date:'',  chains: [], areaCode:''
    }
  },

  methods: {
    loadPotentialContacts(id){
      this.$router.push({
        name:'potential',
        query: { patient_id: id, batch: this.batch},
      })
    },

    //加载传播链数据
    loadChain(){
      this.$http.get('/getRelevanceChain',{ params:{ batch:this.batch,areaCode:this.areaCode}}).then((res)=>{
        res.data.forEach(ele=>{
          this.patients.push(ele.patientId1);
        });
        this.chains = res.data;

      })
    },

    showChains(){
      this.$router.push({
        name:'AreaChain',
        query:{ areaCode:this.areaCode,date:this.date,batch:this.batch,}
      })
    }
  },
  //生命周期函数

  created() {
    this.patients = [];
    this.date = this.$route.query.date;
    this.areaCode = this.$route.query.areaCode;
    this.batch = this.$route.query.batch;
    this.loadChain()
  },
}

</script>

<style scoped>
.el-table{
  width: 75%;
  margin: 50px auto 20px;
}
</style>
