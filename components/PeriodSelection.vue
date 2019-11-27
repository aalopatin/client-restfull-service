<template>
  <div disabled>
    <b-form-group id="fieldset-periods" label-cols="3" :label="label" label-for="periods">
      <b-badge pill v-for="period in selectedPeriods" :key="period.id" class="mx-1" variant="light">{{ period.id }}</b-badge>
      <b-btn v-b-toggle.enter-periods pill size="sm" variant="secondary" :disabled="disabled">
        <span class="when-opened">{{ buttonLabelClose }}</span> <span class="when-closed">{{ buttonLabelOpen }}</span>
      </b-btn>
    </b-form-group>
    <b-collapse id="enter-periods" @hidden="hidden" class="my-1">
      <b-card>
        <b-form inline>
          <label for="startData" class="mr-2">C: </label>
          <date-picker id="startData" v-model="filterStartDate"> </date-picker>
          <label for="endData" class="mx-2">По: </label>
          <date-picker id="endData" v-model="filterEndDate"></date-picker>
        </b-form>
        <b-form-group
          id="fieldset-typePeriods"
          label-for="typePeriods"
          label="Типы периодов:"
        >
          <b-select id="typePeriods" v-model="filterTypePeriod" :options="optionsTypePeriod"></b-select>
        </b-form-group>
        <b-row>
          <b-col cols="6">
            <tabulator ref="allPeriods" v-model="allPeriods" :options="optionsAllPeriods"></tabulator>
          </b-col>
          <b-col cols="6">
            <tabulator id="selectedPeriods"
                            ref="selectedPeriods"
                            v-model="selectedPeriods"
                           :options="optionsSelectedPeriods"
            ></tabulator>
          </b-col>
        </b-row>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
  import DatePicker from '~/components/datepicker'
  import Tabulator from '~/components/Tabulator'

  import { OPTIONS_TYPE_PERIOD } from '~/assets/js/constants/options'

  import moment from 'moment'

  export default {
    name: 'PeriodSelection',
    components: { DatePicker, Tabulator},
    props: {
      label: {
        type: String,
        default: function () {
          return 'Периоды:'
        }
      },
      buttonLabelOpen: {
        type: String,
        default: function () {
          return '...'
        }
      },
      buttonLabelClose: {
        type: String,
        default: function () {
          return '...'
        }
      },
      disabled: {
        type: Boolean
      }
    },
    data() {
      return {
        filterStartDate: '',
        filterEndDate: '',
        filterTypePeriod: '',
        allPeriods: [],
        selectedPeriods: [],
        optionsTypePeriod: OPTIONS_TYPE_PERIOD,
        optionsAllPeriods: {
          layout:"fitColumns",
            height: "500px",
            movableRows: true,
            movableRowsConnectedTables: "#selectedPeriods",
            columns: [
              {rowHandle:true, formatter:"handle", headerSort:false, frozen:true, width:30, minWidth:30},
              {title:"Период", field:"id", headerSort: false},
              {title:"Начало", field:"startPeriod", formatter:"datetime", formatterParams:{
                  inputFormat:"YYYY-MM-DD",
                  outputFormat:"DD.MM.YYYY"
                }, sorter:"date", visible: false},
              {title:"Окончание", field:"endPeriod", formatter:"datetime", formatterParams:{
                  inputFormat:"YYYY-MM-DD",
                  outputFormat:"DD.MM.YYYY"
                }, sorter:"date", visible: false},
              {title:"Тип периода", field:"type", visible: false}

            ],
        },
        optionsSelectedPeriods: {
          layout:"fitColumns",
          height: "500px",
          movableRows: true,
          movableRowsReceiver:(fromRow, toRow, fromTable)=>{
            this.selectedPeriods.push(fromRow.getData())
            this.$emit('input', this.selectedPeriods)
          },
          rowMoved:(row)=>{
            this.updateSelectedPeriods()
          },
          rowDeleted:(row)=>{
            this.updateSelectedPeriods()
          },
          columns: [
            {rowHandle:true, formatter:"handle", headerSort:false, frozen:true, width:30, minWidth:30},
            {title:"Период", field:"id", validator:"unique"},
            {title:"Начало", field:"startPeriod", sorter:"date", visible: false},
            {title:"Окончание", field:"endPeriod", sorter:"date", visible: false},
            {title:"Тип периода", field:"type", sorter:"string", visible: false},
            {formatter:"buttonCross", width:30, align:"center", cellClick: (e, cell) => {cell.getRow().delete()}}
          ],
        }
      }
    },
    async mounted() {
      let periodsResponse = await this.$axios.get(`/admin/periods`)
      this.allPeriods = periodsResponse.data.slice()
      window.moment = moment
    },
    watch: {
      filterStartDate: function (newValue, oldValue) {
        this.addFilter("startPeriod", ">=", newValue, oldValue)
      },
      filterEndDate: function (newValue, oldValue) {
        this.addFilter("endPeriod", "<=", newValue, oldValue)
      },
      filterTypePeriod: function (newValue, oldValue) {
        this.addFilter("type", "=", newValue, oldValue)
      }
    },
    methods: {
      updateSelectedPeriods() {
        let length = this.selectedPeriods.length
        let newSelectedPeriods = this.$refs.selectedPeriods.getInstance().getData()
        this.selectedPeriods.splice(0, length, ...newSelectedPeriods)
        this.$emit('input', this.selectedPeriods)
      },
      addFilter(field, type, newValue, oldValue) {

        let allPeriodsInstance = this.$refs.allPeriods.getInstance()

        if(oldValue != '') {
          allPeriodsInstance.removeFilter(field, type, oldValue)
        }

        if(newValue != '') {
          allPeriodsInstance.addFilter(field, type, newValue)
        }
      },
      hidden() {
        this.$emit('hidden')
      }
    }
  }
</script>

<style>
  .collapsed > .when-opened,
  :not(.collapsed) > .when-closed {
    display: none;
  }
</style>
