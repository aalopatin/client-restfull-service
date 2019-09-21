<template>
  <div>
    <b-form @submit.stop.prevent="saveCompany">
      <b-btn-toolbar class="justify-content-end">
        <b-btn class="ml-1" variant="dark" @click="deleteCompany">Удалить</b-btn>
        <b-btn class="ml-1" type="submit" variant="dark">Сохранить</b-btn>
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
  </div>
</template>
<script>
  import { ADMIN_COMPANIES } from '~/assets/js/constants/breadcrumb'

  export default {
    data() {
      return {
        company: {
          id: '',
          title: '',
          fullTitle: ''
        },
        success: false
      }
    },
    asyncData({params, $axios, error, store}) {
      return $axios.get(`/admin/companies/${params.id}`)
        .then((result) => {

          store.commit('breadcrumb/set', ADMIN_COMPANIES)
          store.commit('breadcrumb/pushActive', result.data.title)

          return {company: result.data}
        })
        .catch((e) => {
          error({ statusCode: 404, message: 'Company not found' })
        })
    },
    methods: {
      saveCompany() {
        this.success = false;
        this.$axios.put(`/admin/companies/${this.company.id}`, this.company)
          .then((response) => {
              this.success = true;
            }
          )
      },
      deleteCompany() {
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
