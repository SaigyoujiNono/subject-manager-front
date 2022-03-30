<template>
  <div class="app-container">
    <el-card>
      <template #header>
        {{ projectDetail.name }} - 经费申请
      </template>
    </el-card>
  </div>
</template>

<script>
import { getProjectDetail } from '@/api/project'

/**
 * 经费申请编辑
 */
export default {
  name: 'EditExpenditure',
  data() {
    return {
      projectId: this.$route.projectId, // 项目id
      id: this.$route.id, // 经费单id
      expendForm: {},
      projectDetail: {}
    }
  },
  mounted() {
    this.loadProjectById()
  },
  methods: {
    loadProjectById() {
      getProjectDetail(this.projectId).then(res => {
        this.projectDetail = res.data.projectDetail
      })
    }
  }
}
</script>

<style scoped>

</style>
