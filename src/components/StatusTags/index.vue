<template>
  <div class="status-tag">
    <el-tag v-if="status === 'unchecked'">待审核</el-tag>
    <el-tag v-if="status === 'no-checked'" type="danger">审核未通过</el-tag>
    <el-tag v-if="status === 'expert'" effect="dark">专家评审</el-tag>
    <el-tag v-if="status === 'committed'" type="success">正式立项</el-tag>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.status-tag{
  display: inline-block;
}
</style>
