<template>
  <el-form
    ref="userInfo"
    :model="userInfoForm"
    :rules="rules"
    label-position="top"
    :disabled="!isModified"
    @submit.native.prevent
  >
    <el-row :gutter="16">
      <el-col :span="6" class="grid-cell">
        <el-form-item label="姓名" prop="name" class="required">
          <el-input v-model="userInfo.name" :disabled="true" type="text" placeholder="请输入姓名" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8" class="grid-cell">
        <el-form-item label="出生年月日" prop="birth">
          <el-date-picker
            v-model="userInfo.birth"
            type="date"
            class="full-width-input"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="userInfo.sex">
            <el-radio-button
              v-for="(item, index) in sexOptions"
              :key="index"
              v-model="userInfo.sex"
              :label="item.value"
              :disabled="true"
            >{{ item.label }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="6" class="grid-cell">
        <el-form-item label="毕业院校" prop="graduateInstitution">
          <el-input v-model="userInfoForm.graduateInstitution" type="text" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="4" class="grid-cell">
        <el-form-item label="学历" prop="education">
          <el-select v-model="userInfoForm.education" clearable>
            <el-option
              v-for="(item, index) in educationOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="grid-cell">
        <el-form-item label="毕业专业" prop="specialization">
          <el-input v-model="userInfoForm.specialization" type="text" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6" class="grid-cell">
        <el-form-item label="毕业时间" prop="graduateDate">
          <el-date-picker
            v-model="userInfoForm.graduateDate"
            type="date"
            class="full-width-input"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            clearable
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="6" class="grid-cell">
        <el-form-item label="职务" prop="duty">
          <el-select v-model="userInfoForm.duty" clearable>
            <el-option
              v-for="(item, index) in dutyOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              class="full-width-input"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="职称" prop="rank">
          <el-select v-model="userInfoForm.rank" clearable>
            <el-option
              v-for="(item, index) in rankOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              class="full-width-input"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="入职日期" prop="entryTime">
          <el-date-picker
            v-model="userInfoForm.entryTime"
            type="date"
            class="full-width-input"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="办公电话" prop="officeTelephone">
          <el-input v-model="userInfoForm.officeTelephone" type="text" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="6" class="grid-cell">
        <el-form-item label="所属学科" prop="subjectId">
          <el-select v-model="userInfoForm.subjectId" clearable>
            <el-option
              v-for="(item, index) in subjectIdOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              class="full-width-input"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="userInfoForm.email" type="text" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="手机号码" prop="mobile1">
          <el-input v-model="userInfoForm.mobile1" type="text" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="备用号码" prop="mobile2">
          <el-input v-model="userInfoForm.mobile2" type="text" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="4">
        <el-form-item label="国家" prop="country">
          <el-input v-model="userInfoForm.country" type="text" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="籍贯" prop="origo">
          <el-input v-model="userInfoForm.origo" type="text" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="现住址" prop="address">
          <el-input v-model="userInfoForm.address" type="text" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="家庭电话" prop="homeTelephone">
          <el-input v-model="userInfoForm.homeTelephone" type="text" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="12">
        <div>
          <el-button type="primary">修改信息</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    isModified: {
      type: Boolean
    }
  },
  data() {
    return {
      userInfoForm: {
        name: '',
        birth: null,
        sex: true,
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
        birth: [{
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
      dutyOptions: [],
      rankOptions: [],
      subjectIdOptions: []
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'baseInfo'])
  },
  created() {
    this.initForm()
    console.log(this.isModified)
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    },
    initForm() {
      const { subjects, duties, ranks, educations } = this.baseInfo
      this.subjectIdOptions = subjects.map(el => { return { value: el.id, label: el.name } })
      this.dutyOptions = duties.map(el => { return { value: el.id, label: el.name } })
      this.rankOptions = ranks.map(el => { return { value: el.id, label: el.name } })
      this.educationOptions = educations.map(el => { return { value: el.id, label: el.name } })
      this.userInfoForm = { ...this.userInfo }
    }
  }
}
</script>
