<template>
    <div>
      <b-form-group id="fieldset-company" label-cols="3" label="Компания: " label-for="company">
        <b-input id="company" v-model="company" :readonly="true"></b-input>
      </b-form-group>
      <period-selection
        v-model="$v.form.selectedPeriods.$model"
        label="Периоды отчетов:"
        button-label-open="Подобрать"
        button-label-close="Закончить подбор"
        :disabled="step !== 0"
        @hidden="setPeriods"></period-selection>
      <b-alert :show="$v.form.selectedPeriods.$error" variant="danger">
        Необходимо выбрать периоды отчетов!
      </b-alert>
      <b-form-group
        id="fieldset-typeReports"
        label-cols="3"
        label="Тип отчетов:"
        label-for="typeReports"
      >
        <b-select id="typeReports" v-model="$v.form.typeReportsId.$model" :options="optionsTypesReport" :disabled="step !== 0"></b-select>
      </b-form-group>
      <b-alert :show="$v.form.typeReportsId.$error" variant="danger">
        Необходимо выбрать тип отчетов!
      </b-alert>
      <b-form-group
        id="fieldset-multiplicity"
        label-cols="3"
        label="Валюта:"
        label-for="multiplicity"
      >
        <b-input-group>
          <b-select id="multiplicity" v-model="form.multiplicity" :options="optionsMultiplicity" :disabled="step !== 0"></b-select>
          <b-select id="currency" v-model="form.currency" :options="optionsCurrency" :disabled="step !== 0"></b-select>
        </b-input-group>
      </b-form-group>
      <b-alert :show="$v.form.multiplicity.$error || $v.form.currency.$error" variant="danger">
        Необходимо выбрать валюту отчетов!
      </b-alert>
      <b-form-checkbox v-model="displayGroupTitle">Выводить название групп в названии параметра</b-form-checkbox>
      <tabulator ref="dataReports" v-model="dataReports" :options="optionsDataReports"></tabulator>
      <b-btn-toolbar>
          <b-btn class="m-1" @click="clickBack">Назад</b-btn>
          <b-btn class="m-1" @click="clickNext">{{ labelButtonNext[step] }}</b-btn>
      </b-btn-toolbar>
    </div>
</template>

<script>
  import { ADMIN_COMPANIES } from '~/assets/js/constants/breadcrumb'
  import {OPTIONS_CURRENCY, OPTIONS_MULTIPLICITY} from '~/assets/js/constants/options'
  import { COLUMNS_ENTER_REPORTS } from '~/assets/js/constants/columnsTabulator'

  import { getOptionsTypesReport} from '~/assets/js/modules/optionsVue'
  // import { getOptionsParameters } from '~/assets/js/modules/selectorValuesTabulator'

  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'

  import Tabulator from '~/components/Tabulator'
  import PeriodSelection from '~/components/PeriodSelection'

  import ParameterAPI from '~/assets/js/API/parameter'

  import { parametersValues } from '~/assets/js/modules/convertionTabulator'
  import { findParameterByTerm } from '~/assets/js/modules/logicTabulator'

  export default {
    name: "create",
    components: { PeriodSelection, Tabulator },
    mixins: [validationMixin],
    data() {
      return {
        company: "",
        form: {
          selectedPeriods: [],
          typeReportsId: '',
          multiplicity: 1,
          currency: "",
        },
        optionsTypesReport: [],
        optionsMultiplicity: OPTIONS_MULTIPLICITY,
        optionsCurrency: OPTIONS_CURRENCY,
        parameters: [],
        dataReports: [{}],
        displayGroupTitle: false,
        optionsDataReports: {
          layout:"fitColumns",
          height:"500px",
          clipboard: true,
          clipboardPasteAction:"replace",
          clipboardPasted: () => {
            let length = this.dataReports.length
            let newDataReports = this.$refs.dataReports.getInstance().getData()
            this.dataReports.splice(0, length, ...newDataReports)
          },
          columns: [
            {title: "Название показателя", field:"titleParameter", editor:"input"},
          ]
        },
        labelButtonNext: [
          'Прочитать данные',
          'Записать отчеты',
          ''
        ],
        step: 0
      }
    },
    validations: {
      form: {
        selectedPeriods: {
          required
        },
        typeReportsId: {
          required
        },
        multiplicity: {
          required
        },
        currency: {
          required
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
        optionsTypesReport: getOptionsTypesReport(typesReportResponse.data)
      }
    },
    methods: {
      setPeriods() {
        let length = this.optionsDataReports.columns.length
        let columnsPeriods = this.form.selectedPeriods.map((period) => {
          return COLUMNS_ENTER_REPORTS.columnPeriod(period.id)
        })
        this.optionsDataReports.columns.splice(1, length, ...columnsPeriods)
      },
      clickBack() {
        switch (this.step) {
          case 2:

            this.step -= 1
            break
          case 1:
            this.backToStepOne().then(
              this.step -= 1
            )
            break
          case 0:


            break
        }
      },
      clickNext() {
        switch (this.step) {
          case 0:
            this.$v.form.$touch()
            if (this.$v.form.$anyError) {
              return
            }
            this.readData().then(
              this.step += 1
            )
            break
          case 1:

            this.step += 1
            break
        }
      },
      async readData() {

        let response = await ParameterAPI.findAll.call(this)

        this.parameters = response.data

        let values = parametersValues(this.parameters)

        let column =  {title: "Показателя", field:"parameter", editor:"autocomplete",
          editorParams: {
            values: values,
            listItemFormatter: (value, title) => {
              if (this.displayGroupTitle && value !== undefined) {
                return title + " - (" + this.parameters.find(parameter => String(parameter.id) === value).groupTitle + ")"
              } else {
                return title
              }
            },
            allowEmpty: true,
            searchFunc: (term, values) => {
              let matches = []
              let foundParameters = findParameterByTerm(term, this.parameters)
              values.forEach(function(item){
                if(foundParameters.indexOf(item.value) !== -1){
                  matches.push(item);
                }
              });
              return matches;
            }
          },
          formatter:"lookup",
          formatterParams: values
        }

        this.optionsDataReports.columns.splice(1, 0, column)

        this.dataReports.forEach(value => {
          let foundParameters = findParameterByTerm(value.titleParameter, this.parameters)
          if(foundParameters.length === 1) {
            value.parameter = foundParameters[0]
          }
        })

      },
      async backToStepOne() {
        this.optionsDataReports.columns.splice(1, 1)
      }
    }
  }
</script>

<style scoped>

</style>
