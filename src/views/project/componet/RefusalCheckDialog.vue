<template>
  <el-dialog
    :visible.sync="visible"
    width="600px"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    @submit.native.prevent
  >
    <template #title>
      拒绝审核
    </template>
    <template #footer>
      <el-button type="primary" :loading="loading" @click="submitForm">确认</el-button>
    </template>
    <el-form ref="refusalRef" :model="form" :rules="rules">
      <el-form-item label="拒绝审核意见" prop="opinion">
        <el-input
          v-model="form.opinion"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5}"
          placeholder="请输入内容"
        />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { checkProject, getProjectDetail } from '@/api/project'

export default {
  name: 'RefusalCheck',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    projectId: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      form: {
        opinion: ''
      },
      rules: {
        opinion: [
          { required: true, message: '必须输入审核意见', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs['refusalRef'].validate(valid => {
        if (!valid) {
          return
        }
        this.loading = true
        checkProject({ id: this.projectId, opinion: this.form.opinion }).then(res => {
          this.$message.success('拒绝审核成功')
          return getProjectDetail(this.projectId)
        }).then(res => {
          const { projectDetail } = res.data
          this.$emit('refusalSuccess', projectDetail)
          this.$emit('close')
        }).finally(() => {
          this.loading = false
        })
        console.log('通过审核')
      })
    },
    // 关闭弹窗回调
    beforeClose() {
      if (!this.loading) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
