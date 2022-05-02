<template>
  <el-dialog
    :visible="visible"
    :before-close="beforeClose"
    :close-on-click-modal="false"
  >
    <template #title>
      专家意见
    </template>
    <el-form ref="opinionRef" :model="form" :rules="rules">
      <el-form-item prop="opinion" label="意见">
        <el-input
          v-model="form.opinion"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8}"
          placeholder="请输入意见"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="beforeClose">取消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { expertOpinion } from '@/api/project'

export default {
  name: 'ExpertOpinionDialog',
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
          { required: true, trigger: 'blur', message: '必须填写意见' }
        ]
      },
      submitLoading: false
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.opinionRef.resetFields()
        })
      }
    }
  },
  methods: {
    beforeClose() {
      this.$emit('close')
    },
    // 提交专家意见
    handleSubmit() {
      this.$refs.opinionRef.validate(valid => {
        if (!valid) {
          return
        }
        this.submitLoading = true
        expertOpinion({ projectId: this.projectId, expertOpinion: this.form.opinion })
          .then(res => {
            this.$message.success('提交成功')
            this.$emit('sub-success')
          }).finally(() => { this.submitLoading = false })
      })
    }
  }
}
</script>

<style scoped>

</style>
