import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddGraph from '../components/GraphsManagement/AddGraph.vue'
import GraphList from '../components/GraphsManagement/GraphList.vue'
import ViewGraph from '../components/GraphsManagement/ViewGraph.vue'

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
    component: ViewGraph
  },
  {
    path: '/graphs/:id',
    name: 'view',
    component: ViewGraph
  },
  
  {
    path: '/graphs/add',
    name: 'add',
    component: AddGraph
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
