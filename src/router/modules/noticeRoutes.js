import Layout from '@/layout'

const noticeRoutes = {
  path: '/notice',
  component: Layout,
  name: 'Notice',
  meta: {
    title: '公告管理',
    icon: 'el-icon-message-solid'
  },
  children: [
    {
      path: 'add',
      name: 'AddNotice',
      component: () => import('@/views/user/AddUser'),
      meta: {
        title: '发布公告'
      }
    },
    {
      path: 'manager',
      name: 'ManageNotice',
      component: () => import('@/views/user/ManageUser'),
      meta: {
        title: '公告管理'
      }
    }
  ]
}

export default noticeRoutes
