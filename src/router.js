import VueRouter from 'vue-router'

import home from './components/tabbar/home.vue'
import member from './components/tabbar/member.vue'
import shopcar from './components/tabbar/shopcar.vue'
import search from './components/tabbar/search.vue'
import newlist from './components/home/newlist.vue'
import newinfo from './components/home/newinfo.vue'
import photolist from './components/photos/photolist.vue'
import photoinfo from './components/photos/photoinfo.vue'
import shoplist from './components/shop/shoplist.vue'
var router=new VueRouter({
    routes:[
    {path:'/',redirect:'/home'},
    {path:'/home',component:home},
    {path:'/member',component:member},
    {path:'/shopcar',component:shopcar},
    {path:'/search',component:search},
    {path:'/home/newlist',component:newlist},
    {path:'/home/newinfo/:id',component:newinfo},
    {path:'/home/photolist',component:photolist},
    {path:'/home/photoinfo/:id',component:photoinfo},
    {path:'/home/shoplist',component:shoplist}
    ],
    linkActiveClass:'mui-active'
})
export default router