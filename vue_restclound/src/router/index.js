import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/layouts/mainLayout'

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
        component: MainLayout,
        meta: {
          title: "系统管理",
          permissions: ["getDict"],
          no:1
        },
        hidden: true,
        children: [
            {
                path: '/user',
                name:'UserManagement',
                component: () => import('@/views/user/index'),
                meta:{
                    no:1,
                },
                children:[
                    {
                        path: '/user',
                        component: () => import('@/views/user/index'),
                        meta:{
                            no:1,
                            title:"UserManagement",
                        }
                    },
                ]
            },
            {
                path: '/statistics',
                name:'Statistics',
                component: () => import('@/views/statistics/index'),
                meta:{
                    no:2,
                },
                children:[
                    {
                        path: '/statistics',
                        component: () => import('@/views/statistics/index'),
                        meta:{
                            no:1,
                            title:"Statistics",
                        }
                    },
                ]
            },
            {
                path: '/report',
                name:'RepairList',
                component: () => import('@/views/report/index'),
                meta:{
                    no:3,
                },
                children:[
                    {
                        path: '/report',
                        component: () => import('@/views/report/index'),
                        meta:{
                            no:1,
                            title:"RepairList",
                        }
                    },
                ]
            },
            {
                path: '/dashboard',
                component: () => import('@/views/dashboard/index'),
            },
            {
                path: '/reportpdf',
                component: () => import('@/views/report/downloadpdf'),
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
