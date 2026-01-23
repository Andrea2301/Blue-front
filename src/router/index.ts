import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import Home from '@/views/Home.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import UserDashboard from '@/views/UserDashboard.vue'

const routes = [
  {
    path: '/',
    component: Home,
    meta: { public: true }
  },
  {
    path: '/login',
    component: Login,
    meta: { public: true }
  },
  {
    path: '/register',
    component: Register,
    meta: { public: true }
  },

  // Dashboard base (decide a dónde ir)
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },

  // Admin
  {
    path: '/admin',
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
      roles: ['Admin']
    }
  },

  // User
  {
    path: '/user',
    component: UserDashboard,
    meta: {
      requiresAuth: true,
      roles: ['User']
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ------------------
// Guard global
// ------------------
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  if (to.meta.roles) {
    const roles = to.meta.roles as string[]

    if (!role || !roles.includes(role)) {
      return next(role === 'Admin' ? '/admin' : '/user')
    }
  }

  next()
})
export default router