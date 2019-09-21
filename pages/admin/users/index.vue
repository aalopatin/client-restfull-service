<template>
  <div>
    <admin-users-table :userTable="userTable"></admin-users-table>
  </div>
</template>
<script>
  import AdminUsersTable from '~/components/parts/admin-users-table'
  import { ADMIN_USERS } from '~/assets/js/constants/breadcrumb'

  export default {
    data() {
      userTable: []
    },
    components: {
      AdminUsersTable,
    },
    async asyncData({$axios, store}) {
      store.commit('breadcrumb/set', ADMIN_USERS)
      let responseUser = await $axios.get(`/admin/users`);
      return {userTable: responseUser.data}
    },
  }
</script>
