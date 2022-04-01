<template>
  <el-dialog :visible="visibleDialog">
    <el-table />
  </el-dialog>
</template>

<script>
export default {
  name: 'ExpertSelectList',
  props: {
    visibleDialog: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
