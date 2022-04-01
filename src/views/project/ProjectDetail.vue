<template>
  <div class="app-container">
    <el-card v-if="projectDetail.id">
      <template #header>
        <h2>{{ projectDetail.name }}</h2>
      </template>
      <el-row class="mtb8" :gutter="16">
        <el-col :span="12">
          项目负责人： {{ projectDetail.userDetail.name }}
        </el-col>
        <el-col :span="12">
          项目方向： {{ projectDetail.direction }}
        </el-col>
      </el-row>
      <el-row class="mtb8" :gutter="16">
        <el-col :span="12">
          项目预期经费： {{ projectDetail.expenditure }}
        </el-col>
        <el-col :span="12">
          所属学科： {{ baseInfo.subjects.find(el => el.id === projectDetail.subjectId ).name }}
        </el-col>
      </el-row>
      <el-row class="mtb8" :gutter="16">
        <el-col :span="12">
          创建日期： {{ projectDetail.createTime }}
        </el-col>
        <el-col :span="12">
          项目状态： <status-tags :status="projectDetail.status" />
        </el-col>
      </el-row>
      <div class="mtb8">
        <div>项目描述：</div>
        <div class="mtb4 description">
          {{ projectDetail.explanation }}
        </div>
      </div>
      <div class="mtb8">
        附加材料下载：<a v-if="projectDetail.material && projectDetail.material !== ''" class="description" target="_blank" :href="'/file/download/file/'+projectDetail.material">下载地址</a>
      </div>
      <el-row class="mtb8" :gutter="16">
        <el-col :span="12">项目参与人员：
          <span v-for="item in projectDetail.memberList" :key="item.id">{{ item.name }} </span>
        </el-col>
        <el-col :span="12">
          最终验收日期：{{ projectDetail.finalReviewTime }}
        </el-col>
      </el-row>
      <el-row class="mtb8" :gutter="16">
        <el-col :span="12">
          审核日期： {{ projectDetail.reviewTime }}
        </el-col>
        <el-col :span="12">
          审核人： <span v-if="projectDetail.reviewUser">{{ projectDetail.reviewUser.name }}</span>
        </el-col>
      </el-row>
      <div>专家意见：</div>
      <el-row v-if="projectDetail.expertList" class="mtb8" :gutter="16" />
      <el-row class="mtb8">
        操作：
        <el-button type="primary">指定专家</el-button>
        <el-button type="primary">拒绝审核</el-button>
        <el-button type="primary">立项</el-button>
        <el-button type="primary">拒绝立项</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getProjectDetail } from '@/api/project'
import { mapGetters } from 'vuex'
import StatusTags from '@/components/StatusTags'
import permission from '@/directive/permission'

export default {
  name: 'ProjectDetail',
  components: { StatusTags },
  directives: { permission },
  data() {
    return {
      projectDetail: {},
      permissible: ['review']
    }
  },
  computed: {
    ...mapGetters(['baseInfo'])
  },
  mounted() {
  },
  beforeRouteEnter(to, from, next) {
    const { id } = to.params
    next(vm => {
      getProjectDetail(id).then(res => {
        const { projectDetail } = res.data
        vm.projectDetail = projectDetail
      }).catch(() => {
        vm.$router.push('/404')
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  color: #909399;
  font-size: 18px;
  .description{
    font-size: 16px;
    color: #909399;
  }
}
</style>
