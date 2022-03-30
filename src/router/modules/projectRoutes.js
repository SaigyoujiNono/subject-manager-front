import Layout from '@/layout'

const projectRoutes = {
  path: '/project',
  component: Layout,
  name: 'Project',
  meta: {
    title: '项目管理',
    icon: 'table'
  },
  children: [
    {
      path: 'application',
      name: 'ApplicationProject',
      component: () => import('@/views/project/ApplicationProject'),
      meta: {
        title: '项目申报'
      }
    },
    {
      path: 'check',
      name: 'CheckProject',
      component: () => import('@/views/project/CheckProject'),
      meta: {
        title: '项目审核'
      }
    },
    {
      path: 'manage',
      name: 'ManageProject',
      component: () => import('@/views/project/ManageProject'),
      meta: {
        title: '项目管理'
      }
    }
  ]
}

export default projectRoutes
