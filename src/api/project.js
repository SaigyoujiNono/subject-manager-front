import request from '@/utils/request'

const Api = {
  AppProject: '/project/project'
}

export function applicationProject(data) {
  return request({
    url: Api.AppProject, // 假地址 自行替换
    method: 'post',
    data
  })
}
