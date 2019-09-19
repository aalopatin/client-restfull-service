<template>
  <div>
    <b-form @submit.stop.prevent="saveCompany">
      <span>Название: </span><b-input v-model="company.title"></b-input>
      <span>Полное название: </span><b-input v-model="company.fullTitle"></b-input>
      <br>
      <b-btn variant="dark" to="/admin">Вернуться в админку</b-btn>
      <b-btn variant="dark" @click="deleteCompany">Удалить</b-btn>
      <b-btn type="submit" variant="dark">Сохранить</b-btn>
    </b-form>

  </div>
</template>
<script>
  export default {
    layout: 'admin',
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
    asyncData({params, $axios, error}) {
      return $axios.get(`/admin/companies/${params.id}`)
        .then((result) => {
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
