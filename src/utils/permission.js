import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}

export function hasPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const list = store.getters && store.getters.permissionList
    const permissionRoles = value

    const hasPermission = list.some(el => {
      return permissionRoles.includes(el)
    })
    return hasPermission
  } else {
    console.error(`need permission!`)
    return false
  }
}
