<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'editorDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (this.roles.includes('admin') || this.roles.includes('department') ||
    this.roles.includes('secretary') || this.roles.includes('principal')) {
      // adminDashboard editorDashboard
      this.currentRole = 'adminDashboard'
    }
  }
}
</script>
