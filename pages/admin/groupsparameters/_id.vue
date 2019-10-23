<template>
  <div>
    <b-form @submit.stop.prevent="saveGroupParameters">
      <b-btn-toolbar class="justify-content-end">
        <b-btn class="ml-1" type="submit" variant="dark">Сохранить</b-btn>
        <b-btn class="ml-1" variant="dark" @click="deleteGroupParameters">Удалить</b-btn>
      </b-btn-toolbar>
      <br>
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
        <b-form-select id="input-typeReport" v-model="groupParameters.typeReport" :options="optionsTypesReports"></b-form-select>
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
    </b-form>
  </div>
</template>
<script>
  import { ADMIN_GROUPS_PARAMETERS } from '~/assets/js/constants/breadcrumb'

  export default {
    data() {
      return {
        groupParameters: {
          id: null,
          title: null,
          basic: null,
          typeReport: null
        },
        success: false,
        optionsTypesReports: []
      }
    },
    async asyncData({params, $axios, error, store}) {

      let types = await $axios.get(`/admin/typesreports`);
      let dataTypes = types.data;
      let typesReports = dataTypes.map(
        function(typeReports){
          return {
            value: typeReports.id,
            text: typeReports.title + " (" + typeReports.standard + ")"
          }
        }
      )

      let { data } = await $axios.get(`/admin/groupsparameters/${params.id}`);

      store.commit('breadcrumb/set', ADMIN_GROUPS_PARAMETERS)
      store.commit('breadcrumb/pushActive', data.title)

      return {groupParameters: data, optionsTypesReports: typesReports}

    },
    methods: {
      saveGroupParameters() {
        this.success = false;
        this.$axios.put(`/admin/groupsparameters/${this.groupParameters.id}`, this.groupParameters)
          .then((response) => {
              this.success = true;
            }
          )
      },
      deleteGroupParameters() {
        this.success = false
        this.$axios.delete(`/admin/groupsparameters/${this.groupParameters.id}`)
          .then((response) => {
              this.$router.push(`/admin`)
            }
          )
      }
    }
  }
</script>
