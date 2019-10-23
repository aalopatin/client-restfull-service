<template>
  <div>
    <b-form @submit.stop.prevent="saveTypePeriod">
      <b-btn-toolbar class="justify-content-end">
        <b-btn class="ml-1" type="submit" variant="dark">Сохранить</b-btn>
        <b-btn class="ml-1" variant="dark" @click="deleteTypePeriod">Удалить</b-btn>
      </b-btn-toolbar>
      <br>
      <b-form-group
        id="fieldset-title"
        label-cols="3"
        label="Наименование: "
        label-for="input-title"
      >
        <b-form-input id="input-title" v-model="typeReport.title"></b-form-input>
      </b-form-group>
      <b-form-group
        id="fieldset-fullTitle"
        label-cols="3"
        label="Стандарт отчетности: "
        label-for="input-fullTitle"
      >
        <b-form-input id="input-fullTitle" v-model="typeReport.standard"></b-form-input>
      </b-form-group>
    </b-form>
  </div>
</template>
<script>
  import { ADMIN_TYPES_REPORTS } from '~/assets/js/constants/breadcrumb'

  export default {
    data() {
      return {
        typeReport: {
          title: null,
          standard: null
        },
        success: false
      }
    },
    asyncData({params, $axios, error, store}) {
      return $axios.get(`/admin/typesreports/${params.id}`)
        .then((result) => {

          store.commit('breadcrumb/set', ADMIN_TYPES_REPORTS)
          store.commit('breadcrumb/pushActive', result.data.title)

          return {typeReport: result.data}
        })
        .catch((e) => {
          error({ statusCode: 404, message: 'Type of report not found' })
        })
    },
    methods: {
      saveTypePeriod() {
        this.success = false;
        this.$axios.put(`/admin/typesreports/${this.typeReport.id}`, this.typeReport)
          .then((response) => {
              this.success = true;
            }
          )
      },
      deleteTypePeriod() {
        this.success = false
        this.$axios.delete(`/admin/typesreports/${this.typeReport.id}`)
          .then((response) => {
              this.$router.push(`/admin`)
            }
          )
      }
    }
  }
</script>
