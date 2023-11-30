<template>
  <div class="chain">
    <el-card>
      <h2 style="display: inline-block">区域传播链</h2>
      <span style="position: fixed; right: 80px; top:65px">
        <el-button type="danger"  @click="findObject()">筛查重点潜在患者</el-button>
        <el-button type="success" @click="showChains()">传播链可视化</el-button>
      </span>
    </el-card>
    <el-table class="el-table" :header-cell-style="{ textAlign: 'center'}" :cell-style="{ textAlign: 'center'}" border :data="pageChains">
      <el-table-column prop="correlationChainCode" label="传播区域">
        <template v-slot="scope">
          <span>{{areaMap[scope.row.correlationChainCode]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="correlationChainCode" label="传播链标识" ></el-table-column>
      <el-table-column prop="patientId1" label="患者甲ID"></el-table-column>
      <el-table-column prop="patientName1" label="患者甲姓名"></el-table-column>
      <el-table-column prop="patientId2" label="患者乙ID"></el-table-column>
      <el-table-column prop="patientName2" label="患者乙姓名"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200px">
        <template v-slot="scope">
          <el-link type="primary" size="medium" :underline="false"  @click="loadPotentialContacts(scope.row.patientId1)">查看潜在患者</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination-container"
      :current-page="currentPage"
      :page-sizes="[5, 8, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalItems"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data(){
    return{
      patients:[],
      date:'',  chains: [], areaCode:'',
      pageChains:[],
      currentPage: 1, // 当前页码
      pageSize: 10,   // 每页显示的条目数
      totalItems: 100, // 总条目数
      areaMap:{"101010":"金水区","101011":"中原区","101012":"二七区","101013":"上街区","101014":"惠济区"}
    }
  },
  methods: {
    findObject(){
      this.$router.push({
        path: '/association/keyPerson',
        query: { date:this.date,areaCode:this.areaCode}
      })
    },
    getPageInfo(){
      //清空pageTicket中的数据
      this.pageChains=[];
      // 获取当前页的数据
      for(let i = ( this.currentPage - 1 ) * this.pageSize ; i < this.totalItems ; i++){
        //把遍历的数据添加到pageTicket里面
        this.pageChains.push(this.chains[i]);
        //判断是否达到一页的要求
        if(this.pageChains.length===this.pageSize) break;
      }
    },
    // 处理每页显示条目数变化
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      // this.$emit('custom-event');
      this.loadChain();
    },
    // 处理页码变化
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      // this.$emit('custom-event');
      this.loadChain();
    },
    loadPotentialContacts(id){
      this.$router.push({
        name:'potential',
        query: { patient_id: id, date: this.date},
      })
    },
    //加载传播链数据
    loadChain(){
      this.$http.get('/getRelevanceChain',{ params:{ date:this.date,areaCode:this.areaCode}}).then((res)=>{
        res.data.forEach(ele=>{
          this.patients.push(ele.patientId1);
        });
        this.chains = res.data;
        this.totalItems = res.data.length
        this.getPageInfo()
      })
    },
    showChains(){
      this.$router.push({
        name:'AreaChain',
        query:{ areaCode:this.areaCode,date:this.date}
      })
    }
  },
  //生命周期函数
  created() {
    this.patients = [];
    this.date = this.$route.query.date;
    this.areaCode = this.$route.query.areaCode;
    this.loadChain()
  },
}

</script>

<style scoped>
  .pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px; /* 可根据需要调整上边距 */
    font-size: 100px;
  }
</style>
