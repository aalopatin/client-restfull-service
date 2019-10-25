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
  import { OPTIONS_STANDARD } from "~/assets/js/constants/options";

  export default {
    data() {
      return {
        typeReportsTable: [],
        options: {
          layout:"fitColumns",
          columns: [
            {title:"#", field:"id", visible:false},
            {title:"Наименование", field:"title"},
            {title:"Стандарт отчетности", field:"standard",
              formatter:(cell, formatterParams, onRendered) => {
                const value = cell.getValue()
                return OPTIONS_STANDARD.find(standard => standard.value === value).text;
              }
            }
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


