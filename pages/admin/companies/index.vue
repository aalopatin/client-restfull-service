<template>
  <div>
    <b-btn-toolbar>
      <b-btn to="/admin/companies/create">Создать</b-btn>
    </b-btn-toolbar>
    <admin-company-table ref="companyTable" v-model="companyTable" @row-click="openCompany" :options="options"></admin-company-table>
  </div>
</template>

<script>
  import { TabulatorComponent } from 'vue-tabulator';
  import { ADMIN_COMPANIES } from "~/assets/js/constants/breadcrumb";

  export default {
    components: {
      'AdminCompanyTable': TabulatorComponent
    },
    data() {
      return {
        companyTable: [],
        options: {
          layout:"fitColumns",
          columns: [
            {title:"#", field:"id", sorter:"number"},
            {title:"Название", field:"title", sorter:"string"},
            {title:"Полное название", field:"fullTitle", sorter:"string"},
          ],
        }
      }
    },
    async asyncData({$axios, store}) {
      store.commit('breadcrumb/set', ADMIN_COMPANIES)
      let { data } = await $axios.get(`/admin/companies`)
      return {companyTable: data}
    },
    methods:{
      openCompany(e, row) {
        this.$router.push(`/admin/companies/${row.getData().id}`)
      }
    }
  }
</script>


