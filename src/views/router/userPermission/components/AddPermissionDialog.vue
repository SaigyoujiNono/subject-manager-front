<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible="visible"
    :before-close="beforeClose"
  >
    <template #title>
      添加权限
    </template>
    <el-form ref="permFormRef" label-width="100px" label-position="top" :data="form" :rules="rules">
      <el-form-item prop="permission" label="权限名称">
        <el-input v-model="form.permission" :clearable="true" placeholder="请输入权限" />
      </el-form-item>
      <el-form-item prop="description" label="权限描述">
        <el-input v-model="form.description" :clearable="true" placeholder="请输入权限" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="beforeClose">取消</el-button>
      <el-button type="primary" @click="submitForm">确认添加</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddPermissionDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        permission: '',
        description: ''
      },
      rules: {
        permission: [
          { required: true, trigger: 'blur', message: '必填' }
        ],
        description: [
          { required: true, trigger: 'blur', message: '必填' }
        ]
      }
    }
  },
  methods: {
    // 关闭回调
    beforeClose() {
      this.$emit('close')
    },
    // 提交表单
    submitForm() {
      this.$refs.permFormRef.validate(valid => {
        if (!valid) {
          return
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
