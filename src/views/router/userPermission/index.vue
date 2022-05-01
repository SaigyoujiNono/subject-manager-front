<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="flex">
          <h2 class="f1">权限策略</h2>
          <div class="flex-vcenter"><el-button type="primary" @click="permissionDialog = true">添加权限</el-button></div>
        </div>
      </template>
    </el-card>
    <AddPermissionDialog :visible="permissionDialog" @close="permissionDialog = false" />
  </div>
</template>

<script>
import AddPermissionDialog from '@/views/router/userPermission/components/AddPermissionDialog'
export default {
  name: 'UserPermission',
  components: { AddPermissionDialog },
  data() {
    return {
      permissionDialog: false
    }
  }
}
</script>

<style scoped>

</style>
