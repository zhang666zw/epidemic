<template>
  <div>
    <el-card>
      <h2 style="display: inline-block">{{area}}传播链</h2>
    </el-card>
    <div id="relationChart" class="echarts_container" style="width: 100%; height: 800px;"></div>
  </div>
</template>

<script>
  import * as echarts from "echarts";
  export default {
    data() {
      return {
        date:'', batch:'', areaCode:'', area:'',
        patients:[],
        Patients:[],
        patientsName:[],
        potentialPatients:[],
        links: [],
      }
    },
    created() {
      // this.potentialPatients = [];
      this.patients = [];
      this.batch = this.$route.query.batch;
      this.date = this.$route.query.date;
      this.areaCode = this.$route.query.areaCode;
      if(this.$route.query.areaCode === "10001"){
        this.area = "蜀山区"
      }else if (this.$route.query.areaCode === "10002"){
        this.area = "庐阳区"
      }else if (this.$route.query.areaCode === "10003"){
        this.area = "包河区"
      }else {
        this.area = "瑶海区"
      }
    },
    mounted() {
      // 初始化关系图
      this.initEcharts();
    },
    methods: {
      async initEcharts() {
        try {
          const response = await this.$http.get('getRelevanceChain', { params: { batch: this.batch, areaCode: this.areaCode } });
          for (let i = 0; i < response.data.length; i += 2) {
            const obj = response.data[i];
            const link = {
              source: obj.patientName1.toString(),
              target: obj.patientName2.toString(),
            };
            this.links.push(link);
          }
          console.log(this.links)
          response.data.forEach((ele) => {
            if (!(this.patientsName.includes(ele.patientName1))){
              this.patients.push(ele.patientId1);
              this.patientsName.push(ele.patientName1)
            }
          });
          console.log(this.patients)
          console.log(this.patientsName)
          this.Patients = this.patientsName.map((element) => ({
            name: element.toString(), // 将元素转换为字符串
            category: "感染者",
          }));
          console.log(this.Patients)
          for (let i = 0; i < this.patients.length; i++) {
            const potentialResponse = await this.$http.get('getPotentialPatients', { params: { patient_id: this.patients[i], batch: this.batch } });
            potentialResponse.data.forEach((element) => {
              const newObj = {
                name: element.contactName,
                category:"潜在患者"
              }
              this.Patients.push(newObj);
              const link2 = {
                source: this.patientsName[i].toString(),
                target: element.contactName.toString(),
              };
              this.links.push(link2)
            });
          }
        } catch (error) {
          // 处理错误
          console.error('发生错误：', error);
        }
        let option = {
          backgroundColor: '#EEF1F3',
          color: ["#ee6666", "#fac858",],
          legend: [{ //图例
            x: "right",
            show: true,
            data: ["感染者", "潜在患者"]
          }],
          series: [{
            type: "graph",
            legendHoverLink: true,
            layout: "force",
            categories: [
              { name: "感染者", symbolSize: 70},
              { name: "潜在患者", symbolSize: 60},
            ],
            force: {
              repulsion: [1000, 2000], //节点之间的斥力因子,支持设置成数组表达斥力的范围
              // edgeLength: [10, 20],
              layoutAnimation: true,
              friction: 0.1, //节点的移动速度。取值范围 0 到 1。
              edgeLength: [70, 90], //两个节点之间的距离，这个距离也会受 repulsion影响
            },
            symbolSize: 60,
            itemStyle: {
              shadowColor: "#666",
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
            roam: true, //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            draggable: true, //节点是否可拖拽，只在使用力引导布局的时候有用。
            // edgeSymbol: ["circle","arrow"],//设置边的箭头
            edgeSymbolSize: [4, 8],
            cursor: 'pointer',
            label: {
              show: true, // 图形上的文本标签， 可用于说明图形的一些数据信息， 比如值， 名称等
              fontStyle: "oblique",
              // position: "top",
              fontSize: 12,
              color: '#000', //如果设置为 'inherit'，则为视觉映射得到的颜色，如系列色。
              width: 100,
              overflow: "break", //文字超出宽度是否截断或者换行。配置width时有效
            },
            labelLayout: {
              moveOverlap: 'shiftX', //在标签重叠的时候是否挪动标签位置以防止重叠。
              draggable: true, //标签是否可以允许用户通过拖拽二次调整位置。
            },
            emphasis: {
              scale: true, //是否开启高亮后节点的放大效果。
              focus: 'adjacency'
            },
            lineStyle: {
              color: "#666",
              width: 2,
              curveness: 0, //关系线的曲度，支持从 0 到 1 的值，值越大曲度越大。
            },
            data:this.Patients,
            links:this.links,
          },
          ],
        };
        const myChart = echarts.init(document.getElementById("relationChart"));
        myChart.setOption(option);
        //窗口大小变化时，图表自适应窗口
        window.onresize = function () {
          myChart.resize();
        }
      }
    },
  }
</script>

<style scoped>
.echarts_container {
  width: 100%;
  height: 600px;
}
</style>
