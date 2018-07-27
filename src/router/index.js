import Vue from 'vue'
import Router from 'vue-router'
import Graphs from '@/Graphs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'init',
      component: Graphs,
    }
   ]
})
