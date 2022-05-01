<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <h2>待评审</h2>
      </template>
    </el-card>
    <ProjectList :project-list="projectList" />
  </div>
</template>

<script>
import { checkByExpert } from '@/api/project'
import ProjectList from '@/views/project/componet/ProjectList'

export default {
  name: 'ExpertReviewList',
  components: { ProjectList },
  data() {
    return {
      pageInfo: {
        total: 0,
        current: 1,
        size: 10
      },
      projectList: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      checkByExpert({ ...this.pageInfo }).then(res => {
        const { projects } = res.data
        this.projectList = projects
      })
    }
  }

}
</script>

<style scoped>

</style>
