<template>
  <div>
    <h5>Создать новый период отчетности</h5>
    <b-form @submit.stop.prevent="createPeriod">
      <b-form-group label="Начало периода: " label-for="startPeriod" label-cols="4">
        <date-picker id="startPeriod" v-model="period.startPeriod"> </date-picker>
      </b-form-group>
      <b-form-group label="Окончание периода периода: " label-for="endPeriod" label-cols="4">
        <date-picker id="endPeriod" v-model="period.endPeriod"> </date-picker>
      </b-form-group>
      <b-form-group label="Тип периода: " label-for="type" label-cols="4">
        <b-form-select id="type" v-model="period.type" :options="optionsType"></b-form-select>
      </b-form-group>
      <br>
      <b-btn type="submit" variant="dark">Создать</b-btn>
    </b-form>
  </div>
</template>
<script>
  import { ADMIN_PERIODS_CREATE } from '~/assets/js/constants/breadcrumb'
  import { OPTIONS_TYPE_PERIOD } from '~/assets/js/constants/options'
  import DatePicker from '~/components/datepicker'
  export default {
    components: { DatePicker },
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
