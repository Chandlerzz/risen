import { appRoutes } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(permissions, route) {
    if (route.meta && route.meta.permissions) {
        return permissions.some(permission => route.meta.permissions.includes(permission))
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes appRoutes
 * @param permissions
 */
function filterAppRoutes(routes, permissions) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(permissions, tmp)) {
            if (tmp.children) {
                tmp.children = filterAppRoutes(tmp.children, permissions)
            }
            res.push(tmp)
        }
    })

    return res
}

const myRouter = {
    state: {
        routes: undefined
    },

    mutations: {
        SET_ROUTERS: (state, filteredRoutes) => {
            state.routes = filteredRoutes
        }
    },

    actions: {
        PrepareRoutes({ commit }, data) {

            return new Promise(resolve => {

                const { permissions } = data

                let filteredRoutes
                if (permissions.includes('admin')) {
                    filteredRoutes = appRoutes
                } else {
                    filteredRoutes = filterAppRoutes(appRoutes, permissions)
                }
                commit('SET_ROUTERS', filteredRoutes)
                resolve()
            })
        }
    }
}


export default myRouter