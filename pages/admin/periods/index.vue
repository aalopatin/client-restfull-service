<template>
  <div>
    <b-btn-toolbar>
      <b-btn to="/admin/periods/create">Создать</b-btn>
      <b-btn @click="deleteRow" class="ml-1">Удалить</b-btn>
    </b-btn-toolbar>
    <vue-tabulator ref="adminPeriodTable" v-model="periodTable" :options="options"></vue-tabulator>
  </div>
</template>

<script>
import {ADMIN_PERIODS} from "~/assets/js/constants/breadcrumb";

export default {
  data() {
    return {
      periodTable: [],
      options: {
        layout: "fitColumns",
        selectable: 1,
        columns: [
          {title: "#", field: "id", sorter: "string"},
          {title: "Начало", field: "startPeriod", sorter: "date"},
          {title: "Окончание", field: "endPeriod", sorter: "date"},
          {title: "Тип периода", field: "type", sorter: "string"},
        ],
      }
    }
  },
  async asyncData({$axios, store}) {
    store.commit('breadcrumb/set', ADMIN_PERIODS)
    let {data} = await $axios.get(`/admin/periods`)
    return {periodTable: data}
  },
  methods: {
    deleteRow() {
      var adminPeriodTableInstance = this.$refs.adminPeriodTable.getInstance();
      var id = adminPeriodTableInstance.getSelectedData()[0].id;
      this.$axios.delete(`/admin/periods/${id}`)
        .then((response) => {
            var indexOfRow = this.periodTable.findIndex(row => row.id === id)
            this.periodTable.splice(indexOfRow, 1)
          }
        )
    }
  }
}
</script>


