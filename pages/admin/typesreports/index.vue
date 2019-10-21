<template>
  <div>
    <b-btn-toolbar>
      <b-btn to="/admin/typesreports/create">Создать</b-btn>
    </b-btn-toolbar>
    <vue-tabulator ref="TypeReportsTable" v-model="typeReportsTable" @row-click="openTypeReport" :options="options"></vue-tabulator>
  </div>
</template>

<script>
  import { ADMIN_TYPES_REPORTS } from "~/assets/js/constants/breadcrumb";

  export default {
    data() {
      return {
        typeReportsTable: [],
        options: {
          layout:"fitColumns",
          columns: [
            {title:"#", field:"id", sorter:"number"},
            {title:"Наименование", field:"title", sorter:"string"},
            {title:"Стандарт финансовой отчетности", field:"standard", sorter:"string"}
          ],
        }
      }
    },
    async asyncData({$axios, store}) {
      store.commit('breadcrumb/set', ADMIN_TYPES_REPORTS)
      let { data } = await $axios.get(`/admin/typesreports`)
      return {typeReportsTable: data}
    },
    methods: {
      openTypeReport(e, row) {
        this.$router.push(`/admin/typesreports/${row.getData().id}`)
      }
    }
  }
</script>


