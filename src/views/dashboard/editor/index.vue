<template>
  <div class="dashboard-editor-container">
    <el-card>
      <div class=" clearfix">
        <pan-thumb :image="avatar" style="float: left">
          <span v-for="item in roles" :key="item" class="pan-info-roles">{{ item }}</span>
        </pan-thumb>
        <div class="info-container">
          <span class="display_name">{{ name }}，{{ greeting }}</span>
          <span style="font-size:20px;padding-top:20px;display:inline-block;">{{ userInfo.country }}</span>
          <span class="mlr8" style="font-size:20px;padding-top:20px;display:inline-block;">{{ userInfo.specialization }}</span>
        </div>
      </div>
    </el-card>
    <el-row :gutter="16" class="mtb4">
      <el-col :span="8">
        <notice />
      </el-col>
    </el-row>
    <div>
      <img :src="emptyGif" class="emptyGif">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import Notice from '@/views/dashboard/common/Notice'

export default {
  name: 'DashboardEditor',
  components: { Notice, PanThumb },
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
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
  }
}
</script>

<style lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 20px 30px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>
