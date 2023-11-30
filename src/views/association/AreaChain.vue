<template>
  <div>
    <el-card>
      <h2 style="display: inline-block">{{areaName}}传播链</h2>
    </el-card>
    <div id="relationChart" class="echarts_container" style="width: 100%; height: 800px;"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
    data() {
      return {
        date:'', areaCode:'', areaName:'',
        patients:[],
        patientID:[],
        potentialID:[],
        person:[],
        personRelation:[],
        Patients:[],
        patientsName:[],
        potentialPatients:[],
        links: [],
        areaMap:{"101010":"金水区","101011":"中原区","101012":"二七区","101013":"上街区","101014":"惠济区"}
      }
    },
    created() {
      // this.potentialPatients = [];
      this.patients = [];
      this.links = [];
      this.date = this.$route.query.date;
      this.areaCode = this.$route.query.areaCode;
      this.areaName = this.areaMap[this.$route.query.areaCode];
    },
    mounted() {
      // 初始化关系图
      this.initEcharts();
    },
    methods: {
      async initEcharts() {
        try {
          const response = await this.$http.get('getRelevanceChain', { params: { date: this.date, areaCode: this.areaCode } });
          this.personRelation = [];
          response.data.forEach((ele)=>{
            const obj = {
              source: ele.patientId1.toString(),
              target: ele.patientId2.toString(),
            }
            this.personRelation.push(obj)
            if(!(this.patientID.includes((ele.patientId1)))){
              this.patientID.push(ele.patientId1);
              const patient1 = {
                name: ele.patientName1,
                id: ele.patientId1.toString(),
                category: "感染者",
                address: "无",
                phone:"无"
              }
              this.person.push(patient1)
            }
            if(!(this.patientID.includes((ele.patientId2)))){
              this.patientID.push(ele.patientId2);
              const patient2 = {
                name: ele.patientName2,
                id: ele.patientId2.toString(),
                category: "感染者",
                address: "无",
                phone:"无"
              }
              this.person.push(patient2)
            }
          })

          let a = '10001';
          for (let i = 0; i < this.patientID.length; i++) {
            const potentialResponse = await this.$http.get('getPotentialPatients', { params: { patient_id: this.patientID[i], date: this.date } });
            potentialResponse.data.forEach((ele) => {
              if(!(this.potentialID.includes((ele.contactId)))){
                this.potentialID.push(ele.contactId);
                const potentialPatient = {
                  name: ele.contactName,
                  address:ele.contactAddress,
                  phone:ele.contactTel,
                  category:"潜在患者",
                  id:ele.contactId.toString() + a,
                }
                this.person.push(potentialPatient);
              }
              const obj = {
                source: this.patientID[i].toString(),
                target: ele.contactId.toString() + a,
              };
              // console.log(obj)
              this.personRelation.push(obj)
            });
          }
        } catch (error) {
          // 处理错误
          console.error('发生错误：', error);
        }
        // 示例用法
        // const duplicateNames = this.checkDuplicateNames(this.person);
        // console.log(duplicateNames);
        let option = {
          backgroundColor: '#EEF1F3',
          color: ["#ee6666", "#fac858",],
          legend: [{ //图例
            x: "right",
            show: true,
            data: ["感染者", "潜在患者"]
          }],
          tooltip: {
            formatter: function(x) {
              // console.log(x.data);
              if (x.data.name!=null){
                return `<div><p><label>姓名：</label>${x.data.name}</p><p><label>住址：</label>${x.data.address}</p><p><label>电话：</label>${x.data.phone}</p></div>`;
              }else if (x.data.target.length>6){
                return `<div><p><label>感染者：</label>${x.data.source}</p><p><label>被感染者：</label>${x.data.target}</p></div>`;
              }else {
                return `<div><p><label>感染者：</label>${x.data.source}</p><p><label>关联感染者：</label>${x.data.target}</p></div>`;
              }
            },
          },
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
                // formatter: function(x) {
                //   return x.data.name;
                // },
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
            data:this.person,
            links:this.personRelation,
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
