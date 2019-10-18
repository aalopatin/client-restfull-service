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

  export default {
    data() {
      return {
        period: {
          startPeriod: null,
          endPeriod: null,
          type: null
        },
        optionsType: [
          {value: null, text: "Выберите тип периода"},
          {value: "DATE", text: "Дата"},
          {value: "MONTH", text: "Месяц"},
          {value: "TREEMONTHS", text: "Три месяца(первый квартал)"},
          {value: "SIXMONTHS", text: "Шесть месяцев(первое полугодие)"},
          {value: "NINEMONTHS", text: "Девять месяцев"},
          {value: "TWELVEMONTHS", text: "Двенадцать месяцев(год)"},
          {value: "QUARTER", text: "Квартал"},
          {value: "HALFYEAR", text: "Полугодие(второе полугодие)"}
        ]
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
