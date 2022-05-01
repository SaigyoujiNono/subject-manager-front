<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <h2>路由管理</h2>
      </template>
      <el-select v-model="currentRole" :filterable="true" :clearable="true" placeholder="请选择">
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.description"
          :value="item.id"
        />
      </el-select>
      <div v-if="currentRole" v-loading="treeLoading" class="mt20">
        <el-tree
          ref="tree"
          :data="allRouteTree"
          show-checkbox
          default-expand-all
          node-key="id"
          highlight-current
          :props="defaultProps"
        />
      </div>
      <div class="mt20">
        <el-button :disabled="!currentRole" :loading="saveBtnLoading" type="primary" @click="saveMenuList">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getAllRole, getRoutes, getMenuListByRole, saveRoutes } from '@/api/role'
export default {
  name: 'RouterManager',
  data() {
    return {
      currentRole: '',
      roleList: [],
      allRouteTree: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      saveBtnLoading: false,
      treeLoading: false
    }
  },
  watch: {
    currentRole: {
      handler(val, oldVal) {
        if (val) {
          this.setTreeNodeKeys(val)
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
      this.loadRoutes()
    },
    // 获取所有角色
    loadRoles() {
      getAllRole().then(res => {
        const { roles } = res.data
        this.roleList = roles
      })
    },
    // 获取所有路由
    loadRoutes() {
      getRoutes().then(res => {
        const { routes } = res.data
        this.allRouteTree = routes
      })
    },
    // 获取key
    saveMenuList() {
      const menuList = this.$refs.tree.getCheckedNodes(false, true)
      const list = menuList.map(el => el.id)
      this.saveBtnLoading = true
      saveRoutes({ id: this.currentRole, menuIds: list }).then(res => {
        this.$message.success('保存成功')
      }).finally(() => { this.saveBtnLoading = false })
    },
    setTreeNodeKeys(id) {
      this.treeLoading = true
      getMenuListByRole({ id }).then(res => {
        const { routes } = res.data
        this.$refs.tree.setCheckedKeys(routes.filter(el => el.permission === 'children').map(el => el.id))
      }).finally(() => { this.treeLoading = false })
    }
  }
}
</script>

<style scoped>

</style>
