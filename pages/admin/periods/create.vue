<template>
  <div>
    <h5>Создать новый период отчетности</h5>
    <b-form @submit.stop.prevent="createPeriod">
      <span>Начало периода: </span><b-form-input v-model="period.startPeriod" :type="'date'"></b-form-input>
      <span>Окончание периода периода: </span><b-form-input v-model="period.endPeriod" :type="'date'"></b-form-input>
      <span>Тип периода: </span><b-form-select v-model="period.type" :options="optionsType"></b-form-select>
      <br>
      <b-btn type="submit" variant="dark">Создать</b-btn>
    </b-form>
  </div>
</template>
<script>
  import { ADMIN_PERIODS_CREATE } from '~/assets/js/constants/breadcrumb'
  import { OPTIONS_TYPE_PERIOD } from '~/assets/js/constants/options'

  export default {
    data() {
      return {
        period: {
          startPeriod: null,
          endPeriod: null,
          type: null
        },
        optionsType: OPTIONS_TYPE_PERIOD
      }
    },
    async fetch({ store }) {
      store.commit('breadcrumb/set', ADMIN_PERIODS_CREATE)
    },
    methods: {
      createPeriod() {
        this.$axios.post(`/admin/periods/`, this.period)
          .then((response) => {
              this.$router.push({path: `/admin/periods/`})
            }
          )
      }
    }
  }
</script>
