<template>
    <div>
      <b-form-group id="fieldset-company" label-cols="3" label="Компания: " label-for="company">
        <b-input id="company" v-model="company" :readonly="true"></b-input>
      </b-form-group>
      <period-selection v-model="selectedPeriods" label="Периоды отчетов:" button-label-open="Подобрать" button-label-close="Закончить подбор"></period-selection>
    </div>
</template>

<script>
  import PeriodSelection from '~/components/PeriodSelection'
  import { ADMIN_COMPANIES } from '~/assets/js/constants/breadcrumb'

  export default {
    name: "create",
    components: { PeriodSelection },
    data: function() {
      return {
        company: "",
        selectedPeriods: [],
      }
    },
    async asyncData({params, $axios, error, store}) {
      let companyResponse = await $axios.get(`/admin/companies/${params.id}`)
      let company = companyResponse.data.title
      store.commit('breadcrumb/set', ADMIN_COMPANIES)
      store.commit('breadcrumb/pushNext', {url: `/${params.id}`, title: company})
      store.commit('breadcrumb/pushActive', "Отчеты")
      store.commit('breadcrumb/pushActive', "Создание")
      return {company: company}
    },
  }
</script>

<style scoped>

</style>
