<template>
  <div>
    <b-btn-toolbar>
      <b-btn to="/admin/groupsparameters/create">Создать</b-btn>
    </b-btn-toolbar>
    <vue-tabulator ref="GroupParametersTable" v-model="groupParametersTable" @row-click="openGroupParameters" :options="options"></vue-tabulator>
  </div>
</template>

<script>
  import { ADMIN_GROUPS_PARAMETERS } from '~/assets/js/constants/breadcrumb'

  import { OPTIONS_STANDARD } from '~/assets/js/constants/selectoptions'

  export default {
    data() {
      return {
        groupParametersTable: [],
        options: {
          layout:"fitColumns",
          rowFormatter:(row) => {
            if(row.getData().basic){
              row.getElement().style.fontWeight = "bold";
            }
          },
          groupBy:(data) => { return data.typeReport.id },
          groupHeader:(value, count, data) => {
            let typeReport = data[0].typeReport;
            return typeReport.title + ' (' + OPTIONS_STANDARD.find(standard => standard.value === typeReport.standard).text  + ')'
          },
          columns: [
            {title:"#", field:"id", sorter:"number", visible:false},
            {title:"Наименование", field:"title", sorter:"string"},
            {title:"Основная", field:"basic", visible:false},
            {title:"Тип отчета", field:"typeReport", visible:false}
          ],
        }
      }
    },
    async asyncData({$axios, store}) {
      store.commit('breadcrumb/set', ADMIN_GROUPS_PARAMETERS)
      let { data } = await $axios.get(`/admin/groupsparameters`)
      return {groupParametersTable: data}
    },
    methods: {
      openGroupParameters(e, row) {
        this.$router.push(`/admin/groupsparameters/${row.getData().id}`)
      }
    }
  }
</script>


