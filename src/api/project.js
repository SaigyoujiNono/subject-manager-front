import request from '@/utils/request'

const Api = {
  AppProject: '/project/project',
  MyProject: '/project/myProject',
  ProjectDetail: '/project/project',
  UncheckedProject: '/project/uncheckProject'
}

// 申请项目
export function applicationProject(data) {
  return request({
    url: Api.AppProject, // 假地址 自行替换
    method: 'post',
    data
  })
}

// 获取用户自己申报的项目列表
export function getMyProjectList(params) {
  return request({
    url: Api.MyProject,
    method: 'get',
    params
  })
}

// 根据id获取项目的详细信息
export function getProjectDetail(id) {
  return request({
    url: Api.ProjectDetail + '/' + id,
    method: 'get'
  })
}

// 获取等待材料审核的项目列表
export function getUncheckedProjectList(params) {
  return request({
    url: Api.UncheckedProject,
    method: 'get',
    params
  })
}
