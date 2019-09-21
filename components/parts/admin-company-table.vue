<template>
  <div>
    <b-btn-toolbar>
      <b-btn to="/admin/companies/create">Создать</b-btn>
    </b-btn-toolbar>
    <vue-tabulator
      ref="companyTable"
      v-model="companyTable"
      @row-click="rowClick"
      :options="options"></vue-tabulator>
  </div>
</template>

<script>
  export default {
    props: ['companyTable'],
    data() {
      return {
        options: {
          layout:"fitColumns",
          columns: [
            {title:"#", field:"id", sorter:"number"},
            {title:"Название", field:"title", sorter:"string"},
            {title:"Полное название", field:"fullTitle", sorter:"string"},
          ],
        }
      }
    },
    methods:{
      rowClick(e, row) {
        this.$router.push(`/admin/companies/${row.getData().id}`)
      }
    }
  }
</script>
