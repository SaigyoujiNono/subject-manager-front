import request from '@/utils/request'

// 获取所有的权限
export function getAllPerms() {
  return request({
    url: '/permission/get',
    method: 'get'
  })
}

// 根据角色返回权限
export function getPermsByRole(params) {
  return request({
    url: '/permission/getByRole',
    method: 'get',
    params
  })
}

// 添加权限
export function addPerm(data) {
  return request({
    url: '/permission/add',
    method: 'post',
    data
  })
}

// 根据角色id保存权限
export function savePermsByRole(data) {
  return request({
    url: '/permission/savePerms',
    method: 'post',
    data
  })
}
