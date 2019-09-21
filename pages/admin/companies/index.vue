<template>
  <div>
    <admin-company-table :companyTable="companyTable"></admin-company-table>
  </div>
</template>

<script>
  import AdminCompanyTable from '~/components/parts/admin-company-table'
  import { ADMIN_COMPANIES } from "~/assets/js/constants/breadcrumb";

  export default {
    data() {
      companyTable: []
    },
    components: {
      AdminCompanyTable
    },
    async asyncData({$axios, store}) {
      store.commit('breadcrumb/set', ADMIN_COMPANIES)
      let { data } = await $axios.get(`/admin/companies`)
      return {companyTable: data}
    }
  }
</script>


