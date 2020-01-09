<template>
    <div>
      <b-btn-toolbar>
        <b-btn class="ml-1" variant="dark" :to="'/admin/settingsreports/create' + [companyId ? '/?companyId=' + companyId : '']">Создать</b-btn>
      </b-btn-toolbar>
      <tabulator ref="SettingsReports" v-model="table" :options="options"></tabulator>
    </div>
</template>

<script>
  import Tabulator from "./Tabulator";

  export default {
    name: "SettingsReports",
    components: { Tabulator },
    props: {
      companyId: {
        default: null
      }
    },
    data() {
      return {
        table: [],
        options: {
          layout:"fitColumns",
          columns: [
            {title:"#", field:"id", visible:false},
            {title:"Компания", field:"companyId"},
            {title:"Общая", field:"common"},
            {title:"Тип отчета", field:"typeReportId"},
            {title:"Группа параметров", field:"groupParametersId"}
          ],
        },
      }
    },
    watch: {

    }
  }
</script>

<style scoped>

</style>
