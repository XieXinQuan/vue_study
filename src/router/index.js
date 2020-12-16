import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import login from '@/view/login'
import shop from '@/view/shop'
import shopEmployee from '@/view/shopEmployee'
import dish from '@/view/dish'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [{
        path: '/shop',
        name: 'shop',
        component: shop
      },{
        path: '/shopEmployee',
        name: 'shopEmployee',
        component: shopEmployee
      },{
        path: '/dish',
        name: 'dish',
        component: dish
      }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
