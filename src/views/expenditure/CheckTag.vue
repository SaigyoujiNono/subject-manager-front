<template>
  <div class="status-tag">
    <el-tag v-if="status === 'checked'" type="success">审核通过</el-tag>
    <el-tag v-if="status === 'no-checked'" type="danger">审核未通过</el-tag>
    <el-tag v-if="status === 'committed'">已提交</el-tag>
  </div>
</template>

<script>
export default {
  name: 'CheckTag',
  props: {
    status: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.status-tag{
  display: inline-block;
}
</style>
