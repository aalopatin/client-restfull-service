<template>
  <div>
    <h5>Создать новую группу параметров</h5>
    <b-form @submit.stop.prevent="create">
      <span>Наименование: </span><b-form-input v-model="groupParameters.title"></b-form-input>
      <span>Наименование: </span><b-form-input v-model="groupParameters.basic"></b-form-input>
      <span>Тип отчета: </span><b-form-select v-model="groupParameters.typeReport" :options="optionsTypesReports"></b-form-select>
      <br>
      <b-btn type="submit" variant="dark">Создать</b-btn>
    </b-form>
  </div>
</template>
<script>
  import { ADMIN_GROUPS_PARAMETERS_CREATE } from '~/assets/js/constants/breadcrumb'

  export default {
    data() {
      return {
        groupParameters: {
          title: null,
          basic: null,
          typeReport: null
        },
        optionsTypesReports: []
      }
    },
    async asyncData({ $axios }) {
      let { data } = await $axios.get(`/admin/typesreports`);
      let typesReports = data.map(
        function(typeReports){
          return {
            value: typeReports.id,
            text: typeReports.title + " (" + typeReports.standard + ")"
          }
        }
      )
      return {optionsTypesReports: typesReports}
    },
    async fetch({ store }) {
      store.commit('breadcrumb/set', ADMIN_GROUPS_PARAMETERS_CREATE)
    },
    methods: {
      create() {
        this.$axios.post(`/admin/groupsparameters/`, this.groupParameters)
          .then((response) => {
              this.$router.push({path: `/admin/groupsparameters/${response.data.id}`})
            }
          )
      }
    }
  }
</script>
