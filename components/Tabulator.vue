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
        tabulator: null
      }
    },
    computed: {
      resolvedOptions: function () {
        return {
          data: this.value,
          ...this.options,
        }
      }
    },
    watch: {
      value: {
        handler () {
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
        this.tabulator = new Tabulator(
          this.$refs.table,
          this.resolvedOptions
        );
      },
      updateData() {
        this.tabulator.setData(this.value)
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
