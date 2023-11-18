<template>
<div>
  <el-card>
    <h2>区域感染趋势预测</h2>
    <el-form :inline="true" :model="day" class="demo-form-inline" style="margin-top: 30px" >
      <el-form-item label="感染日期">
        <el-select v-model="day.batch" placeholder="查询日期">
          <el-option label="7月28日" value="1"></el-option>
          <el-option label="7月29日" value="2"></el-option>
          <el-option label="7月30日" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="showPrediction(day.batch)">趋势预测</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <div class="card-container">
    <el-card class="card">
      <!--        <div slot="header" >-->
      <el-form :inline="true" :model="area" >
        <el-form-item label="感染区域">
          <el-select v-model="area.areaCode">
            <el-option label="蜀山区" value="10001"></el-option>
            <el-option label="庐阳区" value="10002"></el-option>
            <el-option label="包河区" value="10003"></el-option>
            <el-option label="瑶海区" value="10004"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showAreaPrediction(area.areaCode,day.batch)">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="leftChart" id="left_chart" :style="myChartLeftStyle" ></div>
    </el-card>
    <el-card class="card">
      <h3>合肥市感染趋势预测</h3>
      <!--        <div slot="header" style="padding-top: 10px; padding-bottom: 10px"></div>-->
      <div class="rightChart" id="right_chart" :style="myChartRightStyle" ></div>
    </el-card>
  </div>
</div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data(){
    return{
      day:{ batch:"1" },
      area:{ areaCode:"10001"},
      date:[],
      ShuShanPatientsInfo:[0,0,0],          //蜀山区患者数
      ShuShanPotentialPatientsInfo:[0,0,0], //蜀山区潜在患者数
      LuYangPatientInfo:[0,0,0],            //庐阳区患者数
      LuYangPotentialPatientInfo:[0,0,0],   //庐阳区潜在患者数
      BaoHePatientInfo:[0,0,0],             //包河区患者数
      BaoHePotentialPatientInfo:[0,0,0],    //包河区潜在患者数
      YaoHaiPatientInfo:[0,0,0],            //瑶海区患者数
      YaoHaiPotentialPatientInfo:[0,0,0],   //瑶海区潜在患者数
      AllPatientInfo:[0,0,0],                   //总体患者数
      AllPotentialPatientInfo:[0,0,0],          //总体潜在患者数
      myChartLeftStyle: { float: "left", width: "100%", height: "400px" }, //图表样式
      myChartRightStyle: { float: "right", width: "100%", height: "400px" }, //图表样式
    }
  },
  mounted() {
    this.showPrediction("1")
  },
  methods:{
    async showPrediction(day){
      if(day === "1"){
        this.date = ["7月28日","7月29日","7月30日"]
      }else if(day === "2"){
        this.date = ["7月29日","7月30日","7月31日"]
      }else{
        this.date = ["7月30日","7月31日","8月1日"]
      }
      const res = await this.$http.get('forecast', { params: { areaCode: "all", batch: day } });
      console.log(res.data);
      let responseData = res.data;
      this.AllPatientInfo = Object.values(responseData)
        .map(valueArray => valueArray[0]);
      console.log(this.AllPatientInfo)
      this.AllPotentialPatientInfo = Object.values(responseData)
        .map(valueArray => valueArray[1]);
      console.log(this.AllPotentialPatientInfo)
      await this.showAreaPrediction(this.area.areaCode, day)
      const mulRightColumn = {
        xAxis: { data: this.date },
        // 图例
        legend: { data: ["感染者数", "潜在患者数"], top: "0%" },
        yAxis: {},
        series: [
          {
            type: "line", //形状为柱状图
            data: this.AllPatientInfo,
            name: "感染者数", // legend属性
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            },
            itemStyle: { color: '#ff4a4a' }
          },
          {
            type: "line", //形状为柱状图
            data: this.AllPotentialPatientInfo,
            name: "潜在患者数", // legend属性
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            },
            itemStyle: {
              color: '#ffe74a'
            }
          }
        ]
      };
      let myRightChart= echarts.getInstanceByDom(document.getElementById("right_chart")); //有的话就获取已有echarts实例的DOM节点。
      if (myRightChart== null) { // 如果不存在，就进行初始化。
        myRightChart = echarts.init(document.getElementById("right_chart"));
      }
      myRightChart.setOption(mulRightColumn);
      window.addEventListener("resize", () => {
        myRightChart.resize();
      });

    },
    async showAreaPrediction(areaCode,day){
      let areaPatients = [];
      let areaPotentialPatients = [];
      if(day === "1"){
        this.date = ["7月28日","7月29日","7月30日"]
      }else if(day === "2"){
        this.date = ["7月29日","7月30日","7月31日"]
      }else{
        this.date = ["7月30日","7月31日","8月1日"]
      }
      const res = await this.$http.get('forecast', { params: { areaCode: areaCode, batch: day } });
      console.log(res.data);
      let responseData = res.data;
      areaPatients = Object.values(responseData)
        .map(valueArray => valueArray[0]);
      console.log(areaPatients)
      areaPotentialPatients = Object.values(responseData)
        .map(valueArray => valueArray[1]);
      console.log(areaPotentialPatients)
      const mulLeftColumn = {
        xAxis: { data: this.date },
        // 图例
        legend: { data: ["感染者数", "潜在患者数"], top: "0%" },
        yAxis: {},
        series: [
          {
            type: "line", //形状为柱状图
            data: areaPatients,
            name: "感染者数", // legend属性
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            },
            itemStyle: { color: '#ff4a4a' }
          },
          {
            type: "line", //形状为柱状图
            data: areaPotentialPatients,
            name: "潜在患者数", // legend属性
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            },
            itemStyle: {
              color: '#ffe74a'
            }
          }
        ]
      };
      let myLeftChart= echarts.getInstanceByDom(document.getElementById("left_chart")); //有的话就获取已有echarts实例的DOM节点。
      if (myLeftChart== null) { // 如果不存在，就进行初始化。
        myLeftChart = echarts.init(document.getElementById("left_chart"));
      }
      myLeftChart.setOption(mulLeftColumn);
      window.addEventListener("resize", () => {
        myLeftChart.resize();
      });
    }
  }

}
</script>


<style scoped>
  .card-container {
    display: flex;
    justify-content: space-between;
    padding: 40px;
    margin: 10px 30px 10px;
  }

  .card {
    flex: 1;
    margin: 0 20px;
  }

  .leftChart {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .rightChart {
    margin-top: 50px;
    margin-bottom: 50px;
  }
</style>
