import request from '@/utils/request'

// 提交经费申请表单
export function subExpenditureApplication(data) {
  return request({
    url: '/projectExpenditure/application',
    method: 'post',
    data
  })
}
