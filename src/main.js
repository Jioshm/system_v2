import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局css和element-rest
import './assets/css/global.css'
import './assets/css/el-reset.css'
//引入iconfont
import './assets/iconfont/iconfont.css'
//引入subMenu组件
import qfSubMenu from "qf-sub-menu"
//nprogress进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(ElementUI)
Vue.use(qfSubMenu)
// console.log(subMenu);
// Vue.config.productionTip = false

//路由前置钩子(导航守卫)
router.beforeEach((to, from, next) => {
  NProgress.set(0.99)
  //用户登入之后,localstorage中有token
  let token = localStorage.getItem('wf-token') || null;
  // console.log(token);
  if (token) {
    //如果是注册页面或者是登入页面,直接放行;
    if (store.state.menuList.length == 0) {
      //说明没有用户路由,触发action获取用户路由
      store.dispatch('FETCH_MENULIST')
        .then(() => {
          next({ path: to.path })//这里要注意, next里面要传参数即要进入的页面的路由信息，因为next传参数后，当前要进入的路由会被废止，转而进入参数对应的路由，虽然是同一个路由，这么做主要是为了确保addRoutes生效了。
        })
    } else {
      next()
    }

  } else { //没token
    if (to.path === "/login") {
      next()
    } else { //访问的不是登入页,就要跳转到登入页
      next({ path: "/login" })
    }
  }
})


//使用路由后置钩子处理面包屑
router.afterEach((to, from) => {
  // console.log(to);
  let crumblist = to.matched.slice(1)
  console.log(crumblist);
  store.commit("SET_CRUMBS", crumblist)
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
