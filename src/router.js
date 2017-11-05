import VueRouter from 'vue-router'

import home from './components/tabbar/home.vue'
import member from './components/tabbar/member.vue'
import shopcar from './components/tabbar/shopcar.vue'
import search from './components/tabbar/search.vue'
import newlist from './components/home/newlist.vue'
import newinfo from './components/home/newinfo.vue'
var router=new VueRouter({
    routes:[
    {path:'/',redirect:'/home'},
    {path:'/home',component:home},
    {path:'/member',component:member},
    {path:'/shopcar',component:shopcar},
    {path:'/search',component:search},
    {path:'/home/newlist',component:newlist},
    {path:'/home/newinfo/:id',component:newinfo}
    ],
    linkActiveClass:'mui-active'
})
export default router