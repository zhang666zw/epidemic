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

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect:'/reasoning/patients',component: Layout,
      children: [
        { path: 'reasoning', name: 'reasoning', redirect: '/reasoning/patients', component: Reasoning,
          meta: { title: "推理模块"},
          children: [
            { path: 'patients', component: Patients, meta: { title: "感染者模块"},},
            { path: 'contacts', name: 'contacts', component: Contacts,
              meta: { activeMenu: '/reasoning/patients', title: "接触者模块"}
            },
            { path: 'potentialPatients', name: 'potentialPatients', component: PotentialPatients,
              meta: { title: "潜在患者模块"},
            },
            { path: 'areaInfo', component: AreaInfo, meta: { title: "区域信息模块"}},
            { path: 'trendPrediction', component: TrendPrediction, meta: { title: "趋势预测模块"}},
          ]
        },
        { path: '/association', redirect: '/association/patients', component: Association, meta: { title: "关联模块"},
          children: [
            { path: 'patients', component: PatientChain, meta: { title: "传播链模块"},},
            { path: 'potentialPatients', name: 'potential', component: ChainContact,
              meta: { activeMenu: '/association/patients', title: "潜在患者模块"}
            },
            { path: 'chain', name: 'chain', component: ChainFind,
              meta: { activeMenu: '/association/patients', title: "传播链模块"}
            },
            { path: 'keyPerson', name: 'keyPerson', component: KeyPerson,
              meta: { title: "重点对象模块"}
            },
            { path: 'areaChain', name: 'AreaChain', component: AreaChain,
              meta: { activeMenu: '/association/patients', title: "区域传播链模块"}
            }
          ]
        }
      ]
    }
  ]
})


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

export default router
