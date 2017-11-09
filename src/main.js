import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import moment from 'moment'
Vue.filter('dataformat', function (datastr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(datastr).format(pattern)
})

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root = 'http://vue.studyit.io';
import router from './router.js'

Vue.http.options.emulateJSON = true

// import {Header,Swipe,SwipeItem,Button,Lazyload} from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name,Swipe)
// Vue.component(SwipeItem.name,SwipeItem)
// Vue.component(Button.name,Button)
// Vue.use(Lazyload);

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import app from './App.vue'


var vm = new Vue({
    el: '#app',
    render: c=>c(app),
    router
})