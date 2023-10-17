<template>
  <div>
    <el-table style="width: 100%"  :header-cell-style="{ textAlign: 'center'}" :cell-style="{ textAlign: 'center'}"  stripe border :data="pagePatients">
      <el-table-column prop="patientName" label="姓名"></el-table-column>
      <el-table-column prop="epidemicId" label="传染病" width="100">流行性感冒</el-table-column>
      <el-table-column prop="areaCode" label="地区" width="100">
        <template v-slot="scope">
          <span v-if="scope.row.areaCode === '10001'">蜀山区</span>
          <span v-else-if="scope.row.areaCode === '10002'">庐阳区</span>
          <span v-else-if="scope.row.areaCode === '10003'">包河区</span>
          <span v-else>瑶海区</span>
        </template>
      </el-table-column>
      <el-table-column prop="patientAddress" label="住址"></el-table-column>
      <el-table-column prop="patientTel" label="联系方式" width="180"></el-table-column>
      <el-table-column prop="patientSymptom" label="症状">
        <template v-slot="scope">
          <span v-if="scope.row.patientSymptom === 1">无症状</span>
          <span v-else-if="scope.row.patientSymptom === 2">较轻</span>
          <span v-else-if="scope.row.patientSymptom === 3">一般</span>
          <span v-else>严重</span>
        </template>
      </el-table-column>
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
      <el-table-column label="操作" width="350px">
        <template v-slot="scope">
          <el-button size="medium" type="warning" icon="el-icon-search" @click="findContacts(scope.row.patientId,scope.row.batch)">查看接触者</el-button>
          <el-button size="medium" type="danger" icon="el-icon-search" @click="findPotentialPatients(scope.row.patientId,scope.row.batch)">查看潜在患者</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination-container"
      :current-page="currentPage"
      :page-sizes="[3, 5, 8, 10]"
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
      pagePatients:[],
      currentPage: 1, // 当前页码
      pageSize: 8,   // 每页显示的条目数
      totalItems: 100, // 总条目数
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
    // 加载数据的方法，根据当前页码和每页显示的条目数来加载数据
    showDayPatients(days) {
      this.$http.get('getPatientsByDate',{params: { date: days}}).then((res)=>{
        this.patients = res.data
        this.totalItems = res.data.length
        this.getPageInfo()
      })
    },
    //展示患者记录
    showPatients(days,areaCode){
      this.$http.get('getPatients',{ params:{ date:days,areaCode:areaCode }}).then((res)=>{
        this.patients = res.data
        this.totalItems = res.data.length
        this.getPageInfo()
      })
    },
    loadData(days,areaCode){
      if(areaCode ==='10005'){
        this.showDayPatients(days)
      }else {
        this.showPatients(days,areaCode)
      }
    },
    //找接触者
    findContacts(id,batch){
      this.$router.push({
        name: 'contacts', // 一定要写这
        query: { id: id, batch: batch,}
      })
    },

    findPotentialPatients(id,batch){
      this.$router.push({
        path:'potentialPatients',
        query:{ id: id, batch: batch }
      })
    }
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
