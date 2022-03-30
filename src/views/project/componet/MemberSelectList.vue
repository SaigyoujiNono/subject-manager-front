<template>
  <el-dialog
    title="选择项目成员"
    :visible.sync="dialogVisible"
    width="800"
    :before-close="handleClose"
  >
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="() => $emit('dialogClose')">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'MemberSelectList',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose() {
      return false
    }
  }
}
</script>

<style scoped>

</style>
