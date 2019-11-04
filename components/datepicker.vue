<template>
  <date-pick :value="value"
             :format="'YYYY-MM-DD'"
             :displayFormat="'DD.MM.YYYY'"
             :weekdays="weekdays"
             :months="months"
             v-on:input="updateValue($event)">
  </date-pick>
</template>

<script>
  import DatePick from 'vue-date-pick'

  export default {
    name: "DatePicker",
    components: {DatePick},
    props:['value'],
    data() {
      return {
        weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        months: [
          'Январь', 'Февраль', 'Март', 'Апрель',
          'Май', 'Июнь', 'Июль', 'Август',
          'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ]
      }
    },
    methods: {
      updateValue(value) {
        this.$emit("input", value)
      }
    }
  }
</script>

