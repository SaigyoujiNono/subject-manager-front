<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>关于我</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>你好</div>
          {{ user.name }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>毕业学校</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.graduateInstitution }} - {{ user.education }}
          </div>
        </div>
      </div>

      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <Icon icon="fxemoji:graduationcap" color="#2cad43" width="18" height="18" />
          <span>毕业日期: {{ user.graduateDate }}</span>
        </div>
      </div>

      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <Icon icon="clarity:employee-solid" color="black" width="18" height="18" />
          <span>入职日期: {{ user.entryTime }}</span>
        </div>
      </div>

      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <Icon icon="flat-color-icons:voice-presentation" color="black" width="18" height="18" />
          <span>自我介绍</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.description }}
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import { Icon } from '@iconify/vue2'

export default {
  components: { PanThumb, Icon },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          role: '',
          sex: true,
          education: '',
          graduateInstitution: '',
          specialization: '',
          graduateDate: '',
          duty: '',
          rank: '',
          birth: '',
          country: '',
          origo: '',
          address: '',
          homeTelephone: '',
          officeTelephone: '',
          mobile1: '',
          mobile2: '',
          entryTime: '',
          subject: '',
          description: ''
        }
      }
    }
  },
  computed: {
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
