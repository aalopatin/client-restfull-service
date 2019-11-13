<template>
    <div>
      <b-form-group id="fieldset-company" label-cols="3" label="Компания: " label-for="company">
        <b-input id="company" v-model="company" :readonly="true"></b-input>
      </b-form-group>
      <period-selection v-model="selectedPeriods" label="Периоды отчетов:" button-label-open="Подобрать" button-label-close="Закончить подбор"></period-selection>
      <b-form-group
        id="fieldset-typeReports"
        label-cols="3"
        label="Тип отчетов:"
        label-for="typeReports"
      >
        <b-select id="typeReports" v-model="typeReportsId" :options="optionsTypesReports"></b-select>
      </b-form-group>
      <b-form-group
        id="fieldset-multiplicity"
        label-cols="3"
        label="Валюта:"
        label-for="multiplicity"
      >
        <b-input-group>
          <b-select id="multiplicity" v-model="multiplicity" :options="optionsMultiplicity"></b-select>
          <b-select id="currency" v-model="currency" :options="optionsCurrency"></b-select>
        </b-input-group>
      </b-form-group>
      <vue-tabulator ref="dataReportsTable" v-model="dataReports" :options="optionsDataReports"></vue-tabulator>
    </div>
</template>

<script>
  import PeriodSelection from '~/components/PeriodSelection'
  import { ADMIN_COMPANIES } from '~/assets/js/constants/breadcrumb'
  import { getOptionsTypesReport} from '~/assets/js/modules/optionsVue'
  import { getOptionsParameters } from '~/assets/js/modules/optionsTabulator'
  import {OPTIONS_CURRENCY, OPTIONS_MULTIPLICITY} from '~/assets/js/constants/options'

  export default {
    name: "create",
    components: { PeriodSelection },
    data() {
      return {
        company: "",
        selectedPeriods: [],
        typeReportsId: '',
        optionsTypesReports: [],
        multiplicity: 1,
        optionsMultiplicity: OPTIONS_MULTIPLICITY,
        currency: "",
        optionsCurrency: OPTIONS_CURRENCY,
        optionsParameters: [],
        dataReports: [
          {titleParameter: "", parameter: ""}
          ],
        optionsDataReports: {
          layout:"fitColumns",
          clipboard: true,
          clipboardPasteAction:"replace",
          columns: [
            {title: "Название показателя", field:"titleParameter", editor:"input"},
            {title: "Показателя", field:"parameter", editor:"select"}
          ]
        }

      }
    },
    async asyncData({params, $axios, store}) {

      let companyResponse = await $axios.get(`/admin/companies/${params.id}`)
      let company = companyResponse.data.title
      let typesReportResponse = await $axios.get(`/admin/typesreports`);

      store.commit('breadcrumb/set', ADMIN_COMPANIES)
      store.commit('breadcrumb/pushNext', {url: `/${params.id}`, title: company})
      store.commit('breadcrumb/pushActive', "Отчеты")
      store.commit('breadcrumb/pushActive', "Создание")

      return {
        company: company,
        optionsTypesReports: getOptionsTypesReport(typesReportResponse.data)
      }
    },
    watch: {
      typeReportsId: async function() {
        let parametersResponse = await this.$axios.get(`/forms/lists/parameters`)

        let columns = this.optionsDataReports.columns
        let columnParameterIndex = this.optionsDataReports.columns.findIndex(column => column.field === "parameter")
        console.log(this.optionsDataReports)
        columns[columnParameterIndex].editorParams = getOptionsParameters(parametersResponse.data.data, parametersResponse.data.payloads.groups)
        this.optionsDataReports.columns = columns
        console.log(this.optionsDataReports)
      },
      optionsDataReports: function () {
        console.log("изменились настройки")
      }
    }
  }
</script>

<style scoped>

</style>
