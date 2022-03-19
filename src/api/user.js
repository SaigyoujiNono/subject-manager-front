import request from '@/utils/request'

const Api = {
  login: '/account/login',
  getInfo: '/account/isLogin',
  logout: '/account/logout'
}

export function login(data) {
  return request({
    url: Api.login,
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: Api.getInfo,
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: Api.logout,
    method: 'post'
  })
}
