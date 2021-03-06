import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Login from '../components/Authentication/Login'
import Register from '../components/Authentication/Register'
import Dashboard from '../views/Dashboard'
import Users from '../views/Users'
import Admin from '../views/Admin'
import PageNotFound from '../components/PageNotFound'
import singlePost from '../views/singlePost'

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
      requiresAuth: true,
    }
  },
  {
    path: '/dashboard/:id',
    name: 'Single Post',
    component: singlePost,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
      requiresAuth: true,
      userAccess: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      adminAccess: true
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
      if (to.matched.some(record => record.meta.adminAccess)) {
        if (store.getters.loggedInUser.role == 'admin') {
          next();
        } else {
          next({
            path: '/users'
          })
        }
      } else if (to.matched.some(record => record.meta.userAccess)) {
        if (store.getters.loggedInUser.role == 'user') {
          next();
        } else {
          next({
            path: '/admin'
          })
        }
      }
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
