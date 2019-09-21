<template>
  <div>
    <h5>Создать новую компанию</h5>
    <b-form @submit.stop.prevent="createCompany">
      <span>Название: </span><b-input v-model="company.title"></b-input>
      <span>Полное название: </span><b-input v-model="company.fullTitle"></b-input>
      <br>
      <b-btn type="submit" variant="dark">Создать</b-btn>
    </b-form>
  </div>
</template>
<script>
  import { ADMIN_COMPANIES_CREATE } from '~/assets/js/constants/breadcrumb'

  export default {
    data() {
      return {
        company: {
          title: '',
          fullTitle: ''
        }
      }
    },
    async fetch({ store }) {
      store.commit('breadcrumb/set', ADMIN_COMPANIES_CREATE)
    },
    methods: {
      createCompany() {
        this.$axios.post(`/admin/companies/`, this.company)
          .then((response) => {
              this.$router.push({path: `/admin/companies/${response.data.id}`})
            }
          )
      }
    }
  }
</script>
