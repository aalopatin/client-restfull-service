<template>
  <div>
    <b-form @submit.stop.prevent="saveParameter">
      <b-btn-toolbar class="justify-content-end">
        <b-btn class="ml-1" type="submit" variant="dark">Сохранить</b-btn>
        <b-btn class="ml-1" variant="dark" @click="deleteParameter">Удалить</b-btn>
      </b-btn-toolbar>
      <br>
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
    </b-form>
  </div>
</template>
<script>
  import { ADMIN_PARAMETERS } from '~/assets/js/constants/breadcrumb'
  import { getOptionsGroupParameters } from '~/assets/js/options'

  export default {
    data() {
      return {
        parameter: {
          title: "",
          groupId: null,
          cumulative: false
        },
        success: false,
        optionsGroupParameters: []
      }
    },
    async asyncData({params, $axios, error, store}) {

      let { data } = await $axios.get(`/forms/parameters/${params.id}`);

      let parameter = data.data
      let groups = data.payloads.groups;
      let typesReport = data.payloads.typesReport;

      store.commit('breadcrumb/set', ADMIN_PARAMETERS)
      store.commit('breadcrumb/pushActive', parameter.title)

      return {parameter: parameter, optionsGroupParameters: getOptionsGroupParameters(groups, typesReport)}

    },
    methods: {
      saveParameter() {
        this.success = false;
        this.$axios.put(`/admin/parameters/${this.parameter.id}`, this.parameter)
          .then((response) => {
              this.success = true;
            }
          )
      },
      deleteParameter() {
        this.success = false
        this.$axios.delete(`/admin/parameters/${this.parameter.id}`)
          .then((response) => {
              this.$router.push(`/admin`)
            }
          )
      }
    }
  }
</script>
