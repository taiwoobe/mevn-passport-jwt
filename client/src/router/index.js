import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Login from '../components/Authentication/Login'
import Register from '../components/Authentication/Register'
import Dashboard from '../views/Dashboard'
import PageNotFound from '../components/PageNotFound'

Vue.use(VueRouter)

const routes = [
  { 
    path: "*", 
    component: PageNotFound 
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.getters.isLoggedIn) {
      next({
        path: '/login'
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (store.getters.isLoggedIn) {
      next({
        path: '/'
      });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
