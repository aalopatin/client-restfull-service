<template>
  <div>
    <admin-users-table ref="userTable" v-model="userTable" @row-click="rowClick" :options="options"></admin-users-table>
  </div>
</template>
<script>
  import { TabulatorComponent } from 'vue-tabulator';
  import { ADMIN_USERS } from '~/assets/js/constants/breadcrumb'

  export default {
    components: {
      'AdminUsersTable': TabulatorComponent
    },
    data() {
      return {
        userTable: [],
        options: {
          layout:"fitColumns",
          columns: [
            {title:"#", field:"id", sorter:"number"},
            {title:"Пользователь", field:"username", sorter:"string"},
            {title:"Email", field:"email", sorter:"string"},
            {title:"Код активации", field:"activationCode"},
            {title:"Активный", field:"active", align:"center", formatter:"tickCross"},
            {title: "Роли", field: "roles"}
          ],
        }
      }
    },
    async asyncData({$axios, store}) {
      store.commit('breadcrumb/set', ADMIN_USERS)
      let responseUser = await $axios.get(`/admin/users`);
      return {userTable: responseUser.data}
    },
    methods:{
      rowClick(e, row) {
        this.$router.push(`/admin/users/${row.getData().id}`)
      }
    }
  }
</script>
