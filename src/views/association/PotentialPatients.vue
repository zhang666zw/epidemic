<template>
  <div>
    <el-card><h2>id为{{patient_id}}的患者关联的潜在患者</h2></el-card>
    <el-table style="width: 100%; " border :data="pagePotentialPatients" >
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
        patient_id:'', batch: 0 , potentialPatients:[],
        pagePotentialPatients:[],
        currentPage: 1, // 当前页码
        pageSize: 10,   // 每页显示的条目数
        totalItems: 100, // 总条目数
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
        this.loadPotentialContacts();
      },
      loadPotentialPatients() {
        this.$http.get('getPotentialPatients',{ params: { patient_id: this.patient_id, batch: this.batch }}).then((res)=> {
          this.potentialPatients = res.data;
          this.totalItems = res.data.length;
          this.getPageInfo()
        })
      }
    },

    created() {
      this.patient_id = this.$route.query.patient_id;
      this.batch = this.$route.query.batch;
      this.loadPotentialPatients()
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
