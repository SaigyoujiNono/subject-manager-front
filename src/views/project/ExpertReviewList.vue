<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <h2>待评审</h2>
      </template>
      <ProjectList v-loading="listLoading" :project-list="projectList" />
      <div class="mtb4">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageInfo.total"
          :page-size="pageInfo.size"
          :current-page="pageInfo.current"
          :hide-on-single-page="true"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
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
      projectList: [],
      listLoading: false
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.listLoading = true
      checkByExpert({ ...this.pageInfo }).then(res => {
        const { projectList } = res.data
        this.projectList = projectList
      }).finally(() => { this.listLoading = false })
    },
    handleCurrentChange(current) {
      this.pageInfo.current = current
      this.loadData()
    }
  }

}
</script>

<style scoped>

</style>
