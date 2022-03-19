<template>
  <el-form
    ref="modifyPwd"
    :model="modifyPwd"
    :rules="rules"
    @submit.native.prevent
  >
    <el-row>
      <el-col class="grid-cell">
        <el-form-item label="请输入原密码" prop="originPwd" class="required">
          <el-input v-model="modifyPwd.originPwd" type="text" placeholder="请输入密码" clearable />
        </el-form-item>
        <el-form-item label="请输入新的密码" prop="newPwd" class="required">
          <el-input v-model="modifyPwd.newPwd" type="password" placeholder="请输入新密码" clearable />
        </el-form-item>
        <el-form-item label="请再次输入新密码" prop="confirmPwd" class="required">
          <el-input v-model="modifyPwd.confirmPwd" type="password" placeholder="请再次输入新密码" clearable />
        </el-form-item>
        <div class="static-content-item">
          <el-button type="primary" @click="submitForm()">修改密码</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'ModifyPassword',
  data() {
    // 校验再次输入新密码的函数
    const validateNewPassword = (rule, value, callback) => {
      if (this.modifyPwd.newPwd !== value) {
        callback(new Error('与您上一次输入的新密码不一致'))
      } else if (value === '') {
        callback(new Error('您必须再次确认您的新密码'))
      } else {
        callback()
      }
    }
    return {
      modifyPwd: {
        originPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      rules: {
        originPwd: [{ required: true, message: '必须输入原密码' }],
        newPwd: [{ required: true, message: '必须输入新的密码' }, {
          pattern: /^[a-zA-Z]\w{5,15}$/,
          trigger: ['blur', 'change'],
          message: '新密码格式不正确，必须以英文字母开头，且长度必须为6-16位'
        }],
        confirmPwd: [{ required: true, validator: validateNewPassword }]
      }
    }
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs['modifyPwd'].validate(valid => {
        if (!valid) return
        this.$message({
          type: 'success',
          message: '成功'
        })
        // TODO: 提交表单
      })
    }
  }
}
</script>

<style scoped>

</style>
