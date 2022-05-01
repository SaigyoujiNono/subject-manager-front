import request from '@/utils/request'

const Api = {
  login: '/account/login',
  getInfo: '/account/isLogin',
  logout: '/account/logout',
  getUserListOnProject: '/user/listOnMember',
  getExpertList: '/user/listOnExpert'
}

// 登录方法
export function login(data) {
  return request({
    url: Api.login,
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: Api.getInfo,
    method: 'get',
    params: { token }
  })
}

// 注销
export function logout() {
  return request({
    url: Api.logout,
    method: 'post'
  })
}

// 获取待申报项目时待选取项目成员列表
export function listOnProjectSelect(params) {
  return request({
    url: Api.getUserListOnProject,
    method: 'get',
    params
  })
}

// 获取专家列表
export function listOnExpertSelect(params) {
  return request({
    url: Api.getExpertList,
    method: 'get',
    params
  })
}

// 获取用户列表
export function listUser(params) {
  return request({
    url: '/user/user',
    method: 'get',
    params
  })
}
