const userRoutes = {
  path: '/user',
  component: () => import('@/layout'),
  name: 'UserManager',
  meta: {
    title: '用户管理',
    icon: 'el-icon-user-solid'
  },
  children: [
    {
      path: 'add',
      name: 'AddUser',
      component: () => import('@/views/user/AddUser'),
      meta: {
        title: '添加用户'
      }
    },
    {
      path: 'manager',
      name: 'ManageUser',
      component: () => import('@/views/user/ManageUser'),
      meta: {
        title: '用户管理'
      }
    },
    {
      path: 'check',
      name: 'CheckUserModify',
      component: () => import('@/views/user/CheckUserModify'),
      meta: {
        title: '用户信息审核'
      }
    }
  ]
}

export default userRoutes
