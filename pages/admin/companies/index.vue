<template>
  <div>
    <h5>Создать новую компанию</h5>
    <b-form @submit.stop.prevent="createCompany">
      <span>Название: </span><b-input v-model="company.title"></b-input>
      <span>Полное название: </span><b-input v-model="company.fullTitle"></b-input>
      <br>
      <b-btn variant="dark" to="/admin">Вернуться в админку</b-btn>
      <b-btn type="submit" variant="dark">Создать</b-btn>
    </b-form>

  </div>
</template>
<script>
  export default {
    layout: 'admin',
    data() {
      return {
        company: {
          title: '',
          fullTitle: ''
        }
      }
    },
    methods: {
      createCompany() {
        this.$axios.post(`/admin/companies/`, this.company)
          .then((response) => {
              this.$router.push({path: `${this.$route.fullPath}/${response.data.id}`})
            }
          )
      }
    }
  }
</script>
