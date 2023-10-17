<template>
  <div>
    <el-card>
      <h2>区域感染者信息</h2>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 30px">
        <el-form-item label="查询日期">
          <el-select v-model="formInline.day" placeholder="查询天数">
            <el-option label="7月28日" value="2023-7-28"></el-option>
            <el-option label="7月29日" value="2023-7-29"></el-option>
            <el-option label="7月30日" value="2023-7-30"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="传播区域">
          <el-select v-model="formInline.region" placeholder="传播区域">
            <el-option label="蜀山区" value="10001"></el-option>
            <el-option label="庐阳区" value="10002"></el-option>
            <el-option label="包河区" value="10003"></el-option>
            <el-option label="瑶海区" value="10004"></el-option>
            <el-option label="合肥市" value="10005"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showRecord()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" style="position: relative;left: 730px;" @click="resetPatientForm">上传患者信息</el-button>
          <el-dialog  title="患者信息" :visible.sync="dialogPatientFormVisible" width="50%" >
            <el-form ref="addPatientForm" :model="patient" label-width="60px" style="text-align: center">
              <el-form-item label="姓名">
                <el-input class="inputTag" v-model="patient.patientName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="日期">
                <el-select class="selectTag" v-model="patient.batch" placeholder="请选择感染日期">
                  <el-option label="7月28日" value="1"></el-option>
                  <el-option label="7月29日" value="2"></el-option>
                  <el-option label="7月30日" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="地址">
                <el-input class="inputTag" v-model="patient.patientAddress"></el-input>
              </el-form-item>
              <el-form-item label="区域">
                <el-select class="selectTag" v-model="patient.areaCode" placeholder="请选择区域">
                  <el-option label="蜀山区" value="10001"></el-option>
                  <el-option label="庐阳区" value="10002"></el-option>
                  <el-option label="包河区" value="10003"></el-option>
                  <el-option label="瑶海区" value="10004"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="电话">
                <el-input class="inputTag" v-model="patient.patientTel" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="症状">
                <el-select class="selectTag" v-model="patient.patientSymptom" placeholder="请选择表现症状">
                  <el-option label="无症状" value="1"></el-option>
                  <el-option label="轻微" value="2"></el-option>
                  <el-option label="一般" value="3"></el-option>
                  <el-option label="严重" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  label="年龄">
                <el-input class="inputTag" v-model="patient.patientAge" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-select class="selectTag" v-model="patient.patientSex" placeholder="请选择患者性别">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogPatientFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogPatientFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          <el-button type="info" style="position: relative;left: 730px;" @click="resetPotentialPatientForm">上传接触者信息</el-button>
          <el-dialog  title="接触者信息" :visible.sync="dialogPotentialPatientFormVisible" width="50%" >
            <el-form ref="addPotentialPatientForm" :model="potentialPatient" label-width="60px" style="text-align: center">
              <el-form-item label="姓名">
                <el-input class="inputTag" v-model="potentialPatient.contactName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="日期">
                <el-select class="selectTag" v-model="potentialPatient.batch" placeholder="请选择日期">
                  <el-option label="7月28日" value="1"></el-option>
                  <el-option label="7月29日" value="2"></el-option>
                  <el-option label="7月30日" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="地址">
                <el-input class="inputTag" v-model="potentialPatient.contactAddress"></el-input>
              </el-form-item>
              <el-form-item label="区域">
                <el-select class="selectTag" v-model="potentialPatient.areaCode" placeholder="请选择区域">
                  <el-option label="蜀山区" value="10001"></el-option>
                  <el-option label="庐阳区" value="10002"></el-option>
                  <el-option label="包河区" value="10003"></el-option>
                  <el-option label="瑶海区" value="10004"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="患者" >
                <el-input  class="inputTag" v-model="potentialPatient.patientName"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input style="width: 202px" class="inputTag" v-model="potentialPatient.contactTel"></el-input>
              </el-form-item>
              <el-form-item  label="年龄">
                <el-input class="inputTag" v-model="potentialPatient.contactAge" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-select class="selectTag" v-model="potentialPatient.contactSex" placeholder="请选择接触者性别">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogPotentialPatientFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogPotentialPatientFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </el-form-item>
      </el-form>
    </el-card>
    <Table  @custom-event="showRecord()" ref='show' ></Table >
  </div>
</template>


<script>
import Table from "./PatientsTable.vue";
export default{
  data(){
    return{
      formInline:{ day: '2023-7-28', region: '10005'},
      // labelPosition:'left',
      dialogPatientFormVisible: false,
      dialogPotentialPatientFormVisible: false,
      patient: {
        batch:'',
        areaCode:'',
        patientName: '',
        patientAddress: '',
        patientTel: '',
        patientSymptom:'',
        patientAge: '',
        patientSex: ''
      },
      potentialPatient: {
        batch:'',
        contactName: '',
        areaCode: '',
        patientName: '',
        contactAge: '',
        contactSex: '',
        contactTel: '',
        contactAddress: '',
      },
      // formLabelWidth: '70px'
    }
  },
  components:{ Table },
  methods: {
    showRecord() {
      this.$refs.show.loadData(this.formInline.day,this.formInline.region)
    },
    resetPatientForm(){
      this.dialogPatientFormVisible = true;
      this.$nextTick(() => {
        this.patient = {
          batch:'',
          areaCode:'',
          patientName: '',
          patientAddress: '',
          patientTel: '',
          patientSymptom:'',
          patientAge: '',
          patientSex: ''
        }
      })
      // this.$refs['addPatientForm'].resetFields();
    },
    resetPotentialPatientForm(){
      this.dialogPotentialPatientFormVisible = true;
      this.$nextTick(() => {
        this.potentialPatient = {
          batch:'',
          contactName: '',
          areaCode: '',
          patientName: '',
          contactAge: '',
          contactSex: '',
          contactTel: '',
          contactAddress: '',
        }
      })
      // this.$refs['addPatientForm'].resetFields();
    }
  },
  mounted() {
    this.showRecord()
  }
}
</script>

<style scoped>
  .inputTag{
    position: relative;
    left: -40px;
  }
  .selectTag{
    position: relative;
    left: -40px;
  }
</style>
