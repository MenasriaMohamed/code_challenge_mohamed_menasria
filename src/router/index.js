import Vue from 'vue'
import VueRouter from 'vue-router'
import AddGraph from '../components/GraphsManagement/AddGraph.vue'
import GraphList from '../components/GraphsManagement/GraphList.vue'
import ViewGraph from '../components/GraphsManagement/ViewGraph.vue'
import EditGraph from '../components/GraphsManagement/EditGraph.vue'
import StatisticsGraph from '../components/GraphsManagement/StatisticsGraph.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'graphs',
    component: GraphList
  },
  {
    path: '/graphs',
    name: 'graphs',
    component: GraphList
  },
  {
    path: '/graphs/:id/edit',
    name: 'edit',
    component: EditGraph
  },
  {
    path: '/graphs/:id/statistics',
    name: 'statistics',
    component: StatisticsGraph
  },
  {
    path: '/graphs/:id',
    name: 'view',
    component: ViewGraph
  },
  {
    path: '/graph/add',
    name: 'add',
    component: AddGraph
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
