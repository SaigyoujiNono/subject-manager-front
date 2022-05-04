<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <h3> {{ projectDetail.name }} - 经费申请</h3>
      </template>
      <el-form
        ref="expendFormRef"
        :model="expendForm"
        :rules="rules"
        label-position="left"
        label-width="80px"
        size="default"
      >
        <el-row>
          <el-col :span="24" class="grid-cell">
            <el-form-item label="申请标题" prop="name" class="required">
              <el-input v-model="expendForm.name" type="text" placeholder="请输入申请标题" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24" class="grid-cell">
            <el-form-item label="用途说明" prop="purpose" class="required">
              <el-input v-model="expendForm.purpose" type="textarea" rows="4" />
            </el-form-item>
          </el-col>
          <el-col :span="24" class="grid-cell">
            <el-form-item label="申请经费" prop="expenditure" class="required">
              <el-input v-model="expendForm.expenditure" type="text" placeholder="申请经费" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" :loading="submitLoading" @click="submitForm">提交</el-button>
    </el-card>
  </div>
</template>

<script>
import { getProjectDetail } from '@/api/project'
import { subExpenditureApplication } from '@/api/expenditure'

/**
 * 经费申请编辑
 */
export default {
  name: 'EditExpenditure',
  data() {
    return {
      projectId: this.$route.params.projectId, // 项目id
      id: this.$route.params.id, // 经费单id
      expendForm: {
        name: '',
        purpose: '',
        expenditure: ''
      },
      rules: {
        name: [{
          required: true,
          message: '必须填入申请经费标题'
        }],
        purpose: [{
          required: true,
          message: '必须填入经费用途'
        }],
        expenditure: [{
          required: true,
          message: '必须填入申请的经费'
        }, {
          pattern: /^\d+(\.\d+)?$/,
          trigger: ['blur', 'change'],
          message: '必须填入数字'
        }]
      },
      submitLoading: false,
      projectDetail: {}
    }
  },
  mounted() {
    this.loadProjectById()
  },
  methods: {
    // 加载项目数据
    loadProjectById() {
      getProjectDetail(this.projectId).then(res => {
        this.projectDetail = res.data.projectDetail
      }).catch(() => {
        this.$router.push('/404')
      })
    },
    // 重置表单
    resetForm() {
      this.$refs.expendFormRef.resetFields()
    },
    // 提交表单
    submitForm() {
      this.$refs.expendFormRef.validate(valid => {
        if (!valid) {
          return
        }
        this.submitLoading = true
        subExpenditureApplication({ projectId: this.projectId, ...this.expendForm }).then(res => {
          this.$message.success('提交成功')
          this.$router.push({ name: 'MyExpenditure' })
        }).finally(() => { this.submitLoading = false })
      })
    }
  }
}
</script>

<style scoped>

</style>
