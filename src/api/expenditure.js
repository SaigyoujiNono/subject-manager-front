import request from '@/utils/request'

import store from '@/store'

// 提交经费申请表单
export function subExpenditureApplication(data) {
  return request({
    url: '/projectExpenditure/application',
    method: 'post',
    data
  })
}
// 获取经费申请单
export function appProjectExpenditure(appOrder, current, size, isMy = true) {
  const userId = store.getters.userInfo.id
  return request({
    url: '/projectExpenditure/expenditureList',
    method: 'get',
    params: {
      ...appOrder,
      current,
      size,
      userId: isMy ? userId : ''
    }
  })
}

// 经费单审核接口
export function checkExpenditure(checkForm) {
  return request({
    url: 'checkExpenditure',
    method: 'post',
    data: {
      checkForm
    }
  })
}
