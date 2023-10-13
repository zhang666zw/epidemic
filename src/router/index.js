import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Index.vue'
import PotentialPatients from '../views/reasoning/PotentialPatients.vue'
import 'normalize.css'
import '../assets/css/base.css'
Vue.use(Router)

const RouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return RouterPush.call(this, to).catch(err => err)
}
const RouterReplace = Router.prototype.replace
Router.prototype.replace = function replace (to) {
  return RouterReplace.call(this, to).catch(err => err)
}

const Reasoning = ()=>import('../views/reasoning/Index.vue')
const Patients = ()=>import('../views/reasoning/Patients.vue')
const Contacts = ()=>import('../views/reasoning/Contacts.vue')
const Association = ()=>import('../views/association/Index.vue')
const PatientChain = ()=>import('../views/association/Patients.vue')
const KeyPerson = ()=>import('../views/association/KeyPerson.vue')
const AreaInfo = ()=>import('../views/reasoning/AreaInfo.vue')
const ChainFind = ()=>import('../views/association/Chain.vue')
const ChainContact = ()=>import('../views/association/PotentialPatients.vue')
const AreaChain = ()=>import('../views/association/AreaChain.vue')
const TrendPrediction = ()=>import('../views/reasoning/TrendPrediction.vue')
const MessageInput = ()=>import('../views/messageInput/MessageInput.vue')


export default new Router({
  mode:'history',
  routes: [
    {
      path: '/', redirect: '/messageInput', component: Layout,
      children:[
        { path:'reasoning', redirect: '/reasoning/patients', component: Reasoning, meta:{ title:"推理模块"},
          children:[
            { path:'patients', component: Patients,meta:{ title:"感染者模块"},},
            { path:'contacts', name:'contacts', component: Contacts,meta:{ activeMenu: '/reasoning/patients',title: "接触者模块"}},
            { path:'potentialPatients',name:'potentialPatients', component: PotentialPatients,meta:{ title:"潜在患者模块"},},
            { path:'areaInfo',component: AreaInfo, meta:{ title:"区域信息模块"},},
            { path:'trendPrediction',component: TrendPrediction, meta:{ title:"趋势预测模块"},},
          ]},
        { path:'/association', redirect:'/association/patients', component: Association, meta:{ title:"关联模块"},
          children:[
            { path:'patients', component: PatientChain, meta:{ title:"传播链模块"}, },
            { path:'potentialPatients',name: 'potential', component: ChainContact, meta: {activeMenu:'/association/patients',title: "潜在患者模块"}},
            { path:'chain', name:'chain', component: ChainFind, meta: { activeMenu: '/association/patients',title:"传播链模块"}},
            { path:'keyPerson', name:'keyPerson', component:KeyPerson, meta:{ title:"重点对象模块"},},
            { path:'areaChain',  name:'AreaChain',component:AreaChain, meta:{ activeMenu:'/association/patients',title:"区域传播链模块"}}
          ]},
        { path:'/messageInput', component: MessageInput, meta:{ title:"信息输入模块"},}
      ]
    },
  ]
})
