<template>
  <div class="first">
    <el-card><h2>区域感染信息</h2></el-card>
    <div class="card-container">
      <el-card class="card">
          <el-form :inline="true" :model="Day" >
            <el-form-item label="查询日期">
              <el-date-picker
                v-model="Day.day"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="initLeftEcharts(Day.day)">查询</el-button>
            </el-form-item>
          </el-form>
        <div class="leftChart" id="left_chart" :style="myChartLeftStyle" ></div>
      </el-card>
      <el-card class="card">
        <h3>感染信息</h3>
        <div class="rightChart" id="right_chart" :style="myChartRightStyle" ></div>
      </el-card>
    </div>
  </div>
</template>


<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      xData: ["蜀山区", "瑶海区", "庐阳区", "包河区"], //横坐标
      xDate: ["7月28日", "7月29日", "7月30日"], //横坐标
      allPatients:[1,2,3,4],
      allPotentialPatients:[2,3,4,5],
      dayPatients:[0,0,0],
      dayPotentialPatients:[0,0,0],
      areaAllPatients:[0,0,0,0],
      areaAllPotentialPatients:[0,0,0,0],
      myChartLeftStyle: { float: "left", width: "100%", height: "400px" }, //图表样式
      myChartRightStyle: { float: "right", width: "100%", height: "400px" }, //图表样式
      Day:{ day:"2023-07-28"},
    };
  },
  created() {
    this.dayPatients = [0,0,0];
    this.dayPotentialPatients = [0,0,0];
    this.allPatients = [0,0,0,0];
    this.allPotentialPatients = [0,0,0,0];
  },
  mounted() {
    this.initLeftEcharts(this.Day.day);
    this.initRightEcharts();
  },
  methods: {
    countNumber(){
      const mulColumn = {
        xAxis: { data: this.xData },
        // 图例
        legend: { data: ["感染者数", "潜在患者数"], top: "0%" },
        yAxis: {},
        series: [
          { type: "bar", //形状为柱状图
            data: this.areaAllPatients,
            name: "感染者数", // legend属性
            label: {// 柱状图上方文本标签，默认展示数值信息
              show: true, position: "top"},
            itemStyle: { color: '#ff4a4a' }
          },
          {
            type: "bar", //形状为柱状图
            data: this.areaAllPotentialPatients,
            name: "潜在患者数", // legend属性
            label: { // 柱状图上方文本标签，默认展示数值信息
              show: true, position: "top"},
            itemStyle: { color: '#ffe74a'}
          }
        ]
      };
      let my_Chart= echarts.getInstanceByDom(document.getElementById("left_chart")); //有的话就获取已有echarts实例的DOM节点。
      if (my_Chart== null) { // 如果不存在，就进行初始化。
        my_Chart = echarts.init(document.getElementById("left_chart"));
      }
      my_Chart.setOption(mulColumn);
      window.addEventListener("resize", () => {
        my_Chart.resize();
      });

    },
    initLeftEcharts(day) {
      this.$http.get('countPatientAndPotential',{ params:{ date:day}}).then((res)=>{
        let arrX = [];
        let arrY = [];
        res.data.forEach(ele=>{
          arrX.push(ele.patient);
          arrY.push(ele.potential_patient);
        });
        for (let i = 0; i < arrX.length; i++) {
          this.allPatients[i] += arrX[i];
        }
        for (let j = 0; j < arrY.length; j++) {
          this.allPotentialPatients[j] += arrY[j];
        }
        // 多列柱状图
        const mulColumnZZTData = {
          xAxis: { data: this.xData },
          // 图例
          legend: { data: ["感染者数", "潜在患者数"], top: "0%" },
          yAxis: {},
          series: [
            {
              type: "bar", //形状为柱状图
              data: arrX,
              name: "感染者数", // legend属性
              label: {
                // 柱状图上方文本标签，默认展示数值信息
                show: true, position: "top"},
              itemStyle: { color: '#ff4a4a' }
            },
            {
              type: "bar", //形状为柱状图
              data: arrY,
              name: "潜在患者数", // legend属性
              label: {
                // 柱状图上方文本标签，默认展示数值信息
                show: true, position: "top"
              },
              itemStyle: {color: '#ffe74a'}
            }
          ]
        };
        let myLeftChart= echarts.getInstanceByDom(document.getElementById("left_chart")); //有的话就获取已有echarts实例的DOM节点。
        if (myLeftChart== null) { // 如果不存在，就进行初始化。
          myLeftChart = echarts.init(document.getElementById("left_chart"));
        }
        myLeftChart.setOption(mulColumnZZTData);
        //随着屏幕大小调节图表
        window.addEventListener("resize", () => { myLeftChart.resize();});
      })
    },
    async initRightEcharts(){
      let dateStr = '2023-7-28'
      for (let batch = 1; batch <= 3; batch++) {
        if(batch === 2){
          dateStr = '2023-7-29'
        }else if (batch === 3){
          dateStr = '2023-7-28'
        }
        try {
          const res = await this.$http.get('countPatientAndPotential', { params: { date: dateStr } });
          let dayPatient = [];
          let dayPotentialPatient = [];
          res.data.forEach(ele => {
            dayPatient.push(ele.patient);
            dayPotentialPatient.push(ele.potential_patient);
          });
          for(let i =0; i< 4;i++){
            this.areaAllPatients[i] += dayPatient[i];
            this.areaAllPotentialPatients[i] += dayPotentialPatient[i];
          }
          console.log(this.areaAllPatients);
          console.log(this.areaAllPotentialPatients);
          this.dayPatients[batch-1] = dayPatient.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
          this.dayPotentialPatients[batch-1] = dayPotentialPatient.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        } catch (error) {
          console.error('请求出错：', error);
        }
      }
      this.dayPatients[1] += this.dayPatients[0];
      this.dayPatients[2] += this.dayPatients[1];
      this.dayPotentialPatients[1] += this.dayPotentialPatients[0];
      this.dayPotentialPatients[2] += this.dayPotentialPatients[1];
      let patients = this.dayPatients;
      let potentialPatients = this.dayPotentialPatients;
      const mulColumnZZTData2 = {
        xAxis: { data: this.xDate },
        // 图例
        legend: { data: ["感染者数", "潜在患者数"], top: "0%" },
        yAxis: {},
        series: [
          {
            type: "line", //形状为柱状图
            data: patients,
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
            data: potentialPatients,
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
      myRightChart.setOption(mulColumnZZTData2);
      window.addEventListener("resize", () => {
        myRightChart.resize();
      });
    }
  }
};
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
