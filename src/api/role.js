import request from '@/utils/request'

// 获取用户路由
export function getRoutes() {
  return request({
    url: '/roleMenu/getMyRouter',
    method: 'get'
  })
}

// 获取所有的角色信息
export function getAllRole() {
  return request({
    url: '/role/all',
    method: 'get'
  })
}

// 根据角色id获取路由表
export function getMenuByRole(params) {
  return request({
    url: '/roleMenu/routes',
    method: 'get',
    params
  })
}
// 根据角色id获取路由列表List
export function getMenuListByRole(params) {
  return request({
    url: '/roleMenu/routeList',
    method: 'get',
    params
  })
}

// 根据角色id设置路由表
export function saveRoutes(data) {
  return request({
    url: '/roleMenu/routes',
    method: 'post',
    data
  })
}
