<template>
  <div>
    <h5>Создать новый параметр</h5>
    <b-form @submit.stop.prevent="create">
      <b-form-group
        id="fieldset-title"
        label-cols="3"
        label="Наименование: "
        label-for="input-title"
      >
        <b-form-input id="input-title" v-model="parameter.title"></b-form-input>
      </b-form-group>
      <b-form-group
        id="fieldset-group"
        label-cols="3"
        label="Группа: "
        label-for="input-group"
      >
        <b-form-select id="input-typeReport" v-model="parameter.groupId" :options="optionsGroupParameters"></b-form-select>
      </b-form-group>
      <b-form-checkbox
        id="checkbox-basic"
        v-model="parameter.cumulative"
        name="checkbox-basic"
        value="true"
        unchecked-value="false"
      >
        Кумулятивный
      </b-form-checkbox>
      <br>
      <b-btn type="submit" variant="dark">Создать</b-btn>
    </b-form>
  </div>
</template>
<script>
  import { ADMIN_PARAMETERS_CREATE } from '~/assets/js/constants/breadcrumb'
  import { getOptionsGroupParameters } from '~/assets/js/modules/optionsVue'


  export default {
    data() {
      return {
        parameter: {
          title: "",
          groupId: null,
          cumulative: false
        },
        optionsGroupParameters: []
      }
    },
    async asyncData({ $axios }) {
      let { data } = await $axios.get(`/forms/create/parameters`);

      let groups = data.payloads.groups;
      let typesReport = data.payloads.typesReport;

      return {optionsGroupParameters: getOptionsGroupParameters(groups, typesReport)}
    },
    async fetch({ store }) {
      store.commit('breadcrumb/set', ADMIN_PARAMETERS_CREATE)
    },
    methods: {
      create() {
        this.$axios.post(`/admin/parameters/`, this.parameter)
          .then((response) => {
              this.$router.push({path: `/admin/parameters/${response.data.id}`})
            }
          )
      }
    }
  }
</script>
