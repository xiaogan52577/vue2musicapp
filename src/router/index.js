import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/pages/recommend'
import Login from '@/components/pages/login'
import Register from "@/components/pages/register"
import  SongsDetail from '@/components/pages/SongsDetail'
import Search from '@/components/pages/Search'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend'
    },
    {
      path:'/recommend',
      name:'Recommend',
      component:Recommend,
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      name:'SongsDetail',
      path:'/songsDetail',
      component:SongsDetail,
    },
    {
      path:'/search',
      component:Search,
    }
  ]
})
router.beforeEach((to,from,next) => {
  console.log(to)
  console.log(from)
  console.log('next',next);
  next()
})
export default router
