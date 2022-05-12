<template>
  <el-dialog
    :visible.sync="visible"
    @close="beforeClose"
  />
</template>

<script>
export default {
  name: 'ExpenditureDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    beforeClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
