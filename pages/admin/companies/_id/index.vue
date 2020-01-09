<template>
  <div>
    <b-form @submit.stop.prevent="save">
      <b-btn-toolbar class="justify-content-end">
        <b-btn class="ml-1" type="submit" variant="dark">Сохранить</b-btn>
        <b-btn class="ml-1" variant="dark" @click="remove">Удалить</b-btn>
      </b-btn-toolbar>
      <br>
      <b-form-group
        id="fieldset-title"
        label-cols="3"
        label="Наименование: "
        label-for="input-title"
      >
        <b-form-input id="input-title" v-model="company.title"></b-form-input>
      </b-form-group>
      <b-form-group
        id="fieldset-fullTitle"
        label-cols="3"
        label="Полное наименование: "
        label-for="input-fullTitle"
      >
        <b-form-input id="input-fullTitle" v-model="company.fullTitle"></b-form-input>
      </b-form-group>
    </b-form>
    <b-tabs content-class="mt-3">
      <b-tab title="Отчеты" active>
        <b-btn-toolbar>
          <b-btn class="ml-1" variant="dark" :to="$route.fullPath + '/reports/create'">Создать</b-btn>
        </b-btn-toolbar>
        <tabulator ref="reportTable" v-model="reportTable" :options="options"></tabulator>
      </b-tab>
      <b-tab title="Настройки">
        <h5>Настройки отчетов</h5>
        <hr>
        <settings-reports :company-id="company.id"></settings-reports>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
  import { ADMIN_COMPANIES } from '~/assets/js/constants/breadcrumb'
  import Tabulator from '~/components/Tabulator'
  import SettingsReports from "../../../../components/SettingsReports";

  export default {
    components: {SettingsReports, Tabulator },
    data() {
      return {
        company: {
          id: '',
          title: '',
          fullTitle: ''
        },
        reportTable: [],
        options: {
          layout:"fitColumns",
          columns: [
            {title:"#", field:"id", visible:false},
            {title:"Тип отчета", field:"typeReportId"},
            {title:"Период", field:"periodId"},
            {title:"Стандарт", field:"standard"},
          ],
        },
        success: false
      }
    },
    async asyncData({params, $axios, error, store}) {

      let company = await $axios.get(`/admin/companies/${params.id}`)

      store.commit('breadcrumb/set', ADMIN_COMPANIES)
      store.commit('breadcrumb/pushActive', company.data.title)

      let  formListReport = await $axios.get(`/forms/lists/reports/`, {params: {companyId: params.id}})

      return {company: company.data}
    },
    methods: {
      save() {
        this.success = false;
        this.$axios.put(`/admin/companies/${this.company.id}`, this.company)
          .then((response) => {
              this.success = true;
            }
          )
      },
      remove() {
        this.success = false
        this.$axios.delete(`/admin/companies/${this.company.id}`)
          .then((response) => {
              this.$router.push(`/admin`)
            }
          )
      }
    }
  }
</script>
