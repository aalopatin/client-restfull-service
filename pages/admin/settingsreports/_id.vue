<template>
  <b-form @submit.stop.prevent="onSubmit">
    <b-button v-b-toggle.header variant="Link" class="w-100 mb-1">
      <span class="when-closed">Показать </span><span class="when-opened">Скрыть </span>шапку
    </b-button>
    <b-collapse visible id="header">
      <b-card>
      <b-form-group>
        <b-form-checkbox
          id="checkbox-basic"
          v-model="form.basic"
        >Общая настройка отчета</b-form-checkbox>
      </b-form-group>
      <b-form-group label="Компания: " label-for="select-company" v-show="!form.basic">
        <b-form-select
          id="select-company"
          v-model="form.companyId"
          :options="selectOptions.company"
        ></b-form-select>
      </b-form-group>
      <b-form-group label="Тип отчета:" label-for="select-typeReport">
        <b-form-select
          id="select-typeReport"
          v-model="form.typeReportId"
          :options="selectOptions.typeReport"
        ></b-form-select>
      </b-form-group>
      <b-form-group label="Группа параметров:" label-for="select-group" v-show="!form.basic">
        <b-form-select
          id="select-group"
          v-model="form.groupId"
          :options="selectOptions.group"
        ></b-form-select>
      </b-form-group>
      </b-card>
    </b-collapse>
    <h5>Параметры</h5>
    <b-row>
    <b-form-select v-model="filterByBasic" :options="selectOptions.filterByBasic" class="mb-1"></b-form-select>
    <b-form-input v-model="filterByTerm" class="mb-1"></b-form-input>
    </b-row>
    <div class="overflow-auto" style="height: 300px">
      <wl-nested-list
        :items="filteredParameters"
        :field="'title'"
        prefix="parameters"
        :nested="false"
        :group="{name: 'parameters', pull: 'clone', put: false}"
        :clone="cloneParameter"
        :deleteButton="false"
      ></wl-nested-list>
    </div>
    <h5>Выбранные параметры</h5>
    <div class="overflow-auto" style="height: 500px">
      <wl-nested-list
        :items="form.rowsSettingReport"
        :field="'parameterTitle'"
        :child="'childParameters'"
        prefix="settings"
        :group="'parameters'"
      ></wl-nested-list>
    </div>
    <b-button type="submit">{{ isCreate ? 'Создать' : 'Сохранить' }}</b-button>
  </b-form>
</template>

<script>

  import { ADMIN_SETTINGS_REPORTS_CREATE } from '~/assets/js/constants/breadcrumb'

  import { findAllCompany } from '~/assets/js/API/company'
  import { findAllTypeReportAPI } from '~/assets/js/API/typeReport'
  import { findAllGroupParametersAPI } from '~/assets/js/API/groupParameters'
  import { findAllParameters } from '~/assets/js/API/parameter'

  import { selectOptionsAny, selectOptionsTypeReport } from '~/assets/js/modules/convertion'

  import WlNestedList from '~/components/WlNestedList'

  import { isNull } from '~/assets/js/modules/utils'
  import {checkParameterByTerm} from '~/assets/js/modules/logicTabulator'
  import parameter from "../../../assets/js/API/parameter";

  export default {
    components: {WlNestedList},
    data() {
      return {
        form: {
          basic: false,
          companyId: null,
          typeReportId: null,
          groupId: null,
          rowsSettingReport: []
        },
        selectOptions: {
          company: [],
          typeReport: [],
          group: [],
          filterByBasic: []
        },
        parameters: [],
        filterByBasic: null,
        filterByTerm: ''
      }
    },
    async asyncData({params, $axios, store}) {
      let isCreate = params.id === 'create'
      let selectOptions = {
        company: [],
        typeReport: [],
        group: [{value: null, text: "Выберите группу параметров"}],
        filterByBasic: [
          { value: null, text: "Все" },
          { value: true, text: "Из основной группы" },
          { value: false, text: "Из выбранной группы" }
        ]
      }

      if(!isCreate) {
        //Тогда запрашиваем данные открытой настройки отчета
      } else {
        store.commit('breadcrumb/set', ADMIN_SETTINGS_REPORTS_CREATE)
      }

      let resultCompany = await findAllCompany($axios)
      selectOptions.company = selectOptionsAny(resultCompany.data, true, "Выберите компанию")

      let resultTypeReport = await findAllTypeReportAPI($axios)
      selectOptions.typeReport = selectOptionsTypeReport(resultTypeReport.data, true)

      return {
        isCreate: isCreate,
        selectOptions: selectOptions,
      }
    },
    watch: {
      'form.typeReportId': async function(newValue) {

        this.form.groupId = null

        let resultGroupParameters = await findAllGroupParametersAPI(this.$axios, { typeReportsId: newValue })
        this.selectOptions.group = selectOptionsAny(resultGroupParameters.data, true, "Выберите группу параметров")

        let resultCommonParameters = await findAllParameters(this.$axios, { search: 'group.basic:true,group.typeReport.id:' + newValue })
        this.parameters = resultCommonParameters.data.map(parameter => {
          parameter.basic = true
          return parameter
        })

        let countRows = this.form.rowsSettingReport.length
        this.form.rowsSettingReport.splice(0, countRows)

      },
      'form.basic': async function(newValue) {

      },
      'form.groupId': async function(newValue) {
        let resultParameters = await findAllParameters(this.$axios, { search: 'group.id:' + newValue })

        console.log(resultParameters)

        this.parameters.splice(this.parameters.length, 0, ...resultParameters.data.map(parameter => {
          parameter.basic = false
          return parameter
        }))
        console.log(this.parameters)
      }
    },
    computed: {
      filteredParameters() {
        if (isNull(this.filterByBasic)) {
          return this.parameters.filter(parameter => checkParameterByTerm(this.filterByTerm, parameter))
        } else {
          return this.parameters.filter(parameter => parameter.basic == this.filterByBasic && checkParameterByTerm(this.filterByTerm, parameter) )
        }
      }
    },
    methods: {
      onSubmit() {
        this.isCreate = false
      },
      cloneParameter({ id, title }) {
        console.log(id)
        console.log(title)
        return {
          parameterId: id,
          parameterTitle: title,
          childParameters: []
        }
      }
    }
  }
</script>

<style>
  .collapsed > .when-opened,
  :not(.collapsed) > .when-closed {
    display: none;
  }
</style>
