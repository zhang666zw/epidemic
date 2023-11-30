<template>
  <div>
    <el-card><h2>患者{{patientName}}的潜在患者</h2></el-card>
    <el-table style="width: 100%"  :header-cell-style="{ textAlign: 'center'}" :cell-style="{ textAlign: 'center'}"  stripe border :data="pagePotentialPatients">
      <el-table-column prop="contactName" label="姓名"></el-table-column>
      <el-table-column prop="areaCode" label="地区">
        <template v-slot="scope">
          <span>{{areaMap[scope.row.areaCode]}}</span>
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
      id:'', date:'',patientName:'',
      potentialPatients:[],
      pagePotentialPatients:[],
      currentPage: 1, // 当前页码
      pageSize: 10,   // 每页显示的条目数
      totalItems: 0, // 总条目数
      areaMap:{"101010":"金水区","101011":"中原区","101012":"二七区","101013":"上街区","101014":"惠济区"}
    }
  },
  methods:{
    getPageInfo(){
      //清空pageTicket中的数据
      this.pagePotentialPatients=[];
      // 获取当前页的数据
      for(let i = ( this.currentPage - 1 ) * this.pageSize ; i < this.totalItems ; i++){
        //把遍历的数据添加到pageTicket里面
        this.pagePotentialPatients.push(this.potentialPatients[i]);
        //判断是否达到一页的要求
        if(this.pagePotentialPatients.length===this.pageSize) break;
      }
    },
    // 处理每页显示条目数变化
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      // this.$emit('custom-event');
      this.loadPotentialPatients();
    },
    // 处理页码变化
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      // this.$emit('custom-event');
      this.loadPotentialPatients();
    },
    loadPotentialPatients() {
      this.$http.get('/infer',{ params:{ patient_id: this.id, date: this.date }}).then((res)=>{
        this.potentialPatients = res.data.filter(obj => obj.potentialPatientProbability > 0.6);
        this.totalItems = res.data.filter(obj => obj.potentialPatientProbability > 0.6).length;
        this.getPageInfo()
      })
    },
    getPatientName(id){
      this.$http.get('/getPatientById',{params:{id:id}}).then((res)=>{
        this.patientName =  res.data;
      })
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.getPatientName(this.id);
    this.date = this.$route.query.date;
    this.loadPotentialPatients()
  }
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
