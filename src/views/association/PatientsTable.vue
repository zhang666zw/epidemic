<template>
  <div>
    <el-table style="width: 100%; "  :header-cell-style="{ textAlign: 'center'}" :cell-style="{ textAlign: 'center'}"  stripe border :data="pagePatients">
      <el-table-column prop="patientName" label="姓名"></el-table-column>
      <el-table-column prop="epidemicId" label="传染病" width="180">流行性感冒</el-table-column>
      <el-table-column prop="areaCode" label="地区">
        <template v-slot="scope">
          <span>{{areaMap[scope.row.areaCode]}}</span>
<!--          <span v-else-if="scope.row.areaCode === '101011'">中原区</span>-->
<!--          <span v-else>瑶海区</span>-->
        </template>
      </el-table-column>
      <el-table-column prop="patientAddress" label="住址"></el-table-column>
      <el-table-column prop="patientTel" label="联系方式"></el-table-column>

      <el-table-column prop="patientAge" label="年龄">
        <template v-slot="scope">
          <span>{{scope.row.patientAge}}岁</span>
        </template>
      </el-table-column>
      <el-table-column prop="patientSex" label="性别">
        <template v-slot="scope">
          <span v-if="scope.row.patientSex === 1">男</span>
          <span  v-else-if="scope.row.patientSex === 0">女</span>
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
  name: 'Table',
  data(){
    return{
      patients:[],
      pagePatients:[],
      currentPage: 1, // 当前页码
      pageSize: 10,   // 每页显示的条目数
      totalItems: 100, // 总条目数
      areaMap:{"101010":"金水区","101011":"中原区","101012":"二七区","101013":"上街区","101014":"惠济区"}
    }
  },
  methods:{
    getPageInfo(){
      //清空pageTicket中的数据
      this.pagePatients=[];
      // 获取当前页的数据
      for(let i = ( this.currentPage - 1 ) * this.pageSize ; i < this.totalItems ; i++){
        //把遍历的数据添加到pageTicket里面
        this.pagePatients.push(this.patients[i]);
        //判断是否达到一页的要求
        if(this.pagePatients.length===this.pageSize) break;
      }
    },
    // 处理每页显示条目数变化
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.$emit('custom-event');
    },
    // 处理页码变化
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.$emit('custom-event');
    },
    showPatients(date,areaCode){
      this.$http.get('getPatientsByDateAndAreaCode',{ params: { date:date,areaCode:areaCode } }).then((res)=>{
        this.patients = res.data
        this.totalItems = res.data.length
        this.getPageInfo()
      })
    },
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
