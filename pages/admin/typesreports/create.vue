<template>
  <div>
    <h5>Создать новый тип отчета</h5>
    <b-form @submit.stop.prevent="createTypeReport">
      <span>Наименование: </span><b-form-input v-model="typeReport.title"></b-form-input>
      <span>Стандарт отчетности: </span><b-form-select v-model="typeReport.standard" :options="optionsStandard"></b-form-select>
      <br>
      <b-btn type="submit" variant="dark">Создать</b-btn>
    </b-form>
  </div>
</template>
<script>
  import { ADMIN_TYPES_REPORTS_CREATE } from '~/assets/js/constants/breadcrumb'
  import { OPTIONS_STANDARD } from '~/assets/js/constants/selectoptions'

  export default {
    data() {
      return {
        typeReport: {
          title: null,
          standard: null
        },
        optionsStandard: OPTIONS_STANDARD
      }
    },
    async fetch({ store }) {
      store.commit('breadcrumb/set', ADMIN_TYPES_REPORTS_CREATE)
    },
    methods: {
      createTypeReport() {
        this.$axios.post(`/admin/typesreports/`, this.typeReport)
          .then((response) => {
              this.$router.push({path: `/admin/typesreports/${response.data.id}`})
            }
          )
      }
    }
  }
</script>
