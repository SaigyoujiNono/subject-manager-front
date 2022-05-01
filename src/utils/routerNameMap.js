// 路由映射
export const routeNameMap = {
  Layout: () => import('@/layout'),
  AddUser: () => import('@/views/user/AddUser'),
  ManageUser: () => import('@/views/user/ManageUser'),
  CheckUserModify: () => import('@/views/user/CheckUserModify'),
  ApplicationProject: () => import('@/views/project/ApplicationProject'),
  CheckProject: () => import('@/views/project/CheckProject'),
  ManageProject: () => import('@/views/project/ManageProject'),
  MyProject: () => import('@/views/project/MyProject'),
  ProjectDetail: () => import('@/views/project/ProjectDetail'),
  ExpertReviewList: () => import('@/views/project/ExpertReviewList'),
  AddNotice: () => import('@/views/notice/addNotice'),
  ManageNotice: () => import('@/views/notice'),
  PermissionManager: () => import('@/views/router/permissionManager'),
  RouterManager: () => import('@/views/router/routerManager'),
  UserPermission: () => import('@/views/router/userPermission')
}
