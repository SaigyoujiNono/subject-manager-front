import request from '@/utils/request'

const Api = {
  baseInfo: '/utils/baseInfo'
}

export const fileAction = process.env.VUE_APP_BASE_API + '/file/upload/file'

export function getBaseInfo() {
  return request({
    url: Api.baseInfo,
    method: 'get'
  })
}
