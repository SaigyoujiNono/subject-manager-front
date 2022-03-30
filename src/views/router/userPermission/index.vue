<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="flex">
          <h2 class="f1">权限策略</h2>
          <div class="flex-vcenter"><el-button v-permission="['perm:add']" type="primary" @click="permissionDialog = true">添加权限</el-button></div>
        </div>
      </template>

      <el-select v-model="currentRole" :filterable="true" :clearable="true" placeholder="请选择">
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.description"
          :value="item.id"
        />
      </el-select>
      <el-button class="ml20" :loading="saveLoading" type="primary" @click="handleSavePerms">保存</el-button>
      <div v-loading="permLoading" class="mt20">
        <el-checkbox-group v-model="currentPerm">
          <el-checkbox
            v-for="item in permList"
            :key="item.id"
            :label="item.id"
            class="mb20"
            border
          >{{ item.description }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <AddPermissionDialog :visible="permissionDialog" @add-success="handleAddPerm" @close="permissionDialog = false" />
  </div>
</template>

<script>
import AddPermissionDialog from '@/views/router/userPermission/components/AddPermissionDialog'
import { getAllRole } from '@/api/role'
import { getPermsByRole, getAllPerms, savePermsByRole } from '@/api/permission'
export default {
  name: 'UserPermission',
  components: { AddPermissionDialog },
  data() {
    return {
      permissionDialog: false,
      currentRole: '',
      roleList: [],
      currentPerm: [], // 被选中的权限
      permList: [],
      permLoading: false,
      saveLoading: false
    }
  },
  watch: {
    currentRole: {
      handler(val, oldVal) {
        if (val) {
          this.loadPermByRole()
        } else {
          this.currentPerm = []
        }
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.loadRoles()
      this.loadPerms()
    },
    // 获取所有角色
    loadRoles() {
      getAllRole().then(res => {
        const { roles } = res.data
        this.roleList = roles
      })
    },
    // 获取所有权限
    loadPerms() {
      this.permLoading = true
      getAllPerms().then(res => {
        const { permissions } = res.data
        this.permList = permissions
      }).finally(() => { this.permLoading = false })
    },
    // 根据角色id获取
    loadPermByRole() {
      if (!this.currentRole) {
        return
      }
      this.permLoading = true
      getPermsByRole({ roleId: this.currentRole }).then(res => {
        const { perms } = res.data
        this.currentPerm = perms.map(el => el.id)
      }).finally(() => { this.permLoading = false })
    },
    handleAddPerm() {
      this.permissionDialog = false
      this.loadPerms()
    },
    // 保存权限按钮控制
    handleSavePerms() {
      this.saveLoading = true
      savePermsByRole({
        roleId: this.currentRole,
        permIds: this.currentPerm
      }).then(res => {
        this.$message.success('保存成功')
        this.loadPermByRole()
      }).finally(() => { this.saveLoading = false })
    }
  }
}
</script>

<style scoped>

</style>
