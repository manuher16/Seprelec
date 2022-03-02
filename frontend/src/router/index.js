import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import auth from "./middlewares/auth"
import Role from "../views/Roles.vue"
import User from "../views/Users.vue"
import Routes from "../views/Routes.vue"
import NotFound from "../views/NotFound.vue"
import Project from "../views/Project.vue"
Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/services',
    name: 'Services',

    component: () => import('../views/Services.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      requiresAuth: true
    }, children: [
      {
        path: 'project',
        name: 'Project',
        component: Project,
        meta: {
          transition: 'slide-right'
        }
      },
      {
        path: 'config',
        name: 'Config',
        component: () => import('../views/Config.vue'),
        meta: {
          transition: 'slide-right'
        }
      },
      {
        path: 'config/unit',
        name: 'Unit',
        component: () => import('../components/table/tableUnits.vue'),
        meta: {
          transition: 'slide-right'
        }
      },
      {
        path: 'services',
        name: 'Services',
        component: () => import('../views/Service.vue'),
        meta: {
          transition: 'slide-right'
        }
      },
      {
        path: 'create/role',
        name: 'CreateRole',
        component: () => import('../components/form/createRole.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'table-employees',
        name: 'Employees',
        component: () => import('../components/table/tableEmployee.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'supplier',
        name: 'Suppliers',
        component: () => import('../views/Supplier.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'table-companies',
        name: 'Companies',
        component: () => import('../components/table/tableCompanies.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'projects',
        name: 'Projects',
        component: () => import('../views/Projects.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'security',
        name: 'Security',
        component: () => import('../views/Security.vue'),
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: 'table-users',
            component: User,
            meta: {
              requiresAuth: true
            }
          },
          {
            path: 'routes',
            component: Routes,
            meta: {
              requiresAuth: true
            }
          },
          {
            path: 'roles',
            component: Role,
            meta: {
              requiresAuth: true
            }
          },
        ]
      }
    ],
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/login-admin',
    name: 'LoginAdmin',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashBoard.vue'),
    meta: {
      requiresAuth: true
    },
    children: [

      {
        path: 'table-users',
        name: 'TableUsers',
        component: () => import('../components/table/tableUser.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'table-role',

        component: Role,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]



const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const userAuth = await auth.loggedIn(to, from);
    if (!userAuth) next({ path: '/login-admin', query: { redirect: to.fullPath } });
    next()

  } else {
    next() // make sure to always call next()!
  }
})
export default router
