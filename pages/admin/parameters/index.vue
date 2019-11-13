<template>
  <div>
    <b-btn-toolbar>
      <b-btn to="/admin/parameters/create">Создать</b-btn>
    </b-btn-toolbar>
    <vue-tabulator ref="ParameterTable" v-model="parameterTable" @row-click="openParameter" :options="options"></vue-tabulator>
  </div>
</template>

<script>
  import { ADMIN_PARAMETERS } from '~/assets/js/constants/breadcrumb'
  import { OPTIONS_STANDARD } from '~/assets/js/constants/options'
  import { getTableParameters } from '~/assets/js/modules/tables'

  export default {
    data() {
      return {
        parameterTable: [],
        groups: [],
        typesReport: [],
        options: {
          layout:"fitColumns",
          groupBy:["typeReportId","groupId"],
          groupHeader:[
            (value, count, data) => {
              let typeReport = this.typesReport.find(type => type.id === value);
              let standard = OPTIONS_STANDARD.find(standard => standard.value === typeReport.standard).text
              return typeReport.title + " (" + standard + ")"
            },
            (value, count, data) => {
              return this.groups.find(group => group.id === value).title;
            }
          ],
          columns: [
            {title:"#", field:"id", sorter:"number", visible:false},
            {title:"Наименование", field:"title", sorter:"string"},
            {title:"Основная", field:"groupId", visible:false},
            {title:"Основная", field:"typeReportId", visible:false}
          ],
        }
      }
    },
    async asyncData({$axios, store}) {
      store.commit('breadcrumb/set', ADMIN_PARAMETERS)

      let { data } = await $axios.get(`/forms/lists/parameters`)

      let groups = data.payloads.groups;
      let typesReport = data.payloads.typesReport;

      let parameters = getTableParameters(data.data, groups)

      return {
        parameterTable: parameters,
        groups: groups,
        typesReport: typesReport
      }
    },
    methods: {
      openParameter(e, row) {
        this.$router.push(`/admin/parameters/${row.getData().id}`)
      }
    }
  }
</script>



