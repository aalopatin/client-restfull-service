<template>
  <div>
    <h5>Создать новую группу параметров</h5>
    <b-form @submit.stop.prevent="create">
      <b-form-group
        id="fieldset-title"
        label-cols="3"
        label="Наименование: "
        label-for="input-title"
      >
        <b-form-input id="input-title" v-model="groupParameters.title"></b-form-input>
      </b-form-group>
      <b-form-group
        id="fieldset-typeReport"
        label-cols="3"
        label="Тип отчета: "
        label-for="input-typeReport"
      >
        <b-form-select id="input-typeReport" v-model="groupParameters.typeReportId" :options="optionsTypesReports"></b-form-select>
      </b-form-group>
      <b-form-checkbox
        id="checkbox-basic"
        v-model="groupParameters.basic"
        name="checkbox-basic"
        value="true"
        unchecked-value="false"
      >
        Основная
      </b-form-checkbox>
      <br>
      <b-btn type="submit" variant="dark">Создать</b-btn>
    </b-form>
  </div>
</template>
<script>
  import { ADMIN_GROUPS_PARAMETERS_CREATE } from '~/assets/js/constants/breadcrumb'
  import { getOptionsTypesReport } from '~/assets/js/modules/optionsVue'


  export default {
    data() {
      return {
        groupParameters: {
          title: null,
          basic: null,
          typeReportId: null
        },
        optionsTypesReports: []
      }
    },
    async asyncData({ $axios }) {
      let { data } = await $axios.get(`/admin/typesreports`);
      return {optionsTypesReports: getOptionsTypesReport(data)}
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
