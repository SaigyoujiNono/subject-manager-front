<template>
  <div class="app-container">
    <el-card v-if="projectDetail.id">
      <template #header>
        <h2>{{ projectDetail.name }}</h2>
      </template>
      <el-descriptions :column="4" class="description">
        <el-descriptions-item :span="2" label="项目负责人">
          {{ projectDetail.userDetail.name }}
        </el-descriptions-item>
        <el-descriptions-item :span="2" label="项目方向">
          {{ projectDetail.direction }}
        </el-descriptions-item>

        <el-descriptions-item :span="2" label="项目预期经费">
          ￥ {{ projectDetail.expenditure }}
        </el-descriptions-item>
        <el-descriptions-item :span="2" label="所属学科">
          {{ baseInfo.subjects.find(el => el.id === projectDetail.subjectId ).name }}
        </el-descriptions-item>

        <el-descriptions-item :span="2" label="创建日期">
          {{ parseTime(projectDetail.createTime, '{y}-{m}-{d}') }}
        </el-descriptions-item>
        <el-descriptions-item :span="2" label="项目状态">
          <status-tags :status="projectDetail.status" />
        </el-descriptions-item>

        <el-descriptions-item :span="4" label="项目描述">
          {{ projectDetail.explanation }}
        </el-descriptions-item>

        <el-descriptions-item :span="4" label="附加材料下载">
          <el-link
            v-if="projectDetail.material && projectDetail.material !== ''"
            target="_blank"
            :href="'/file/download/file/'+projectDetail.material"
          >
            点击此处下载
          </el-link>
        </el-descriptions-item>

        <el-descriptions-item :span="4" label="项目参与人员">
          <el-link v-for="item in projectDetail.memberList" :key="item.id" class="mlr4">{{ item.name }} </el-link>
        </el-descriptions-item>

        <el-descriptions-item :span="4" label="最终验收日期">
          {{ projectDetail.finalReviewTime }}
        </el-descriptions-item>

        <el-descriptions-item :span="2" label="审核人">
          <el-link v-if="projectDetail.reviewUser">{{ projectDetail.reviewUser.name }}</el-link>
        </el-descriptions-item>
        <el-descriptions-item :span="2" label="审核日期">
          {{ projectDetail.reviewTime }}
        </el-descriptions-item>

        <el-descriptions-item :span="4" label="审核不通过意见">
          {{ projectDetail.noPassOpinion }}
        </el-descriptions-item>

        <el-descriptions-item :span="4" label="专家意见">
          {{ projectDetail.noPassOpinion }}
        </el-descriptions-item>

        <el-descriptions-item :span="4" label="操作">
          <el-button v-if="projectDetail.status === 'unchecked'" type="primary" @click="expertDialogVisible = true">指定专家</el-button>
          <el-button v-if="projectDetail.status === 'unchecked'" type="primary" @click="refusalDialog = true">拒绝审核</el-button>
          <el-button v-if="projectDetail.status === 'expert'" type="primary">立项</el-button>
          <el-button v-if="projectDetail.status === 'expert'" type="primary">拒绝立项</el-button>
        </el-descriptions-item>
      </el-descriptions>

    </el-card>
    <expert-select-list :visible-dialog.sync="expertDialogVisible" @close="expertDialogVisible = false" @passChecked="passChecked" />
    <RefusalCheckDialog :project-id="projectDetail.id" :visible.sync="refusalDialog" @close="refusalDialog = false" @refusalSuccess="refusalHandler" />
  </div>
</template>

<script>
import { checkProject, getProjectDetail } from '@/api/project'
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
import StatusTags from '@/components/StatusTags'
import ExpertSelectList from '@/views/project/componet/ExpertSelectList'
import RefusalCheckDialog from '@/views/project/componet/RefusalCheckDialog'
import permission from '@/directive/permission'

export default {
  name: 'ProjectDetail',
  components: { StatusTags, ExpertSelectList, RefusalCheckDialog },
  directives: { permission },
  data() {
    return {
      projectDetail: {},
      permissible: ['review'],
      expertDialogVisible: false,
      refusalDialog: false
    }
  },
  computed: {
    ...mapGetters(['baseInfo'])
  },
  mounted() {
  },
  methods: {
    // 审核通过方法
    passChecked(expertList) {
      const experts = expertList.map(el => el.id)
      checkProject({ id: this.projectDetail.id, expertList: experts }).then(res => {
        return getProjectDetail(this.projectDetail.id)
      }).then(res => {
        const { projectDetail } = res.data
        this.projectDetail = projectDetail
      }).finally(() => {
        this.expertDialogVisible = false
      })
    },
    // 拒绝审核函数
    refusalHandler(projectDetail) {
      this.projectDetail = projectDetail
    },
    // 时间处理函数
    parseTime(val0, val1) {
      return parseTime(val0, val1)
    }
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
    font-size: 18px;
    color: #909399;
    a {
      font-size: 18px;
    }
  }
}
</style>
