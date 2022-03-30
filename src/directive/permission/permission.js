import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding
  const hasPerms = store.getters && store.getters.permissionList
  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionNeed = value

      const hasPermission = hasPerms.some(perm => {
        return perm === '*:*' || permissionNeed.includes(perm)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
