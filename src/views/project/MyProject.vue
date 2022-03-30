<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <h2>我的项目</h2>
      </template>
      <project-list :project-list="projectList" />
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
import { getMyProjectList } from '@/api/project'
import ProjectList from '@/views/project/componet/ProjectList'

export default {
  name: 'MyProject',
  components: { ProjectList },
  data() {
    return {
      projectList: [],
      pageInfo: {
        current: 1,
        size: 20,
        total: 0
      }
    }
  },
  created() {
    this.fetchMyProject(this.pageInfo)
  },
  methods: {
    // 请求数据
    fetchMyProject(params) {
      getMyProjectList(params).then(res => {
        const { myProjectList, pageInfo } = res.data
        this.pageInfo = { ...pageInfo }
        this.projectList = myProjectList
      })
    },
    // 页面改变的回调
    handleCurrentChange(val) {}
  }
}
</script>

<style lang="scss" scoped>

</style>
