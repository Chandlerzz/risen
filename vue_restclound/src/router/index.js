import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
    {
        path: '/',
        name: 'Index',
        meta: {
            title: "设备之家"
        },
        component: () => import('@/views/index/index'),
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: "设备之家"
        },
        component: () => import('@/views/login/index'),
    },
    {
        path: '/home',
        name:'Home',
        component: () => import('@/views/home'),
        meta: {
            title: "设备之家"
        },
        children:[
            {
                path: '/user',
                component: () => import('@/views/user/index'),
                meta:{
                    no:1,
                }
            },
            {
                path: '/statistics',
                component: () => import('@/views/statistics/index'),
                meta:{
                    no:2,
                }
            },
            {
                path: '/report',
                component: () => import('@/views/report/index'),
                meta:{
                    no:3,
                }
            },
            {
                path: '/dashboard',
                component: () => import('@/views/dashboard/index'),
            },
        ]
    },
]

const createRouter = () =>
    new Router({
        mode: 'hash',
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
    })

export default createRouter()
