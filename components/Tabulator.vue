<template>
  <div ref="table" class="tabulator"></div>
</template>

<script>
  let Tabulator = require('tabulator-tables')

  export default {
    name: "Tabulator",
    props:{
      value:{
        type: Array,
        default: function () {
          return []
        }
      },
      options: {
        type: Object,
        default: () => {
          {}
        }
      }
    },
    data() {
      return {
        tabulator: null,
        tableData: []
      }
    },
    computed: {
      resolvedOptions: function () {
        return {
          data: this.tableData,
          ...this.options,
        }
      }
    },
    watch: {
      value: {
        handler () {
          this.tableData.splice(0, this.tableData.length, ...this.value)
          this.updateData()
        },
        deep: true
      },
      options: {
        handler () {
          this.createTable()
        },
        deep: true
      }
    },
    methods: {
      createTable() {
        if(this.tabulator !== null) {
          this.tableData.splice(0, this.tableData.length, ...this.tabulator.getData())
        }
        this.tabulator = new Tabulator(
          this.$refs.table,
          this.resolvedOptions
        );
      },
      updateData() {
        this.tabulator.setData(this.tableData)
      },
      getInstance() {
        return this.tabulator
      }
    },
    mounted: function() {
      this.createTable()
    }
  }
</script>


<style scoped>

</style>
