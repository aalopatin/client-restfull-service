<template>
    <b-tabs pills vertical nav-wrapper-class="col-2" content-class="col-10">
      <b-tab title="Основное" ><b-card-text>Tab Contents: Основное</b-card-text></b-tab>
      <b-tab title="Пользователи">
        <admin-users-table :usersTable="usersTable"></admin-users-table>
      </b-tab>
      <b-tab title="Компании"><b-card-text>Tab Contents: Компании</b-card-text></b-tab>
    </b-tabs>
</template>

<script>
  import AdminUsersTable from '~/components/parts/admin-users-table'
  export default {
    layout: 'admin',
    data() {
      usersTable: []
    },
    components: {
      AdminUsersTable
    },
    async asyncData({$axios}) {

      let {data} = await $axios.get('/admin/users');
      return {usersTable: data}

    },
  }
</script>
