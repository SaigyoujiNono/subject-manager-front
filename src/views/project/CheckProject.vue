<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <h2>项目材料审核</h2>
        <el-divider />
        <check-project-query />
      </template>
    </el-card>
  </div>
</template>

<script>
import CheckProjectQuery from '@/views/project/componet/CheckProjectQuery'
export default {
  name: 'CheckProject',
  components: { CheckProjectQuery }
}
</script>

<style scoped>

</style>
