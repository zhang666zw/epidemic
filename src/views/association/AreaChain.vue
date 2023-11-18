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
        patientID:[],
        potentialID:[],
        person:[],
        personRelation:[],
        Patients:[],
        patientsName:[],
        potentialPatients:[],
        links: [],
      }
    },
    created() {
      // this.potentialPatients = [];
      this.patients = [];
      this.links = [];
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
                category: "感染者"
              }
              this.person.push(patient1)
            }
            if(!(this.patientID.includes((ele.patientId2)))){
              this.patientID.push(ele.patientId2);
              const patient2 = {
                name: ele.patientName2,
                id: ele.patientId2.toString(),
                category: "感染者"
              }
              this.person.push(patient2)
            }
          })

          let a = '10001';
          for (let i = 0; i < this.patientID.length; i++) {
            const potentialResponse = await this.$http.get('getPotentialPatients', { params: { patient_id: this.patientID[i], batch: this.batch } });
            potentialResponse.data.forEach((ele) => {
              if(!(this.potentialID.includes((ele.contactId)))){
                this.potentialID.push(ele.contactId);
                const potentialPatient = {
                  name: ele.contactName,
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
      },
      // findDuplicateObjects(array) {
      //   const objectMap = new Map();
      //   const duplicateObjects = [];
      //
      //   for (const item of array) {
      //     const itemJSON = JSON.stringify(item);
      //
      //     if (objectMap.has(itemJSON)) {
      //       duplicateObjects.push(item);
      //     } else {
      //       objectMap.set(itemJSON, true);
      //     }
      //   }
      //
      //   return duplicateObjects;
      // },
      // checkDuplicateNames(array) {
      //   const nameSet = new Set();
      //   const duplicates = [];
      //
      //   for (const item of array) {
      //     if (nameSet.has(item.id)) {
      //       duplicates.push(item.id);
      //     } else {
      //       nameSet.add(item.id);
      //     }
      //   }
      //
      //   if (duplicates.length > 0) {
      //     return duplicates;
      //   } else {
      //     return "没有重复的姓名";
      //   }
      // }
    },
  }
</script>

<style scoped>
  .echarts_container {
    width: 100%;
    height: 600px;
  }
</style>
