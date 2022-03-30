<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <h2>添加用户</h2>
      </template>
      <el-form
        ref="userInfoForm"
        :model="userInfoForm"
        :rules="rules"
        label-position="top"
        label-width="100px"
        @submit.native.prevent
      >
        <el-row :gutter="16">
          <el-col :span="6">
            <el-form-item label="用户账号" prop="id">
              <el-input
                v-model="userInfoForm.id"
                type="text"
                :maxlength="20"
                :show-word-limit="true"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="grid-cell">
            <el-form-item label="姓名" prop="name" class="required">
              <el-input
                v-model="userInfoForm.name"
                :maxlength="20"
                :show-word-limit="true"
                type="text"
                placeholder="请输入姓名"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="4" class="grid-cell">
            <el-form-item label="出生年月日" prop="birth">
              <el-date-picker
                v-model="userInfoForm.birth"
                type="date"
                class="full-width-input"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                clearable
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="角色" prop="role">
              <el-select v-model="userInfoForm.role" class="full-width-input" clearable>
                <el-option
                  v-for="(item, index) in roleOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="grid-cell">
            <el-form-item label="性别" prop="sex" class="required">
              <el-radio-group v-model="userInfoForm.sex">
                <el-radio-button
                  v-for="(item, index) in sexOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                  style="{display: inline}"
                >{{ item.label }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="6" class="grid-cell">
            <el-form-item label="毕业院校" prop="graduateInstitution" class="required">
              <el-input v-model="userInfoForm.graduateInstitution" type="text" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="4" class="grid-cell">
            <el-form-item label="学历" prop="education" class="required">
              <el-select v-model="userInfoForm.education" class="full-width-input" clearable>
                <el-option
                  v-for="(item, index) in educationOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="grid-cell">
            <el-form-item label="毕业专业" prop="specialization" class="required">
              <el-input v-model="userInfoForm.specialization" type="text" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="grid-cell">
            <el-form-item label="毕业时间" prop="graduateDate" class="required">
              <el-date-picker
                v-model="userInfoForm.graduateDate"
                type="date"
                class="full-width-input"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                clearable
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="6" class="grid-cell">
            <el-form-item label="职务" prop="duty" class="required">
              <el-select v-model="userInfoForm.duty" class="full-width-input" clearable>
                <el-option
                  v-for="(item, index) in dutyOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="grid-cell">
            <el-form-item label="职称" prop="rank" class="required">
              <el-select v-model="userInfoForm.rank" class="full-width-input" clearable>
                <el-option
                  v-for="(item, index) in rankOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="grid-cell">
            <el-form-item label="入职日期" prop="entryTime" class="required">
              <el-date-picker
                v-model="userInfoForm.entryTime"
                type="date"
                class="full-width-input"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                clearable
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="grid-cell">
            <el-form-item label="办公电话" prop="officeTelephone">
              <el-input v-model="userInfoForm.officeTelephone" type="text" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="6" class="grid-cell">
            <el-form-item label="所属学科" prop="subjectId" class="required">
              <el-select v-model="userInfoForm.subjectId" class="full-width-input" clearable>
                <el-option
                  v-for="(item, index) in subjectIdOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="grid-cell">
            <el-form-item label="电子邮箱" prop="email" class="required">
              <el-input v-model="userInfoForm.email" type="text" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="grid-cell">
            <el-form-item label="手机号码" prop="mobile1" class="required">
              <el-input v-model="userInfoForm.mobile1" type="text" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="grid-cell">
            <el-form-item label="备用号码" prop="mobile2">
              <el-input v-model="userInfoForm.mobile2" type="text" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="4" class="grid-cell">
            <el-form-item label="国家" prop="country">
              <el-input v-model="userInfoForm.country" type="text" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="grid-cell">
            <el-form-item label="籍贯" prop="origo">
              <el-input v-model="userInfoForm.origo" type="text" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8" class="grid-cell">
            <el-form-item label="现住址" prop="address">
              <el-input v-model="userInfoForm.address" type="text" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="grid-cell">
            <el-form-item label="家庭电话" prop="homeTelephone">
              <el-input v-model="userInfoForm.homeTelephone" type="text" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="12" class="grid-cell">
            <div class="static-content-item">
              <el-button type="primary" @click="submitForm">添加用户</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddUser',
  components: {},
  props: {},
  data() {
    return {
      userInfoForm: {
        id: '',
        name: '',
        birth: null,
        role: null,
        sex: null,
        graduateInstitution: '',
        education: null,
        specialization: '',
        graduateDate: null,
        duty: '',
        rank: '',
        entryTime: null,
        officeTelephone: '',
        subjectId: '',
        email: '',
        mobile1: '',
        mobile2: '',
        country: '',
        origo: '',
        address: '',
        homeTelephone: ''
      },
      rules: {
        id: [{
          required: true,
          message: '字段值不可为空'
        }, {
          pattern: /^[0-9A-Za-z]{5,20}$/,
          trigger: ['blur', 'change'],
          message: '只能输入字母或者数字，长度为5-20位'
        }],
        birth: [{
          required: true,
          message: '字段值不可为空'
        }],
        role: [{
          required: true,
          message: '字段值不可为空'
        }],
        name: [{
          required: true,
          message: '字段值不可为空'
        }],
        sex: [{
          required: true,
          message: '字段值不可为空'
        }],
        graduateInstitution: [{
          required: true,
          message: '字段值不可为空'
        }],
        education: [{
          required: true,
          message: '字段值不可为空'
        }],
        specialization: [{
          required: true,
          message: '字段值不可为空'
        }],
        graduateDate: [{
          required: true,
          message: '字段值不可为空'
        }],
        duty: [{
          required: true,
          message: '字段值不可为空'
        }],
        rank: [{
          required: true,
          message: '字段值不可为空'
        }],
        entryTime: [{
          required: true,
          message: '字段值不可为空'
        }],
        subjectId: [{
          required: true,
          message: '字段值不可为空'
        }],
        email: [{
          required: true,
          message: '字段值不可为空'
        }, {
          pattern: /^([-_A-Za-z0-9.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/,
          trigger: ['blur', 'change'],
          message: ''
        }],
        mobile1: [{
          required: true,
          message: '字段值不可为空'
        }]
      },
      sexOptions: [{
        label: '女',
        value: false
      }, {
        label: '男',
        value: true
      }],
      educationOptions: [],
      rankOptions: [],
      subjectIdOptions: [],
      roleOptions: [],
      dutyOptions: []
    }
  },
  computed: {
    ...mapGetters(['baseInfo'])
  },
  watch: {},
  created() {
    this.initForm()
  },
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['userInfoForm'].validate(valid => {
        if (!valid) {
          console.log('不行啊')
          return
        }
        // TODO: 提交表单
        console.log(this.userInfoForm)
      })
    },
    resetForm() {
      this.$refs['vForm'].resetFields()
    },
    // 初始化表单方法
    initForm() {
      const { subjects, duties, ranks, educations, roles } = this.baseInfo
      this.subjectIdOptions = subjects.map(el => { return { value: el.id, label: el.name } })
      this.dutyOptions = duties.map(el => { return { value: el.id, label: el.name } })
      this.rankOptions = ranks.map(el => { return { value: el.id, label: el.name } })
      this.educationOptions = educations.map(el => { return { value: el.id, label: el.name } })
      this.roleOptions = roles.map(el => { return { value: el.id, label: el.description } })
    }
  }
}
</script>

<style scoped>

</style>
