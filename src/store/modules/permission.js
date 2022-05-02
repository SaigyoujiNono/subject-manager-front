import { constantRoutes } from '@/router'
import { getRoutes } from '@/api/role'
import { routeNameMap } from '@/utils/routerNameMap'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const handleRoutes = (routes) => {
  return routes.map(el => {
    const { component } = el
    el.component = routeNameMap[component]
    if (el.children && el.children.length !== 0) {
      el.children = handleRoutes(el.children)
    } else {
      el.children = []
    }
    return el
  })
}

const actions = {
  // 异步路由生成方法
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      getRoutes().then(res => {
        const { data } = res
        const { routes } = data
        const filterRoutes = handleRoutes(routes)
        const asyncRoutes = [
          ...filterRoutes,
          // 404 page must be placed at the end !!!
          { path: '*', redirect: '/404', hidden: true }
        ]
        return Promise.resolve(asyncRoutes)
      }).then(res => {
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = res || []
        } else {
          accessedRoutes = filterAsyncRoutes(res, roles)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  },
  // 后端路由生成方法
  generateBackRoutes({ commit }, roles) {
    return new Promise(resolve => {
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
