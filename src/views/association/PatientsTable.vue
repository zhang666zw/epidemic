<template>
  <div>
    <el-table style="width: 100%; "  :header-cell-style="{ textAlign: 'center'}" :cell-style="{ textAlign: 'center'}"  stripe border :data="pagePatients">
      <el-table-column prop="patientName" label="姓名"></el-table-column>
      <el-table-column prop="epidemicId" label="传染病" width="180">流行性感冒</el-table-column>
      <el-table-column prop="areaCode" label="地区">
        <template v-slot="scope">
          <span v-if="scope.row.areaCode === '10001'">蜀山区</span>
          <span v-else-if="scope.row.areaCode === '10002'">庐阳区</span>
          <span v-else-if="scope.row.areaCode === '10003'">包河区</span>
          <span v-else>瑶海区</span>
        </template>
      </el-table-column>
      <el-table-column prop="patientAddress" label="住址"></el-table-column>
      <el-table-column prop="patientTel" label="联系方式"></el-table-column>
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
  name: 'Table',
  data(){
    return{
      patients:[],
      example:[{
        "epidemic_id": "1",
        "area_code": "10003",
        "patient_name": "李达康",
        "patient_address": "中环云邸",
        "patient_tel": "13356650001",
        "patient_symptom": "1",
        "patient_age": "34",
        "patient_sex": "1"
      },
        {
          "epidemic_id": "1",
          "area_code": "10003",
          "patient_name": "陈岩石",
          "patient_address": "尚泽紫金公馆",
          "patient_tel": "18056650002",
          "patient_symptom": "3",
          "patient_age": "22",
          "patient_sex": "0"
        },
        {
          "epidemic_id": "1",
          "area_code": "10003",
          "patient_name": "吴心怡",
          "patient_address": "中环云邸",
          "patient_tel": "17718015601",
          "patient_symptom": "2",
          "patient_age": "55",
          "patient_sex": "0"
        },
        {
          "epidemic_id": "1",
          "area_code": "10003",
          "patient_name": "陆亦可",
          "patient_address": "中环云邸",
          "patient_tel": "19910011003",
          "patient_symptom": "4",
          "patient_age": "43",
          "patient_sex": "1"
        },
        {
          "epidemic_id": "1",
          "area_code": "10003",
          "patient_name": "沙瑞金",
          "patient_address": "尚泽紫金公馆",
          "patient_tel": "13099556767",
          "patient_symptom": "2",
          "patient_age": "34",
          "patient_sex": "0"
        },
        {
          "epidemic_id": "1",
          "area_code": "10003",
          "patient_name": "赵东来",
          "patient_address": "合景天韵公馆",
          "patient_tel": "19840534141",
          "patient_symptom": "2",
          "patient_age": "45",
          "patient_sex": "1"
        },
        {
          "epidemic_id": "1",
          "area_code": "10003",
          "patient_name": "陈海",
          "patient_address": "安徽大学家属院",
          "patient_tel": "17828482904",
          "patient_symptom": "3",
          "patient_age": "38",
          "patient_sex": "0"
        },
        {
          "epidemic_id": "1",
          "area_code": "10003",
          "patient_name": "梁璐",
          "patient_address": "万科悦城",
          "patient_tel": "11287851366",
          "patient_symptom": "4",
          "patient_age": "57",
          "patient_sex": "0"
        },],
      pagePatients:[
      ],
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
    // showDayPatients(days) {
    //   this.$http.get('getPatientsByDate',{params:{date:days}}).then((res)=>{
    //     this.patients = res.data
    //     this.totalItems = res.data.length
    //     this.getPageInfo()
    //   })
    // },
    showPatients(days,areaCode){
      this.$http.get('getPatients',{ params: { date:days,areaCode:areaCode } }).then((res)=>{
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
