<template>
  <el-dialog :visible="visible">1</el-dialog>
</template>

<script>
export default {
  name: 'ExpenditureDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    expenditure: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>

</style>
