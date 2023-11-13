<template>
  <div>
    <el-card>
      <h2>区域感染者信息</h2>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 30px">
        <el-form-item label="查询日期">
          <el-select v-model="formInline.day" placeholder="查询天数">
            <el-option label="7月28日" value="1"></el-option>
            <el-option label="7月29日" value="2"></el-option>
            <el-option label="7月30日" value="3"></el-option>
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
              <el-form-item label="传染病">
                <el-input style="width: 202px" class="inputTag" v-model="patient.epidemic" autocomplete="off"></el-input>
              </el-form-item>
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
              <el-form-item label="轨迹">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple
                  :limit="2"
                  style="width: 187px;position: relative;left: -50px">
                <el-button size="medium" type="primary">点击上传</el-button>
<!--                  :on-preview="handlePreview"-->
<!--                  :on-remove="handleRemove"-->
<!--                  :before-remove="beforeRemove"-->
<!--                  :on-exceed="handleExceed"-->
<!--                  :file-list="fileList">-->
                  <!--                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                </el-upload>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogPatientFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="patientMessage">确 定</el-button>
            </div>
          </el-dialog>
          <el-button type="info" style="position: relative;left: 740px;" @click="resetPotentialPatientForm">上传接触者信息</el-button>
          <el-dialog  title="接触者信息" :visible.sync="dialogPotentialPatientFormVisible" width="50%" >
            <el-form ref="addPotentialPatientForm" :model="potentialPatient" label-width="60px" style="text-align: center">
              <el-form-item label="传染病">
                <el-input style="width: 202px" class="inputTag" v-model="potentialPatient.epidemic" ></el-input>
              </el-form-item>
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
              <el-form-item label="轨迹">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple
                  :limit="2"
                  style="width: 187px;position: relative;left: -50px">
<!--                  :on-preview="handlePreview"-->
<!--                  :on-remove="handleRemove"-->
<!--                  :before-remove="beforeRemove"-->
<!--                  :on-exceed="handleExceed"-->
<!--                  :file-list="fileList"-->
                  <el-button size="medium" type="primary">点击上传</el-button>
<!--                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                </el-upload>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogPotentialPatientFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="potentialPatientMessage">确 定</el-button>
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
      formInline:{ day: '1', region: '10005'},
      dialogPatientFormVisible: false,
      dialogPotentialPatientFormVisible: false,
      patient: {
        epidemic:"流行性感冒",
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
        epidemic:"流行性感冒",
        batch:'',
        contactName: '',
        areaCode: '',
        patientName: '',
        contactAge: '',
        contactSex: '',
        contactTel: '',
        contactAddress: '',
      },
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
          epidemic:"流行性感冒",
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
    },
    resetPotentialPatientForm(){
      this.dialogPotentialPatientFormVisible = true;
      this.$nextTick(() => {
        this.potentialPatient = {
          epidemic:"流行性感冒",
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
    },
    patientMessage() {
      this.dialogPatientFormVisible = false;
      this.$message({
        message: '患者信息插入成功',
        type: 'success'
      });
    },
    potentialPatientMessage() {
      this.dialogPotentialPatientFormVisible = false;
      this.$message({
        message: '潜在患者信息插入成功',
        type: 'success'
      });
    },
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
