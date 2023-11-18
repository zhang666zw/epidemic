import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Index.vue'
import PotentialPatients from '../views/reasoning/PotentialPatients.vue'
import Reasoning from '../views/reasoning/Index.vue'
import Patients from "../views/reasoning/Patients.vue";
import Contacts from "../views/reasoning/Contacts.vue";
import Association from '../views/association/Index.vue'
import PatientChain from '../views/association/Patients.vue'
import KeyPerson from "../views/association/KeyPerson.vue";
import AreaInfo from "../views/reasoning/AreaInfo.vue";
import ChainFind from '../views/association/Chain.vue'
import ChainContact from '../views/association/PotentialPatients.vue'
import AreaChain from "../views/association/AreaChain.vue";
import TrendPrediction from "../views/reasoning/TrendPrediction.vue";

import 'normalize.css'
import '../assets/css/base.css'
import '../assets/css/gloabl.css'

Vue.use(Router)

const RouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return RouterPush.call(this, to).catch(err => err)
}
const RouterReplace = Router.prototype.replace
Router.prototype.replace = function replace(to) {
  return RouterReplace.call(this, to).catch(err => err)
}
// const Login = () => import('../views/layout/Login.vue')
// const Reasoning = () => import('../views/reasoning/Index.vue')
// const Patients = () => import('../views/reasoning/Patients.vue')
// const Contacts = () => import('../views/reasoning/Contacts.vue')
// const Association = () => import('../views/association/Index.vue')
// const PatientChain = () => import('../views/association/Patients.vue')
// const KeyPerson = () => import('../views/association/KeyPerson.vue')
// const AreaInfo = () => import('../views/reasoning/AreaInfo.vue')
// const ChainFind = () => import('../views/association/Chain.vue')
// const ChainContact = () => import('../views/association/PotentialPatients.vue')
// const AreaChain = () => import('../views/association/AreaChain.vue')
// const TrendPrediction = () => import('../views/reasoning/TrendPrediction.vue')


const router = new Router({
  mode: 'history',
  routes: [
    // { path: '/login', name:'login', component: Login },
    // path: '/reasoning/patients', component: Layout,
    {
      path: '/', redirect:'/reasoning/patients',component: Layout,
      children: [
        // {path:'index',component:Login},
        {
          path: 'reasoning',
          name: 'reasoning',
          redirect: '/reasoning/patients',
          component: Reasoning,
          meta: {title: "推理模块"},
          children: [
            {path: 'patients', component: Patients, meta: {title: "感染者模块"},},
            {
              path: 'contacts',
              name: 'contacts',
              component: Contacts,
              meta: {activeMenu: '/reasoning/patients', title: "接触者模块"}
            },
            {
              path: 'potentialPatients',
              name: 'potentialPatients',
              component: PotentialPatients,
              meta: {title: "潜在患者模块"},
            },
            {path: 'areaInfo', component: AreaInfo, meta: {title: "区域信息模块"},},
            {path: 'trendPrediction', component: TrendPrediction, meta: {title: "趋势预测模块"},},
          ]
        },
        {
          path: '/association', redirect: '/association/patients', component: Association, meta: {title: "关联模块"},
          children: [
            {path: 'patients', component: PatientChain, meta: {title: "传播链模块"},},
            {
              path: 'potentialPatients',
              name: 'potential',
              component: ChainContact,
              meta: {activeMenu: '/association/patients', title: "潜在患者模块"}
            },
            {
              path: 'chain',
              name: 'chain',
              component: ChainFind,
              meta: {activeMenu: '/association/patients', title: "传播链模块"}
            },
            {path: 'keyPerson', name: 'keyPerson', component: KeyPerson, meta: {title: "重点对象模块"},},
            {
              path: 'areaChain',
              name: 'AreaChain',
              component: AreaChain,
              meta: {activeMenu: '/association/patients', title: "区域传播链模块"}
            }
          ]
        },
      ]
    },
  ]
})


// router.onError((error) => {
//   const jsPattern = /Loading chunk (\S)+ failed/g
//   const cssPattern = /Loading CSS chunk (\S)+ failed/g
//   const isChunkLoadFailed = error.message.match(jsPattern || cssPattern)
//   const targetPath = router.history.pending.fullPath
//   if (isChunkLoadFailed) {
//     localStorage.setItem('targetPath', targetPath)
//     window.location.reload()
//   }
// })

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  console.log(isChunkLoadFailed,'/Loading chunk (\d)+ failed/g','路由懒加载找不到对应的moudle')
  if (isChunkLoadFailed) {
    window.location.reload();
  }else{
    console.log(error)
  }
});


// router.beforeEach((to,from,next)=>{
//   if(to.path === '/login') return next();
//   const token = window.sessionStorage.getItem('token')
//   if(!token) return next('/login')
//   next()
//  })


export default router
