<template>
  <div class="app-container">
    <el-card v-if="user" class="mtb8">
      {{ greeting }}
    </el-card>
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="修改信息" name="account">
                <el-button v-if="!isModified" type="primary" @click="isModified=!isModified">点击修改信息</el-button>
                <account :user="user" :is-modified="isModified" />
              </el-tab-pane>
              <el-tab-pane label="修改密码" name="modifyPwd">
                <modify-password />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Account from './components/Account'
import ModifyPassword from './components/ModifyPassword'

export default {
  name: 'Profile',
  components: { ModifyPassword, UserCard, Account },
  data() {
    return {
      user: {},
      activeTab: 'account',
      isModified: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'userInfo'
    ]),
    greeting() {
      const date = new Date()
      const hours = date.getHours()
      if (hours >= 0 && hours < 5) {
        return '现在已经是凌晨了，请多多休息哦！'
      } else if (hours >= 5 && hours < 9) {
        return '早上好！'
      } else if (hours >= 9 && hours < 11) {
        return '上午好！'
      } else if (hours >= 11 && hours < 14) {
        return '中午好！'
      } else if (hours >= 14 && hours < 19) {
        return '下午好！'
      } else {
        return '晚上好呀！'
      }
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        role: this.roles.join(' | '),
        ...this.userInfo
      }
    }
  }
}
</script>
