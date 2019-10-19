<template>
  <div>
    <vue-tabulator ref="userTable" v-model="userTable" @row-click="rowClick" :options="options"></vue-tabulator>
  </div>
</template>
<script>
  import { ADMIN_USERS } from '~/assets/js/constants/breadcrumb'

  export default {
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
