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
                :disabled="step !== 1"
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
                <b-select id="typeReports" v-model="$v.form.typeReportsId.$model" :options="optionsTypesReport" :disabled="step !== 1"></b-select>
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
                  <b-select id="multiplicity" v-model="form.multiplicity" :options="optionsMultiplicity" :disabled="step !== 1"></b-select>
                  <b-select id="currency" v-model="form.currency" :options="optionsCurrency" :disabled="step !== 1"></b-select>
                </b-input-group>
              </b-form-group>
    <b-alert :show="$v.form.multiplicity.$error || $v.form.currency.$error" variant="danger">
                Необходимо выбрать валюту отчетов!
              </b-alert>
    <template v-if="step<3">
      <b-form-checkbox v-model="displayGroupTitle" v-show="step === 2">Выводить название групп в названии параметра</b-form-checkbox>
      <tabulator ref="dataReports" v-model="dataReports" :options="optionsDataReports"></tabulator>
    </template>
    <template v-else-if="step=3">
      <tabulator ref="filledReports" v-model="filledReports" :options="optionsFilledReports"></tabulator>
    </template>
    <b-btn-toolbar>
      <b-btn class="m-1" @click="clickBack">Назад</b-btn>
      <b-btn class="m-1" @click="clickNext">{{ labelNextButton[step] }}</b-btn>
    </b-btn-toolbar>
  </div>
</template>

<script>
  import { ADMIN_COMPANIES } from '~/assets/js/constants/breadcrumb'
  import {OPTIONS_CURRENCY, OPTIONS_MULTIPLICITY} from '~/assets/js/constants/options'

  import { findAllTypeReportAPI } from '~/assets/js/API/typeReport'
  import { selectOptionsTypeReport } from '~/assets/js/modules/convertion'

  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'

  import Tabulator from '~/components/Tabulator'
  import PeriodSelection from '~/components/PeriodSelection'

  import ParameterAPI from '~/assets/js/API/parameter'
  import ReportAPI from '~/assets/js/API/report'

  import { parametersValues } from '~/assets/js/modules/convertionTabulator'
  import LogicTabulator from '~/assets/js/modules/logicTabulator'

  export default {
    name: "create",
    components: { PeriodSelection, Tabulator },
    mixins: [validationMixin],
    data() {
      return {
        company: '',
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
        filledReports: [],
        optionsDataReports: {
          layout:"fitColumns",
          height:"100%",
          clipboard: true,
          clipboardPasteAction:"replace",
          clipboardPasted: () => {
            let length = this.dataReports.length
            let newDataReports = LogicTabulator.filterEmptyRows(this.$refs.dataReports.getInstance().getData())
            this.dataReports.splice(0, length, ...newDataReports)
          },
          columns: [
            {title: "Название показателя", field:"titleParameter", editor:"input"},
          ]
        },
        optionsFilledReports: {
          layout:"fitColumns",
          height: "100%",
          columns: [
            {title: ""}
          ]
        },
        displayGroupTitle: false,
        labelNextButton: [
          'Прочитать данные',
          'Заполнить отчеты',
          'Записать отчеты',
          'Закрыть'
        ],
        step: 1
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

      let resultTypeReport = await findAllTypeReportAPI($axios)
      let typesReports = selectOptionsTypeReport(resultTypeReport.data, true)

      store.commit('breadcrumb/set', ADMIN_COMPANIES)
      store.commit('breadcrumb/pushNext', {url: `/${params.id}`, title: company})
      store.commit('breadcrumb/pushActive', "Отчеты")
      store.commit('breadcrumb/pushActive', "Создание")

      return {
        company: company,
        optionsTypesReport: typesReports
      }
    },
    methods: {
      setPeriods() {
        let length = this.optionsDataReports.columns.length
        let columnsPeriods = this.form.selectedPeriods.map((period) => {
          return {title: period.id, field: period.id, editor:"input"}
        })
        this.optionsDataReports.columns.splice(1, length, ...columnsPeriods)
      },
      clickBack() {
        switch (this.step) {
          case 3:

            this.step -= 1
            break
          case 2:
            this.backToStepOne().then( result =>
              this.step -= 1
            )
            break
          case 1:


            break
        }
      },
      clickNext() {
        switch (this.step) {
          case 1:
            this.$v.form.$touch()
            if (this.$v.form.$anyError) {
              return
            }
            this.readData().then( result =>
              this.step += 1
            )
            break
          case 2:
            this.fillReports().then( result => {

              this.step += 1
            })
            break
          case 3:
            this.loadReports().then( result =>
              this.step += 1
            )
            break
        }
      },
      async readData() {

        let response = await ParameterAPI.findAll(this.$axios)

        this.parameters = response.data

        let values = parametersValues(this.parameters)

        let column =  {title: "Показателя", field:"parameter", editor:"autocomplete",
          editorParams: {
            values: values,
            allowEmpty: true,
            listItemFormatter: (value, title) => {
              if (this.displayGroupTitle && value !== undefined) {
                return title + " - (" + this.parameters.find(parameter => String(parameter.id) === value).groupTitle + ")"
              } else {
                return title
              }
            },
            searchFunc: (term, values) => {
              let matches = []
              let foundParameters = LogicTabulator.findParameterByTerm(term, this.parameters)
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
          let foundParameters = LogicTabulator.findParameterByTerm(value.titleParameter, this.parameters)
          if(foundParameters.length === 1) {
            value.parameter = foundParameters[0]
          }
        })

      },
      async fillReports() {

        let reports = [];

        this.form.selectedPeriods.forEach(period => {
          let report = {
            companyId: Number(this.$route.params.id),
            periodId: period.id,
            typeReportId: this.form.typeReportsId,
            multiplicity: this.form.multiplicity,
            currencyCode: this.form.currency,
            parameters: this.dataReports.map(item => {
              return {
                parameterId: Number(item.parameter),
                value: Number(item[period.id])
              }
            })
          }
          reports.push(report)
        })

        this.filledReports = reports

      },
      async loadReports() {
        ReportAPI.create.call(this, this.filledReports).then(result => console.log(result))
      },
      async backToStepOne() {
        this.optionsDataReports.columns.splice(1, 1)
      },
    }
  }
</script>

<style scoped>

</style>
