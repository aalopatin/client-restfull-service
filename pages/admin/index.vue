<template>
    <b-tabs pills vertical nav-wrapper-class="col-2" content-class="col-10">
      <b-tab title="Основное" ><b-card-text>Tab Contents: Основное</b-card-text></b-tab>
      <b-tab title="Пользователи">
        <admin-users-table :userTable="userTable"></admin-users-table>
      </b-tab>
      <b-tab title="Компании">
        <admin-company-table :companyTable="companyTable"></admin-company-table>
      </b-tab>
    </b-tabs>
</template>

<script>
  import AdminUsersTable from '~/components/parts/admin-users-table'
  import AdminCompanyTable from '~/components/parts/admin-company-table'
  export default {
    layout: 'admin',
    data() {
      userTable: []
      companyTable: []
    },
    components: {
      AdminUsersTable,
      AdminCompanyTable
    },
    async asyncData({$axios}) {
      let responseUser = await $axios.get(`/admin/users`);
      let responseCompany = await $axios.get(`/admin/companies`)
      return {userTable: responseUser.data, companyTable: responseCompany.data}
    },
  }
</script>
