import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddNewGraph from '../components/GraphsManagement/AddNewGraph.vue'
import GraphList from '../components/GraphsManagement/GraphList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'graphs',
    component: GraphList
  },
  {
    path: '/graphs/add',
    name: 'add',
    component: AddNewGraph
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
